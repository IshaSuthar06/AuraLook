// import { NextResponse } from "next/server";
// import connectDB from "../../../../config/db";
// import Product from "../../../../models/Products";



// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // GET product by ID without redis 
// export async function GET(req, { params }) {
//  // params is a Promise now, so do:
//   const resolvedParams = await params;
//   const { id } = resolvedParams;

//   try {
//     await connectDB();

//     const product = await Product.findById(id);
//     if (!product) return NextResponse.json({ success: false, message: "Product not found" });

//     return NextResponse.json({ success: true, product });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ success: false, message: err.message });
//   }
// }




// const sendMail = async (to, productName, productId) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.GMAIL_USER,
//         pass: process.env.GMAIL_APP_PASSWORD,
//       },
//       family:4,
      
//     });

//     await transporter.sendMail({
//       from: `"Your Store" <${process.env.GMAIL_USER}>`,
//       to,
//       subject: "Product Back in Stock!",
//       html: `
//         <h2>🎉 ${productName} is Back in Stock!</h2>
//         <p>Hurry up before it runs out again.</p>
//         <a href="http://localhost:3000/product/${productId}">
//           View Product
//         </a>
//       `,
//     });

//     console.log("Mail sent to:", to);
//   } catch (err) {
//     console.log("Mail error:", err);
//   }
// };
// // PATCH / update product by ID
// export async function PATCH(req, { params }) {
    
//     try {
//         await connectDB();
//         const { id } = await params;
        
//         const formData = await req.formData();
//         const existingImages = formData.getAll("existingImages");

//     const userId = formData.get("userId");
//     if (!userId)
//       return NextResponse.json({ success: false, message: "Seller ID missing" });

//     const product = await Product.findById(id);
//     if (!product)
//       return NextResponse.json({ success: false, message: "Product not found" });

//     // ✅ STEP 1: STORE OLD STOCK
//     const oldStock = product.stock;

//     // ✅ STEP 2: UPDATE DATA
//     const name = formData.get("name");
//     const description = formData.get("description");
//     const category = formData.get("category");
//     const price = formData.get("price");
//     const offerPrice = formData.get("offerprice");
//     const quantity = formData.get("quantity");

//     if (name) product.name = name;
//     if (description) product.description = description;
//     if (category) product.category = category;
//     if (price !== null && price !== "") product.price = Number(price);
//     if (offerPrice !== null && offerPrice !== "")
//       product.offerPrice = Number(offerPrice);

//     if (quantity !== null && quantity !== "") {
//       product.stock = Number(quantity);
//     }

//     // ✅ STEP 3: IMAGE UPLOAD (your existing logic)
//    // ✅ STEP 3: IMAGE HANDLING

// const files = formData.getAll("images");

// let newImages = [];

// // upload only if files exist
// if (files.length > 0 && files[0].size > 0) {
//   const result = await Promise.all(
//     files.map(async (file) => {
//       const buffer = Buffer.from(await file.arrayBuffer());

//       return new Promise((resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream(
//           { resource_type: "auto" },
//           (error, result) => {
//             if (error) reject(error);
//             else resolve(result);
//           }
//         );
//         stream.end(buffer);
//       });
//     })
//   );

//   newImages = result.map((r) => r.secure_url);
// }

// // ✅ FINAL IMAGE SET (VERY IMPORTANT)
// product.image = [...existingImages, ...newImages];

// if (files.length > 0 && files[0].size > 0) {
//   const result = await Promise.all(
//     files.map(async (file) => {
//       const buffer = Buffer.from(await file.arrayBuffer());
//       return new Promise((resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream(
//           { resource_type: "auto" },
//           (error, result) => {
//             if (error) reject(error);
//             else resolve(result);
//           }
//         );
//         stream.end(buffer);
//       });
//     })
//   );

//   newImages = result.map((r) => r.secure_url);
// }

// // ✅ FINAL IMAGE SET
// product.image = [...existingImages, ...newImages];
//     };

//     // ✅ STEP 4: SAVE PRODUCT
//     await product.save();

//     // ✅ STEP 5: CHECK STOCK CHANGE (MAIN LOGIC)
//     if (oldStock === 0 && product.stock > 0) {
//       console.log("🔥 Stock is back, sending emails...");

//       const usersToNotify = await Notify.find({
//         productId: id,
//         notified: false,
//       });

//       for (let user of usersToNotify) {
//         await sendMail(user.email, product.name, product._id);

//         // mark as notified
//         user.notified = true;
//         await user.save();
//       }

//       console.log(`✅ ${usersToNotify.length} users notified`);
//     }

//     return NextResponse.json({
//       success: true,
//       message: "Product updated successfully",
//       product,
//     });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ success: false, message: err.message });
//   }


import { NextResponse } from "next/server";
import connectDB from "../../../../config/db";
import Product from "../../../../models/Products";
import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ GET product by ID
export async function GET(req, { params }) {
  const { id } = await params;

  try {
    await connectDB();

    const product = await Product.findById(id);
    if (!product)
      return NextResponse.json({ success: false, message: "Product not found" });

    return NextResponse.json({ success: true, product });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: err.message });
  }
}

// ✅ MAIL FUNCTION
const sendMail = async (to, productName, productId) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Your Store" <${process.env.GMAIL_USER}>`,
      to,
      subject: "Product Back in Stock!",
      html: `
        <h2>🎉 ${productName} is Back in Stock!</h2>
        <p>Hurry up before it runs out again.</p>
        <a href="http://localhost:3000/product/${productId}">
          View Product
        </a>
      `,
    });

    console.log("Mail sent to:", to);
  } catch (err) {
    console.log("Mail error:", err);
  }
};

// ✅ PATCH (UPDATE PRODUCT)
// export async function PATCH(req, { params }) {
//   try {
//     await connectDB();
//     const { id } = await params;

//     const formData = await req.formData();

//     // ✅ get data FIRST
//     const existingImages = formData.getAll("existingImages");
//     const files = formData.getAll("images");

//     const userId = formData.get("userId");
//     if (!userId) {
//       return NextResponse.json({
//         success: false,
//         message: "Seller ID missing",
//       });
//     }

//     const product = await Product.findById(id);
//     if (!product) {
//       return NextResponse.json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     // ✅ STEP 1: STORE OLD STOCK
//     const oldStock = product.stock;

//     // ✅ STEP 2: UPDATE FIELDS
//     const name = formData.get("name");
//     const description = formData.get("description");
//     const category = formData.get("category");
//     const price = formData.get("price");
//     const offerPrice = formData.get("offerprice");
//     const quantity = formData.get("quantity");

//     if (name) product.name = name;
//     if (description) product.description = description;
//     product.category = category;
//     if (price !== null && price !== "") product.price = Number(price);
//     if (offerPrice !== null && offerPrice !== "")
//       product.offerPrice = Number(offerPrice);
//     if (quantity !== null && quantity !== "")
//       product.stock = Number(quantity);

//     // ✅ STEP 3: IMAGE HANDLING (FIXED)
//     let newImages = [];

//     if (files.length > 0 && files[0].size > 0) {
//       const result = await Promise.all(
//         files.map(async (file) => {
//           const buffer = Buffer.from(await file.arrayBuffer());

//           return new Promise((resolve, reject) => {
//             const stream = cloudinary.uploader.upload_stream(
//               { resource_type: "auto" },
//               (error, result) => {
//                 if (error) reject(error);
//                 else resolve(result);
//               }
//             );
//             stream.end(buffer);
//           });
//         })
//       );

//       newImages = result.map((r) => r.secure_url);
//     }

//     // ✅ FINAL IMAGE SET
//     product.image = [...existingImages, ...newImages];

//     // ✅ STEP 4: SAVE
//     await product.save();

//     // ✅ STEP 5: STOCK EMAIL LOGIC
//     if (oldStock === 0 && product.stock > 0) {
//       console.log("🔥 Stock is back, sending emails...");

//       const usersToNotify = await Notify.find({
//         productId: id,
//         notified: false,
//       });

//       for (let user of usersToNotify) {
//         await sendMail(user.email, product.name, product._id);
//         user.notified = true;
//         await user.save();
//       }

//       console.log(`✅ ${usersToNotify.length} users notified`);
//     }

//     return NextResponse.json({
//       success: true,
//       message: "Product updated successfully",
//       product,
//     });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({
//       success: false,
//       message: err.message,
//     });
//   }
// }

// this after adding sizwe
// export async function PATCH(req, { params  }) {
//   try {
//      await connectDB();

//     const { id } = await params; // ✅ FIXED HERE

//     if (!id) {
//       return NextResponse.json({
//         success: false,
//         message: "Product ID missing"
//       });
//     }

//     const formData = await req.formData();

//     const product = await Product.findById(id);
//     if (!product) {
//       return NextResponse.json({ success: false, message: "Product not found" });
//     }

//     // ========================
//     // BASIC FIELDS
//     // ========================
//     const name = formData.get("name");
//     const description = formData.get("description");
//     const category = formData.get("category");
//     const price = formData.get("price");
//     const offerPrice = formData.get("offerprice");
//     const quantity = formData.get("quantity");
//     const type = formData.get("type");



// if (type) product.type = type;
// if (name) product.name = name;
//     if (description) product.description = description;
//     if (category) product.category = category;
//     if (price !== null && price !== "") product.price = Number(price);
//     if (offerPrice !== null && offerPrice !== "") product.offerPrice = Number(offerPrice);
//     if (quantity !== null && quantity !== "") product.stock = Number(quantity);

//     // ========================
//     // IMAGES (MAIN PRODUCT)
//     // ========================
//  const existingImages = formData.getAll("existingImages");

//     const newFiles = formData.getAll("images");

//     const validFiles = newFiles.filter(
//       (file) =>
//         file &&
//         typeof file === "object" &&
//         typeof file.arrayBuffer === "function" &&
//         file.size > 0
//     );

//     let newImageUrls = [];

//     if (validFiles.length > 0) {
//       newImageUrls = await Promise.all(
//         validFiles.map(async (file) => {
//           const buffer = Buffer.from(await file.arrayBuffer());

//           return new Promise((resolve, reject) => {
//             const stream = cloudinary.uploader.upload_stream(
//               { resource_type: "image" },
//               (err, result) => {
//                 if (err) reject(err);
//                 else resolve(result.secure_url);
//               }
//             );

//             stream.end(buffer);
//           });
//         })
//       );
//     }

//     product.image = [...existingImages, ...newImageUrls];

//     // ========================
//     // SIZES (SAFE FIX)
//     // ========================
//     const sizesRaw = formData.get("sizes");
//     const sizes = sizesRaw ? JSON.parse(sizesRaw) : [];

//     const sizeFiles = formData.getAll("sizeImages");

//     const validSizeFiles = sizeFiles.filter(
//       (file) =>
//         file &&
//         typeof file === "object" &&
//         typeof file.arrayBuffer === "function" &&
//         file.size > 0
//     );

//     let sizeImageUrls = [];

//     if (validSizeFiles.length > 0) {
//       sizeImageUrls = await Promise.all(
//         validSizeFiles.map(async (file) => {
//           const buffer = Buffer.from(await file.arrayBuffer());

//           return new Promise((resolve, reject) => {
//             const stream = cloudinary.uploader.upload_stream(
//               { resource_type: "image" },
//               (err, result) => {
//                 if (err) reject(err);
//                 else resolve(result.secure_url);
//               }
//             );

//             stream.end(buffer);
//           });
//         })
//       );
//     }

//     // map sizes + images (same order like ADD)
//     let index = 0;

//     const sizesWithImages = sizes.map((s) => {
//       const image = sizeImageUrls[index] || s.image || null;
//       index++;
//       return {
//         ...s,
//         image,
//       };
//     });

//     product.sizes = sizesWithImages;

//     // ========================
//     await product.save();

//     return NextResponse.json({
//       success: true,
//       message: "Product updated successfully",
//       product,
//     });

//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({
//       success: false,
//       message: err.message,
//     });
//   }
// }


// this after adding benefits ingredient and etc




export async function PATCH(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "Product ID missing",
      });
    }

    const formData = await req.formData();

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({
        success: false,
        message: "Product not found",
      });
    }

    // ========================
    // BASIC FIELDS
    // ========================
    const name = formData.get("name");
    const description = formData.get("description");
    const category = formData.get("category");
    const price = formData.get("price");
    const offerPrice = formData.get("offerprice");
    const quantity = formData.get("quantity");
    const type = formData.get("type");

    if (type) product.type = type;
    if (name) product.name = name;
    if (description) product.description = description;
    if (category) product.category = category;
    if (price !== null && price !== "") product.price = Number(price);
    if (offerPrice !== null && offerPrice !== "") product.offerPrice = Number(offerPrice);
    if (quantity !== null && quantity !== "") product.stock = Number(quantity);

    // ========================
    // MAIN IMAGES
    // ========================
    const existingImages = formData.getAll("existingImages");
    const newFiles = formData.getAll("images");

    const validFiles = newFiles.filter(
      (file) =>
        file &&
        typeof file === "object" &&
        typeof file.arrayBuffer === "function" &&
        file.size > 0
    );

    let newImageUrls = [];

    if (validFiles.length > 0) {
      newImageUrls = await Promise.all(
        validFiles.map(async (file) => {
          const buffer = Buffer.from(await file.arrayBuffer());

          return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { resource_type: "image" },
              (err, result) => {
                if (err) reject(err);
                else resolve(result.secure_url);
              }
            );
            stream.end(buffer);
          });
        })
      );
    }

    product.image = [...existingImages, ...newImageUrls];

    // ========================
    // SIZES
    // ========================
  const sizesRaw = formData.get("sizes");
const sizes = sizesRaw ? JSON.parse(sizesRaw) : [];

const sizeFiles = formData.getAll("sizeImages");

const validSizeFiles = sizeFiles.filter(
  (file) =>
    file &&
    typeof file === "object" &&
    typeof file.arrayBuffer === "function" &&
    file.size > 0
);

let sizeImageUrls = [];

if (validSizeFiles.length > 0) {
  sizeImageUrls = await Promise.all(
    validSizeFiles.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer());

      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          (err, result) => {
            if (err) reject(err);
            else resolve(result.secure_url);
          }
        );
        stream.end(buffer);
      });
    })
  );
}

let imgIndex = 0;

product.sizes = sizes.map((s, i) => {
  const image =
    sizeImageUrls[imgIndex] ||
    product.sizes?.[i]?.image ||
    null;

  if (sizeImageUrls[imgIndex]) imgIndex++;

  return {
    ...s,
    image,
  };
});
    // ========================
    // BENEFITS
    // ========================
    const benefitsRaw = formData.get("benefits");
    const benefits = benefitsRaw ? JSON.parse(benefitsRaw) : [];

    const benefitFiles = formData.getAll("benefitImages");

    const validBenefitFiles = benefitFiles.filter(
      (file) =>
        file &&
        typeof file === "object" &&
        typeof file.arrayBuffer === "function" &&
        file.size > 0
    );

    let benefitImageUrls = [];

    if (validBenefitFiles.length > 0) {
      benefitImageUrls = await Promise.all(
        validBenefitFiles.map(async (file) => {
          const buffer = Buffer.from(await file.arrayBuffer());

          return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { resource_type: "image" },
              (err, result) => {
                if (err) reject(err);
                else resolve(result.secure_url);
              }
            );
            stream.end(buffer);
          });
        })
      );
    }

    let bIndex = 0;
    product.benefits = benefits.map((b, i) => {
      const image =
        benefitImageUrls[bIndex] ||
        product.benefits?.[i]?.image ||
        null;

      if (benefitImageUrls[bIndex]) bIndex++;

      return {
        title: b.title,
        image,
      };
    });

    // ========================
    // INGREDIENTS
    // ========================
    const ingredientsRaw = formData.get("ingredients");
    const ingredients = ingredientsRaw ? JSON.parse(ingredientsRaw) : [];

    const ingredientFiles = formData.getAll("ingredientImages");

    const validIngredientFiles = ingredientFiles.filter(
      (file) =>
        file &&
        typeof file === "object" &&
        typeof file.arrayBuffer === "function" &&
        file.size > 0
    );

    let ingredientImageUrls = [];

    if (validIngredientFiles.length > 0) {
      ingredientImageUrls = await Promise.all(
        validIngredientFiles.map(async (file) => {
          const buffer = Buffer.from(await file.arrayBuffer());

          return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { resource_type: "image" },
              (err, result) => {
                if (err) reject(err);
                else resolve(result.secure_url);
              }
            );
            stream.end(buffer);
          });
        })
      );
    }

    let iIndex = 0;
    product.ingredients = ingredients.map((ing, i) => {
      const image =
        ingredientImageUrls[iIndex] ||
        product.ingredients?.[i]?.image ||
        null;

      if (ingredientImageUrls[iIndex]) iIndex++;

      return {
        name: ing.name,
        image,
      };
    });


// ========================
// BANNERS
// ========================
const existingBanners = formData.getAll("existingBanners");

const bannerFiles = formData.getAll("banners");

const validBannerFiles = bannerFiles.filter(
  (file) =>
    file &&
    typeof file === "object" &&
    typeof file.arrayBuffer === "function" &&
    file.size > 0
);

let bannerImageUrls = [];

if (validBannerFiles.length > 0) {
  bannerImageUrls = await Promise.all(
    validBannerFiles.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer());

      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          (err, result) => {
            if (err) reject(err);
            else resolve(result.secure_url);
          }
        );

        stream.end(buffer);
      });
    })
  );
}

product.banners = [
  ...existingBanners,
  ...bannerImageUrls,
];




    // ========================
    // DIRECTIONS
    // ========================
    const directionsRaw = formData.get("directions");
    const directions = directionsRaw ? JSON.parse(directionsRaw) : [];

    product.directions = directions.map((d) => ({
      step: d.step,
    }));

    // ========================
    // SAVE
    // ========================
    await product.save();

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
      product,
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json({
      success: false,
      message: err.message,
    });
  }
}