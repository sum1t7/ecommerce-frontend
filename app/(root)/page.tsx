 import Image from "next/image";
import Collections from "./components/Collections";
import ProductList from "./components/ProductList";

export default function Home() {
  return (
    <>
      <div className="relative">
        <Image
          src="/banner1.png"
          alt="banner"
          width={2000}
          height={1000}
          className="w-screen"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="raleway-extralight text-white text-5xl  ">
            Ready to Wear
          </p>
      </div>
        </div>
      <Collections />
      <ProductList />
    </>
  );
}