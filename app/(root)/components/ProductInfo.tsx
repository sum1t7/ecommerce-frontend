"use client";
import { useCart } from "@/app/lib/hooks/useCart";
import { formatPrice } from "@/app/lib/Utils/AmountFormat";
import { useUser } from "@clerk/nextjs";
import { HeartIcon, Minus, MinusCircle, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProductInfo = ({ productInfo }: { productInfo: ProductType }) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [signedInUser, setSignedInUser] = useState<UserType | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [selectColor, setSelectColor] = useState<string>(productInfo.colors[0]);
  const [selectSize, setSelectSize] = useState<string>(productInfo.sizes[0]);
  const [quantity, setQuantity] = useState<number>(1);

  const cart = useCart();

  const router = useRouter();

  const handleLike = async () => {
    try {
      if (!user) {
        router.push("/sign-in");
        return;
      } else {
        setLoading(true);
        const res = await fetch("/api/users/wishlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId: productInfo._id }),
        });
        const updatedUser = await res.json();
        setSignedInUser(updatedUser);
        setIsLiked(updatedUser.wishlist.includes(productInfo._id));
        setLoading(false);
      }
    } catch (err) {
      console.log("[Like_POST]", err);
    }
  };

  const getUser = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/users");
      const data = await res.json();
      setSignedInUser(data);
      setIsLiked(data.wishlist.includes(productInfo._id));
      setLoading(false);
    } catch (err) {
      console.log("[User_GET]", err);
    }
  };
  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

   

  return (
    <div className="flex flex-col gap-6 max-w-[400px]">
      <div className="flex justify-between  items-center">
        <p className="large">{productInfo.title}</p>
      </div>
      <div className="flex gap-10">
        <p className="small-b">Rs. {formatPrice(productInfo.price)}</p>
        <button onClick={handleLike}>
          <HeartIcon fill={`${isLiked ? "black" : "white"}`} />
        </button>
      </div>

      <div>
        <p className="text-grey-2 select-none">Select size:</p>
        <div className="flex gap-3">
          {productInfo.sizes.map((size, index) => (
            <button
              className={`small border   px-2 select-none py-1 hover:bg-black hover:text-white ${
                selectSize === size && "bg-black text-white"
              }`}
              onClick={() => setSelectSize(size)}
              key={index}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-grey-2 select-none">Select Color:</p>
        <div className="flex">
          {productInfo.colors.map((color, index) => (
            <p
              className={`small select-none border   px-2 py-1 hover:bg-black hover:text-white ${
                selectColor === color && "bg-black text-white"
              }`}
              onClick={() => setSelectColor(color)}
              key={index}
            >
              {color}
            </p>
          ))}
        </div>
      </div>

      <div>
        <p className="text-grey-2 select-none">Description:</p>
        <p className="select-none">{productInfo.description}</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-base-medium text-grey-2 select-none">Quantity:</p>
        <div className="flex gap-4 items-center">
          <MinusCircle
            className="hover:text-black cursor-pointer"
            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
          />
          <p className="select-none">{quantity}</p>
          <PlusCircle
            className="hover:text-black cursor-pointer select-none"
            onClick={() => setQuantity(quantity + 1)}
          />
        </div>
      </div>
      <button
        className="outline text-base-bold py-3 rounded-lg hover:bg-black select-none hover:text-white"
        onClick={() => {
          cart.addItem({
            item: productInfo,
            quantity,
            color: selectColor,
            size: selectSize,
          });
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductInfo;
