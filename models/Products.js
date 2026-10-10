import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  offerPrice: { type: Number, required: true },
  image: { type: Array, required: true },
  category: { type: String, required: true },
  date: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
  available: { type: Boolean, default: true },
  sizes: [
    {
      label: String,
      price: Number,
      offerPrice: Number,
      image: String,
    },
  ],
  type: {
    type: String,
    enum: ["single", "combo"],
    default: "single",
  },
  benefits: [
    {
      title: String,
      image: String,
    },
  ],

  directions: [
    {
      step: String,
    },
  ],

  ingredients: [
    {
      name: String,
      image: String,
    },
  ],

  faqs: [
    {
      question: String,
      answer: String,
    },
  ],
banners: {
  type: [String],
  default: [],
},
});

productSchema.pre("save", function (next) {
  this.available = this.stock > 0;
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
