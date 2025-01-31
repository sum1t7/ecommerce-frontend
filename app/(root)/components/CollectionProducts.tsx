import { getCollectionDetails, getProductDetails, getProducts } from "@/app/lib/actions/actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ProductCard from "./ProductCard";

const CollectionProducts = async ({
  collectionId,
}: {
  collectionId: string;
}) => {
  const products = await getCollectionDetails(collectionId);

  // (Promise.all) is the new thing I learned. It takes an array of promises and waits for all of them to resolve before returning the result.
    const CollectionProducts = await Promise.all(products.products.map((productId: string) => getProductDetails(productId)));

  
  return (
    <div className="flex flex-col items-center gap-5 py-8 px-5">
      <p className="  medium">Explore Products</p>
      {!CollectionProducts || CollectionProducts.length === 0 ? (
        <p className="text-body-bold">No products found</p>
      ) : (
        <div className="flex flex-wrap mx-auto items-center justify-center gap-3 ">
          {CollectionProducts.map((CollectionProducts: ProductType) => {
            return (
              <ProductCard
                key={CollectionProducts._id}
                product={CollectionProducts}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CollectionProducts;
