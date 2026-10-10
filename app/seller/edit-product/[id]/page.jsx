'use client'
import React, { useEffect, useState } from "react";
import { assets } from "../../../../assets/juvenis-assets";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

const EditProduct = () => {
  const router = useRouter();
  const params = useParams();
  console.log("params",params)
  const productId = params.id;

  const [sellerId, setSellerId] = useState('');
  const [files, setFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [type, setType] = useState("normal"); // normal | combo
  const [sizes, setSizes] = useState([
  { label: "", price: "", offerPrice: "", image: null }
]);
const [benefits, setBenefits] = useState([{ title: "", image: null }]);
const [directions, setDirections] = useState([{ step: "" }]);
const [ingredients, setIngredients] = useState([{ name: "", image: null }]);
// banner
const [banners, setBanners] = useState([
  { image: null }
]);

const [existingBanners, setExistingBanners] = useState([]);

  // Get sellerId from localStorage
  useEffect(() => {
    const id = localStorage.getItem("sellerId");
    if (!id) {
      router.push("/seller/login");
      return;
    }
    setSellerId(id);
  }, [router]);

const fetchProduct = async () => {
  try {
    const { data } = await axios.get(`/api/product/${productId}`);

    if (data.success) {
      const p = data.product;

      setName(p.name);
      setDescription(p.description);
      setCategory(p.category);
      setPrice(p.price);
      setOfferPrice(p.offerPrice);
      setQuantity(p.stock);
setType(p.type || "normal");
      setExistingImages(p.image || []);
setBenefits(
  p.benefits?.length
    ? p.benefits.map((b) => ({ ...b, image: null }))
    : [{ title: "", image: null }]
);

setDirections(
  p.directions?.length
    ? p.directions
    : [{ step: "" }]
);

setIngredients(
  p.ingredients?.length
    ? p.ingredients.map((i) => ({ ...i, image: null }))
    : [{ name: "", image: null }]
);

// Banner
setExistingBanners(p.banners || []);


      // IMPORTANT FIX
      setSizes(
        p.sizes?.length
          ? p.sizes
          : [{ label: "", price: "", offerPrice: "", image: null }]
      );
    }
  } catch (err) {
    toast.error(err.message);
  }
};
  useEffect(() => {
    fetchProduct();
  }, [productId]);

 const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();

  formData.append("name", name);
  formData.append("description", description);
  formData.append("category", category);
  formData.append("price", price);
  formData.append("offerprice", offerPrice);
  formData.append("quantity", quantity);
  formData.append("userId", sellerId);
formData.append("type", type);
formData.append(
  "benefits",
  JSON.stringify(benefits.map((b) => ({ title: b.title })))
);

formData.append("directions", JSON.stringify(directions));

formData.append(
  "ingredients",
  JSON.stringify(ingredients.map((i) => ({ name: i.name })))
);


// existing banners
existingBanners.forEach((banner) => {
  formData.append("existingBanners", banner);
});

// new banners
banners.forEach((b) => {
  if (b.image) {
    formData.append("banners", b.image);
  }
});


  // =====================
  // IMAGES
  // =====================
  existingImages.forEach((img) => {
    formData.append("existingImages", img);
  });

  files.forEach((file) => {
    if (file) formData.append("images", file);
  });
  benefits.forEach((b) => {
  if (b.image) formData.append("benefitImages", b.image);
});

ingredients.forEach((i) => {
  if (i.image) formData.append("ingredientImages", i.image);
});

  // =====================
  // SIZES (SAME AS ADD)
  // =====================
  const filteredSizes = sizes.filter(
    (s) => s.label && s.price && s.offerPrice
  );

  formData.append("sizes", JSON.stringify(filteredSizes));

  filteredSizes.forEach((s) => {
    if (s.image) {
      formData.append("sizeImages", s.image);
    }
  });

  try {
    const { data } = await axios.patch(
      `/api/product/${productId}`,
      formData
    );

    if (data.success) {
      toast.success(data.message);
      router.push("/seller/product-list");
    }
  } catch (err) {
    toast.error(err.message);
  }
};
  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">
        
        {/* Product Images */}
        <div>
          <p className="text-base font-medium">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {/* Existing Images */}
            {existingImages.map((img, index) => (
  <label key={index} htmlFor={`replace-image-${index}`}>
    
    <input
      type="file"
      id={`replace-image-${index}`}
      hidden
      onChange={(e) => {
  const file = e.target.files[0];

  const updatedFiles = [...files];
  updatedFiles[index] = file;
  setFiles(updatedFiles);

  // ❗ REMOVE replaced image
  const updatedExisting = existingImages.filter((_, i) => i !== index);
  setExistingImages(updatedExisting);
}}
    />

    <Image
      src={img}
      alt="existing"
      width={100}
      height={100}
      className="rounded cursor-pointer"
    />
  </label>
))}

            {/* New Images */}
            {[...Array(2)].map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input
                  type="file"
                  id={`image${index}`}
                  hidden
                  onChange={(e) => {
                    const updatedFiles = [...files];
                    updatedFiles[index] = e.target.files[0];
                    setFiles(updatedFiles);
                  }}
                />
                <Image
                  src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area}
                  alt=""
                  width={100}
                  height={100}
                  className="cursor-pointer max-w-24"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Product Name */}
        <div className="flex flex-col gap-1 max-w-md">
          <label htmlFor="product-name" className="text-base font-medium">Product Name</label>
          <input
            type="text"
            id="product-name"
            placeholder="Type here"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
          />
        </div>

        {/* Product Description */}
        <div className="flex flex-col gap-1 max-w-md">
          <label htmlFor="product-description" className="text-base font-medium">Product Description</label>
          <textarea
            id="product-description"
            rows={4}
            placeholder="Type here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
          />
        </div>

        {/* Category, Price, Offer Price, Quantity */}
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex flex-col gap-1 w-32">
            <label htmlFor="category" className="text-base font-medium">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            >
              <option value="Detox">Detox</option>
              <option value="Health Juices ">Health Juices</option>
              <option value="Energy and Performance">Energy and Performance</option>
              <option value="Pain Relief">Pain Relief</option>
            </select>
          </div>

          <div className="flex flex-col gap-1 w-32">
            <label htmlFor="product-price" className="text-base font-medium">Product Price</label>
            <input
              type="number"
              id="product-price"
              placeholder="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            />
          </div>

          <div className="flex flex-col gap-1 w-32">
            <label htmlFor="offer-price" className="text-base font-medium">Offer Price</label>
            <input
              type="number"
              id="offer-price"
              placeholder="0"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              required
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            />
          </div>
         <div className="flex flex-col gap-1 w-32">
  <label className="text-base font-medium">Product Type</label>
  <select
    value={type}
    onChange={(e) => setType(e.target.value)}
    className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
  >
    <option value="normal">Normal</option>
    <option value="combo">Combo</option>
  </select>
</div>
          <div>
  <p className="text-base font-medium">Sizes (optional)</p>

  {sizes.map((size, index) => (
    <div key={index} className="flex gap-2 mt-2">

      <input
        type="text"
        placeholder="Size"
        value={size.label}
        onChange={(e) => {
          const updated = [...sizes];
          updated[index].label = e.target.value;
          setSizes(updated);
        }}
        className="border p-2 rounded"
      />

      <input
        type="number"
        placeholder="Price"
        value={size.price}
        onChange={(e) => {
          const updated = [...sizes];
          updated[index].price = e.target.value;
          setSizes(updated);
        }}
        className="border p-2 rounded"
      />

      <input
        type="number"
        placeholder="Offer Price"
        value={size.offerPrice}
        onChange={(e) => {
          const updated = [...sizes];
          updated[index].offerPrice = e.target.value;
          setSizes(updated);
        }}
        className="border p-2 rounded"
      />

      <input
        type="file"
        onChange={(e) => {
          const updated = [...sizes];
          updated[index].image = e.target.files[0];
          setSizes(updated);
        }}
        className="border p-2 rounded"
      />
    </div>
  ))}

  <button
    type="button"
    onClick={() =>
      setSizes([
        ...sizes,
        { label: "", price: "", offerPrice: "", image: null }
      ])
    }
    className="mt-2 text-sm text-blue-500"
  >
    + Add Size
  </button>
</div>
{/* benefits */}
<div>
  <p className="text-base font-medium">Benefits</p>

  {benefits.map((item, index) => (
    <div key={index} className="flex gap-2 mt-2">
      <input
        type="text"
        placeholder="Benefit title"
        value={item.title}
        onChange={(e) => {
          const updated = [...benefits];
          updated[index].title = e.target.value;
          setBenefits(updated);
        }}
        className="border p-2 rounded"
      />

      <input
        type="file"
        onChange={(e) => {
          const updated = [...benefits];
          updated[index].image = e.target.files[0];
          setBenefits(updated);
        }}
        className="border p-2 rounded"
      />
    </div>
  ))}

  <button
    type="button"
    onClick={() =>
      setBenefits([...benefits, { title: "", image: null }])
    }
    className="text-blue-500 mt-2"
  >
    + Add Benefit
  </button>
</div>

{/* direction */}
<div>
  <p className="text-base font-medium">Directions</p>

  {directions.map((item, index) => (
    <input
      key={index}
      type="text"
      placeholder="Step"
      value={item.step}
      onChange={(e) => {
        const updated = [...directions];
        updated[index].step = e.target.value;
        setDirections(updated);
      }}
      className="border p-2 rounded w-full mt-2"
    />
  ))}

  <button
    type="button"
    onClick={() =>
      setDirections([...directions, { step: "" }])
    }
    className="text-blue-500 mt-2"
  >
    + Add Step
  </button>
</div>

{/* ingredient */}
<div>
  <p className="text-base font-medium">Ingredients</p>

  {ingredients.map((item, index) => (
    <div key={index} className="flex gap-2 mt-2">
      <input
        type="text"
        placeholder="Ingredient name"
        value={item.name}
        onChange={(e) => {
          const updated = [...ingredients];
          updated[index].name = e.target.value;
          setIngredients(updated);
        }}
        className="border p-2 rounded"
      />

      <input
        type="file"
        onChange={(e) => {
          const updated = [...ingredients];
          updated[index].image = e.target.files[0];
          setIngredients(updated);
        }}
        className="border p-2 rounded"
      />
    </div>
  ))}

  <button
    type="button"
    onClick={() =>
      setIngredients([...ingredients, { name: "", image: null }])
    }
    className="text-blue-500 mt-2"
  >
    + Add Ingredient
  </button>
</div>


{/* banners */}
<div>
  <p className="text-base font-medium">Banner Images</p>

  {/* Existing banners */}
  <div className="flex flex-wrap gap-3 mt-2">
    {existingBanners.map((banner, index) => (
      <label key={index} htmlFor={`replace-banner-${index}`}>
        <input
          type="file"
          hidden
          id={`replace-banner-${index}`}
          onChange={(e) => {
            const file = e.target.files[0];

            const updated = [...banners];
            updated[index] = { image: file };
            setBanners(updated);

            // remove old banner
            const updatedExisting = existingBanners.filter(
              (_, i) => i !== index
            );

            setExistingBanners(updatedExisting);
          }}
        />

        <Image
          src={banner}
          alt="banner"
          width={120}
          height={80}
          className="rounded cursor-pointer"
        />
      </label>
    ))}
  </div>

  {/* New banners */}
  {banners.map((item, index) => (
    <div key={index} className="flex gap-2 mt-2 items-center">

      <input
        type="file"
        onChange={(e) => {
          const updated = [...banners];
          updated[index].image = e.target.files[0];
          setBanners(updated);
        }}
        className="border p-2 rounded"
      />

      {item.image && (
        <Image
          src={URL.createObjectURL(item.image)}
          alt="preview"
          width={120}
          height={80}
          className="rounded"
        />
      )}
    </div>
  ))}

  <button
    type="button"
    onClick={() =>
      setBanners([...banners, { image: null }])
    }
    className="text-blue-500 mt-2"
  >
    + Add Banner
  </button>
</div>


          <div className="flex flex-col gap-1 w-32">
            <label htmlFor="quantity" className="text-base font-medium">Quantity</label>
            <input
              type="number"
              id="quantity"
              placeholder="0"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="px-8 py-2.5 bg-[#1893bf] text-white font-medium rounded">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProduct;