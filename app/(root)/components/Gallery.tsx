"use client"
import Image from "next/image";
import React, { useState } from "react";

const Gallery = ({ productMedia }: { productMedia: string[] }) => {
    const [mainImage, setMainImage] = useState(productMedia[0]);
  return (
    <div className="flex relative  gap-3 max-w-[500px]">
      <div className="flex absolute flex-col gap-1 h-[500px] overflow-auto tailwind-scrollbar-hide p-2">
        {productMedia.map((media, index) => (
          <Image
            key={index}
            src={media}
            width={200}
            height={200}
            alt="product"
            onClick={() => setMainImage(media)}
            className={`w-20 h-20 ${mainImage == media ? "border-black" : ""} border cursor-pointer shadow-xl object-cover`}
          />
        ))}
      </div>
      <Image
        src={mainImage}
        width={500}
        height={500}
        alt="product"
        className="w-100 h-104 shadow-xl object-cover"
      />

    </div>
  );
};

export default Gallery;
