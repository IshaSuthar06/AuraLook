import { Suspense } from "react";
import ProductsClient from "../../components/ProductsClient";
import Sidebar from "../../components/seller/Sidebar";


export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
     <ProductsClient/>

    </Suspense>
  );
}