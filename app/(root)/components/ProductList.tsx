import { getProducts } from "@/app/lib/actions/actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ProductCard from "./ProductCard";
 
const ProductList = async () => {
  const products = await getProducts();
   return (
    <div className="flex flex-col items-center gap-5 py-8 px-5">
      <p className="  medium">Explore Products</p>
      {!products || products.length === 0 ? (
        <p className="text-body-bold">No products found</p>
      ) : (
        <div className="flex flex-wrap mx-auto items-center justify-center gap-3 ">
          {products.map((product: ProductType) => {
            return <ProductCard key={product._id} product={product} />;
          })}
        </div>
      )}
    </div>
  );
};

export default ProductList;
export const dynamic = "force-dynamic";
