import { getCollections } from "@/app/lib/actions/actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Collections = async () => {
  const collections = await getCollections();
  return (
    <div className="flex flex-col items-center gap-5 py-8 px-5">
      <p className="medium">Explore Collections</p>
      {!collections || collections.length === 0 ? (
        <p className="text-body-bold">No collections found</p>
      ) : (
        <div className="flex items-center justify-center lg:gap-8 gap-5 ">
          {collections.map((collection: CollectionType) => {
            return (
              <Link
                href={`/collections/${collection._id}`}
                key={collection._id}
                className="relative group block lg:w-[450px]"
              >
                <Image
                  src={collection.image}
                  alt={collection.title}
                  width={350}
                  height={200}
                  className="h-[200px] lg:h-[300px] lg:w-[450px] object-cover"
                />
                <div className="absolute inset-0 flex items-end justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-center pb-8">
                    <p className="text-white text-lg font-light">
                      {collection.title}
                    </p>
                    <span className="block w-8 h-[1px] bg-white mt-2 mx-auto"></span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Collections;
