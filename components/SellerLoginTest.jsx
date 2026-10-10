
"use client";

import { useState } from "react";

export default function SellerLoginTest() {
  const [email, setEmail] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    console.log("1. BUTTON CLICKED");
    console.log("2. FORM SUBMITTED");
    console.log("3. EMAIL:", email);

    alert("Button is working! Email: " + email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm space-y-4 rounded-xl bg-white p-8 shadow-lg"
      >
        <h1 className="text-2xl font-bold text-center">
          Seller Login Test
        </h1>

        <input
          type="email"
          value={email}
          onChange={(e) => {
            console.log("EMAIL INPUT CHANGED:", e.target.value);
            setEmail(e.target.value);
          }}
          placeholder="Enter seller email"
          required
          className="w-full rounded border border-gray-300 px-3 py-3"
        />

        <button
          type="submit"
          className="w-full rounded bg-sky-600 py-3 font-semibold text-white hover:bg-sky-700"
        >
          Test Login Button
        </button>
      </form>
    </div>
  );
}
