import { connectToDB } from "@/app/lib/models/Mongoose";
import User from "@/app/lib/models/Users";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try{
        const {userId } = await auth()
        if(!userId){
            return new Response("Unauthorized", { status: 401 });
        }
        await connectToDB()
        const user = await User.findOne({where:{id:userId}});
        if(!user){
            return new Response("Unauthorized", { status: 404 });
        }
        const {productId} = await req.json();
        if(!productId){
            return new Response("Product Id Required", { status: 400 });
        }
        const isLiked = user.wishlist.includes(productId);

        if(isLiked){
            user.wishlist = user.wishlist.filter((id: string )=>id!==productId);}
            else{
                user.wishlist.push(productId);
            }
            await user.save();
            return NextResponse.json(user, { status: 200 });

    }
    catch(err){
        console.log("[wishlist_Error]",err);
        return new Response("Unauthorized", { status: 401 });
    }
}