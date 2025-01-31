import { connectToDB } from "@/app/lib/models/Mongoose";
import User from "@/app/lib/models/Users";

import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try{
        const { userId } = await auth()

         if(!userId){
            return new NextResponse("Unauthorized",{ status: 401 });}
            await connectToDB()

            let user = await User.findOne({ clerkId: userId });

            if(!user){
                user = await User.create({clerkId: userId})
                await user.save()
             }
             return NextResponse.json(user,{status:200})

    }
    catch(err){
        console.log("[User_GET]",err)
        return new NextResponse("Internal server error",{ status: 500 });
    }
}