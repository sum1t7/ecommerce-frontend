"use client"
import { formatPrice } from "@/app/lib/Utils/AmountFormat";
import { useUser } from "@clerk/nextjs";
import { HeartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";


const ProductCard = ({ product }: { product: ProductType }) => {
const {user} = useUser();
const [loading, setLoading] = useState(false);
const [signedInUser, setSignedInUser] = useState<UserType | null>(null);
const [isLiked, setIsLiked] = useState(false);
const router = useRouter();

const handleLike = async (e: React.MouseEvent<HTMLButtonElement,MouseEvent>) => {
  e.preventDefault();
  try{
    if(!user){
      router.push("/sign-in");
      return;
    }else{

        setLoading(true);
        const res = await fetch("/api/users/wishlist",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({productId:product._id})
        })
        const updatedUser = await res.json();
        setSignedInUser(updatedUser);
        setIsLiked(updatedUser.wishlist.includes(product._id));
        setLoading(false);
    }
     
  }
  catch(err){console.log("[Like_POST]",err)}
}

  const getUser = async () => {
    try{
      setLoading(true);
      const res = await fetch("/api/users")
      const data = await res.json();
      setSignedInUser(data);
      setIsLiked(data.wishlist.includes(product._id));
      setLoading(false);
    }
    catch(err){
      console.log("[User_GET]",err)}
  }
useEffect(()=>{
if(user){
  getUser();}
},[user])

  return (
    <Link
      href={`/products/${product._id}`}
      className="lg:w-[350px] w-[220px] flex flex-col gap-1 py-2"
    >
         <Image
          src={product.media[0]}
          alt="product"
          width={350}
          height={200}
          className="lg:h-[350px] h-[250px] object-cover transform transition-transform duration-500 hover:scale-105"
        />
 
      <div>
        <p className=" text-lg  ">{product.title}</p>
        <p className=" text-sm font-light">{product.category}</p>
      </div>
      <div className="flex justify-between items-center pr-5 ">
        <p className=" text-black ">Rs {formatPrice(product.price)}</p>
        
               <button onClick={handleLike}>
          <HeartIcon fill={`${isLiked ? "black":"white"}`}  />
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
