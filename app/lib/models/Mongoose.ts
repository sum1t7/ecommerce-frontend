import mongoose from "mongoose";
let isConnected: boolean = false;

export const connectToDB = async () => {
    mongoose.set("strictQuery",true)
    if (isConnected) {
        console.log("using existing connection");
         return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URL || "",{
            dbName: "BLVCK_Store",
        })
        isConnected = true;
        console.log("new connection");
    } catch (error) {
        console.log("error connecting to db", error);
 }
}