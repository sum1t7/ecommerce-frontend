import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "../../app/globals.css";
import Navbar from "./components/Navbar";
import ToasterProvider from "../lib/providers/ToasterProvider";

 

export const metadata: Metadata = {
  title: "Store",
  description: "BLVCK Ecommerce Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
       >
        <ClerkProvider>
          <ToasterProvider/>
          <Navbar/>
        {children}
        </ClerkProvider>
      
      </body>
    </html>
  );
}
