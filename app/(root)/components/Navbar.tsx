"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../Styles/styles.module.scss";
import {
  CrossIcon,
  Search,
  SearchIcon,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { useCart } from "@/app/lib/hooks/useCart";
import { motion, AnimatePresence } from "framer-motion";
import { menuSlide } from "../Styles/anim";
import SearchPage from "../search/[query]/page";
import { useRouter } from "next/navigation";
import { set } from "mongoose";

const Navbar = () => {
  const router = useRouter();
  const { user } = useUser();
  const [dropdown, setDropdown] = useState(false);
  const cart = useCart();
  const [query, setQuery] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const userNavItems = [
    { title: "Home", href: "/" },
    { title: "Orders", href: "/orders" },
    { title: "Wishlist", href: "/wishlist" },
  ];

  const navItems = [
    { title: "Home", href: "/" },
    { title: "Sign-in", href: "/sign-in" },
    { title: "Sign-up", href: "/sign-up" },
  ];

  return (
    <div className="sticky top-0 z-10 py-2 px-3 sm:px-5 md:px-7 lg:px-10 flex justify-between items-center bg-white">
      <div className="flex items-center relativelg:gap-3 md:gap-2 sm:gap-1 gap-0">
        <div className={styles.header}>
          <div onClick={() => setDropdown(!dropdown)} className={styles.button}>
            <div
              className={`${
                styles.burger + (dropdown ? ` ${styles.burgerActive}` : "")
              }`}
            ></div>
          </div>
        </div>

        <SearchIcon
          className="cursor-pointer"
          onClick={() => {
            setSearchActive(!searchActive);
            if (!searchActive) {
              setTimeout(() => inputRef.current?.focus(), 100);
            }
          }}
          />
      </div>

      <AnimatePresence>
        {searchActive ? (
          <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="  py-2 lg:w-[50%] sm:w-[30%] md:w-[40%]   flex items-center justify-between z-20 "
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Search..."
              className="flex-grow border border-gray-300 rounded-lg px-3 py-2 focus:outline-none xsm  lg:h-10 md:h-9 sm-6 h-7 "
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && query) {
                  router.push(`/search/${query}`);
                   setSearchActive(false)
                   setQuery("")
                }
              }}
              />
          </motion.div>
        ) : (
          <Link href="/" className="py-4">
            <Image
              src="/PngItem_6995402.png"
              alt="logo"
              width={130}
              height={100}
              className={`${searchActive && "hidden"}`}
            />
          </Link>
        )}
      </AnimatePresence>

      <div className="flex  gap-3 items-center relative">
        <Link
          href="/cart"
          className="flex items-center lg:gap-3 md:gap-2 sm:gap-1 gap-0 border rounded-lg px-2 py-1 hover:bg-black hover:text-white "
        >
          <ShoppingBag className="w-5 h-5 lg:w-5 lg:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          <p className="text-body-medium text-xs sm:text-sm md:text-base">
            ({cart.cartItems.length})
          </p>
        </Link>

        <AnimatePresence mode="wait">
          {dropdown && (
            <motion.div
              variants={menuSlide}
              initial="initial"
              animate="enter"
              exit="exit"
              className={styles.menu}
            >
              <div className={styles.body}>
                <div className={styles.nav}>
                  <div className={styles.header}>
                    <p>BLVCK</p>
                  </div>
                  {user
                    ? userNavItems.map((data, index) => (
                        <Link
                          key={index}
                          href={data.href}
                          onClick={() => setDropdown(false)}
                        >
                          {data.title}
                        </Link>
                      ))
                    : navItems.map((data, index) => (
                        <Link
                          key={index}
                          href={data.href}
                          onClick={() => setDropdown(false)}
                        >
                          {data.title}
                        </Link>
                      ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {user ? (
          <UserButton afterSignOutUrl="/sign-in" />
        ) : (
          <Link href="/sign-in">
            <UserRound />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
