import { getProductDetails } from "@/app/lib/actions/actions";
import React from "react";
import Gallery from "../../components/Gallery";
import ProductInfo from "../../components/ProductInfo";

const ProductDetails = async ({
  params,
}: {
  params: { productId: string };
}) => {
  const ProductDetails = await getProductDetails(params.productId);

  return (
    <div className="flex justify-center items-start gap-16 py-10 px-5 max-md:flex-col max-md:items-center">
      <Gallery productMedia={ProductDetails.media} />
      <ProductInfo productInfo={ProductDetails} />
    </div>
  );
};

export default ProductDetails;
export const dynamic = "force-dynamic";
