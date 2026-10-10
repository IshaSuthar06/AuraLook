"use client";

export default function BulkOrderPage() {

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    };

    const res = await fetch("/api/bulk-order", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (res.ok) {
      alert("Order sent successfully!");
      e.target.reset(); // clear form
    }
  };

  return (
    <div className=" flex items-center justify-center bg-gray-100 md:p-20 ">

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Bulk Order Form
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            name="name"
            type="text"
            placeholder="Your Name"
            className="border p-2 rounded"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Your Email"
            className="border p-2 rounded"
            required
          />

          <input
            name="phone"
            type="tel"
            placeholder="Phone Number"
            className="border p-2 rounded"
          />

          <textarea
            name="message"
            placeholder="Order Details"
            className="border p-2 rounded"
          />

          <button className="bg-[#1a9f82] text-white p-2 rounded hover:opacity-90">
            Submit
          </button>

        </form>
      </div>

    </div>
  );
}