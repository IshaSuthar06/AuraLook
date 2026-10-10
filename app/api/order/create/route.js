
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import nodemailer from "nodemailer";

import connectDB from "../../../../config/db";
import User from "../../../../models/User";
import Address from "../../../../models/Address";
import Order from "../../../../models/Order";
import Product from "../../../../models/Products";

// Gmail transporter: only Gmail address and App Password are required.
const createTransporter = () => {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    throw new Error("Gmail credentials are not configured in .env.local");
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
};

// Send confirmation to customer and notification to seller.
const sendOrderEmails = async ({
  customer,
  sellers,
  address,
  order,
  items,
}) => {
  const transporter = createTransporter();

  const itemLines = items
    .map(
      (item) =>
        `${item.name} | Size: ${item.size || "Default"} | Quantity: ${item.quantity} | Price: ₹${item.unitPrice} each`
    )
    .join("\n");

  const addressText = [
    address.fullName,
    address.phoneNumber,
    address.area,
    address.city,
    address.state,
    address.pincode,
  ].join(", ");

  const customerEmail = transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: customer.email,
    subject: `Order Confirmation - ${order._id}`,
    text: `Hello ${customer.name},

Thank you for shopping with Aura Look!

Your order has been placed successfully.

Order ID: ${order._id}
Payment Method: Cash on Delivery (COD)
Payment Status: Pending

ORDER DETAILS:
${itemLines}

Total Amount: ₹${order.amount}

DELIVERY ADDRESS:
${addressText}

Please keep the payment ready when your order arrives.

Thank you for choosing Aura Farming!

Regards,
Aura Look Team`,
  });

  const sellerEmails = [
    ...new Set(
      sellers
        .map((seller) => seller.email)
        .filter(Boolean)
    ),
  ];

  const sellerNotifications = sellerEmails.map((email) =>
    transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: `New COD Order Received - ${order._id}`,
      text: `Hello Seller,

A new Cash on Delivery order has been placed on Aura Farming.

ORDER DETAILS:
Order ID: ${order._id}
Customer Name: ${customer.name}
Customer Email: ${customer.email}

ITEMS:
${itemLines}

Total Amount: ₹${order.amount}
Payment Method: COD
Payment Status: Pending

DELIVERY ADDRESS:
${addressText}

Please log in to your seller account to process this order.

Regards,
Aura Farming`,
    })
  );

  const results = await Promise.allSettled([
    customerEmail,
    ...sellerNotifications,
  ]);

  const customerEmailSent =
    results[0]?.status === "fulfilled";

  const sellerEmailsSent = results
    .slice(1)
    .every((result) => result.status === "fulfilled");

  return {
    customerEmailSent,
    sellerEmailsSent,
  };
};

export async function POST(req) {
  let session;

  try {
    await connectDB();

    const { userId, addressId, items, paymentMethod } =
      await req.json();

    // Validate request.
    if (
      !userId ||
      !mongoose.isValidObjectId(userId) ||
      !addressId ||
      !mongoose.isValidObjectId(addressId) ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid order details",
        },
        { status: 400 }
      );
    }

    if (paymentMethod !== "COD") {
      return NextResponse.json(
        {
          success: false,
          message: "Only Cash on Delivery is supported",
        },
        { status: 400 }
      );
    }

    // Find customer.
    const customer = await User.findById(userId);

    if (!customer) {
      return NextResponse.json(
        {
          success: false,
          message: "Customer not found",
        },
        { status: 404 }
      );
    }

    if (!customer.email) {
      return NextResponse.json(
        {
          success: false,
          message: "Customer email is not available",
        },
        { status: 400 }
      );
    }

    // Verify delivery address belongs to customer.
    const address = await Address.findOne({
      _id: addressId,
      userId: customer._id.toString(),
    });

    if (!address) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid delivery address",
        },
        { status: 400 }
      );
    }

    // Combine quantities for stock validation.
    const quantities = new Map();

    for (const item of items) {
      if (
        !item.product ||
        !mongoose.isValidObjectId(item.product) ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1
      ) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid cart item",
          },
          { status: 400 }
        );
      }

      const key = item.product.toString();

      const current = quantities.get(key) || {
        product: key,
        quantity: 0,
        sizes: [],
      };

      current.quantity += item.quantity;

      current.sizes.push({
        size: item.size || "default",
        quantity: item.quantity,
      });

      quantities.set(key, current);
    }

    // Fetch products.
    const productIds = [...quantities.keys()];

    const products = await Product.find({
      _id: { $in: productIds },
    });

    if (products.length !== productIds.length) {
      return NextResponse.json(
        {
          success: false,
          message: "One or more products no longer exist",
        },
        { status: 400 }
      );
    }

    const productMap = new Map(
      products.map((product) => [
        product._id.toString(),
        product,
      ])
    );

    const orderItems = [];
    let amount = 0;

    // Validate stock, size and prices using database data.
    for (const entry of quantities.values()) {
      const product = productMap.get(entry.product);

      if (
        !product.available ||
        product.stock < entry.quantity
      ) {
        return NextResponse.json(
          {
            success: false,
            message: `${product.name} is out of stock or has insufficient stock`,
          },
          { status: 400 }
        );
      }

      for (const selected of entry.sizes) {
        let unitPrice = product.offerPrice;

        if (
          product.sizes?.length > 0 &&
          selected.size !== "default"
        ) {
          const sizeOption = product.sizes.find(
            (option) => option.label === selected.size
          );

          if (!sizeOption) {
            return NextResponse.json(
              {
                success: false,
                message: `Invalid size for ${product.name}`,
              },
              { status: 400 }
            );
          }

          unitPrice =
            sizeOption.offerPrice ?? product.offerPrice;
        } else if (
          product.sizes?.length > 0 &&
          selected.size === "default"
        ) {
          return NextResponse.json(
            {
              success: false,
              message: `Please select a size for ${product.name}`,
            },
            { status: 400 }
          );
        }

        if (
          !Number.isFinite(unitPrice) ||
          unitPrice < 0
        ) {
          return NextResponse.json(
            {
              success: false,
              message: `Invalid price for ${product.name}`,
            },
            { status: 400 }
          );
        }

        amount += unitPrice * selected.quantity;

        orderItems.push({
          product: product._id,
          quantity: selected.quantity,
          size: selected.size,
        });
      }
    }

    // Save order and update stock in a transaction.
    session = await mongoose.startSession();

    let createdOrder;

    await session.withTransaction(async () => {
      for (const entry of quantities.values()) {
        const product = productMap.get(entry.product);

        const stockUpdate = await Product.updateOne(
          {
            _id: product._id,
            available: true,
            stock: { $gte: entry.quantity },
          },
          {
            $inc: {
              stock: -entry.quantity,
            },
            $set: {
              available:
                product.stock - entry.quantity > 0,
            },
          },
          { session }
        );

        if (stockUpdate.modifiedCount !== 1) {
          throw new Error(
            `${product.name} stock changed. Please refresh your cart.`
          );
        }
      }

      [createdOrder] = await Order.create(
        [
          {
            userId: customer._id.toString(),
            items: orderItems,
            amount,
            address: address._id,
            status: "Order Placed",
            date: Date.now(),
            paymentStatus: "PENDING",
            paymentMethod: "COD",
          },
        ],
        { session }
      );
    });

    await session.endSession();
    session = null;

    // Find sellers who own the ordered products.
    const sellerIds = [
      ...new Set(
        products.map((product) =>
          product.userId.toString()
        )
      ),
    ];

    const sellers = await User.find({
      _id: { $in: sellerIds },
      isSeller: true,
    });

    // Prepare email item details.
    const emailItems = orderItems.map((item) => {
      const product = productMap.get(
        item.product.toString()
      );

      let unitPrice = product.offerPrice;

      if (
        item.size !== "default" &&
        product.sizes?.length
      ) {
        const sizeOption = product.sizes.find(
          (option) => option.label === item.size
        );

        unitPrice =
          sizeOption?.offerPrice ?? product.offerPrice;
      }

      return {
        name: product.name,
        size: item.size,
        quantity: item.quantity,
        unitPrice,
      };
    });

    // Email failures should not undo a successfully placed order.
    let customerEmailSent = false;
    let sellerEmailsSent = false;

    try {
      const emailResults = await sendOrderEmails({
        customer,
        sellers,
        address,
        order: createdOrder,
        items: emailItems,
      });

      customerEmailSent =
        emailResults.customerEmailSent;

      sellerEmailsSent =
        emailResults.sellerEmailsSent;
    } catch (emailError) {
      console.error(
        "Order saved, but email delivery failed:",
        emailError
      );
    }

    return NextResponse.json({
      success: true,
      message: "Order placed successfully",
      orderId: createdOrder._id.toString(),
      customerEmailSent,
      sellerEmailsSent,
    });
  } catch (error) {
    console.error("COD order creation error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error.message || "Unable to place order",
      },
      { status: 500 }
    );
  } finally {
    if (session) {
      await session.endSession();
    }
  }
}
