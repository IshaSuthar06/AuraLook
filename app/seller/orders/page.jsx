
"use client"
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useApp } from "../../../context/AppContext";
import { assets } from "../../../assets/juvenis-assets";
import Image from "next/image";
import { Loader2Icon } from "lucide-react";

export default function SellerOrders() {
    const { user, isSeller } = useApp();
  const [sellerId, setSellerId] = useState("")
  const [orders, setOrders] = useState([]);
  const [orderStatusLoaderId, setOrderStatusLoaderId] = useState("")  
  // Fetch all orders on mount if user is a seller
  useEffect(() => {
    // if (!user?._id || !isSeller) return;
    const id = localStorage.getItem("sellerId")
    setSellerId(id)
    if(sellerId) {
      fetchOrders();
    }
  }, [sellerId]);

  const fetchOrders = async () => {
    try {
      // GET all orders (no filtering by seller)
      const { data } = await axios.get(`/api/order/seller/orders?sellerId=${sellerId}`);
      console.log(data)
      if (data.success) setOrders(data.orders);
      else toast.error(data.message);
    } catch (err) {
      toast.error("Failed to load orders");
    }
  };

  const updateOrderStatus = (order) =>async(e)=> {
    const newStatus = e.target.value
    setOrderStatusLoaderId(order.id)
    try {
      const { data } = await axios.patch(`/api/order/seller/orders`, {
        orderId : order._id,
        status: newStatus,
        sellerId: sellerId,
      });
      if (data.success) {
        toast.success("Order updated");
        fetchOrders(); // refresh updated data
      } else toast.error(data.message);
    } catch (err) {
      toast.error("Failed to update order");
    }finally{
      setOrderStatusLoaderId("")
    }
  };

  return (
    <div className="flex-1 h-screen overflow-scroll flex flex-col justify-between text-sm">
      {/* {loading ? (
        <Loading />
      ) : ( */}
        <div className="md:p-10 p-4 space-y-5">
          <h2 className="text-lg font-medium">Orders</h2>
          <div className="max-w-4xl rounded-md">
            {orders.map((order, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-5 justify-between p-5 border-t border-gray-300"
              >
                <div className="flex-1 flex gap-5 max-w-80">
                  <Image
                    className="max-w-16 max-h-16 object-cover"
                    src={assets.parcel_icon}
                    alt="box_icon"
                  />
                  <p className="flex flex-col gap-3">
                    <span className="font-medium flex flex-col gap-1">
                      {order.items
                         .map((item,idx) =>(
                          <span key={idx}>
                           {item.product
  ? `${item.product.name} ${item.size ? `(${item.size})` : ""} x ${item.quantity}`
  : `Deleted Product ${item.size ? `(${item.size})` : ""} x ${item.quantity}`}
                          </span>
                         )
                         )}
                    </span>
                    <span>Items : {order.items.length}</span>
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-medium">
                      {order.address.fullName}
                    </span>
                    <br />
                    <span>{order.address.area}</span>
                    <br />
                    <span>{`${order.address.city}, ${order.address.state}`}</span>
                    <br />
                    <span>{order.address.phoneNumber}</span>
                  </p>
                </div>
                <p className="font-medium my-auto">
                  {"Rs "}
                  {(order.amount / 100).toFixed(2)}
                </p>
                <div>
                  <p className="flex flex-col">
                    {/* <span>Method : COD</span> */}
                    <span>
                      Date : {new Date(order.date).toLocaleDateString()}
                    </span>
                    <span>Payment Status:</span>
                    <span className={order.paymentStatus === "PAID" ? "text-green-600" : "text-red-600"}> {order.paymentStatus} </span>
                  </p>
                </div>
                 <div className="flex gap-2 flex-col">
                 <div>Order Status</div>
                <div className="flex md:justify-center items-center">
                  {/* {
                    order.id === orderStatusLoaderId ? (
                    <div className="flex border p-1 rounded items-center gap-2">
                      <Loader2Icon className="animate-spin" />
                      <p>
                        {order.status === "Order Placed" ?"Pending" : order.status}
                      </p>
                    </div>
                    ) : ( */}
                    <select
                    value={order.status}
                    onChange={updateOrderStatus(order)}
                    className="flex border p-1 rounded text-center "
                    >
                    <option value="Pending">Pending</option>
                    <option value="Dispatch">Dispatch</option>
                    <option value="Delivery">Delivery</option>
                    <option value="Cancelled">Cancelled</option>

                  </select>
                    {/* )
                  
                } */}
               
                </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      {/* )} */}
      {/* <Footer /> */}
    </div>
  );
}
