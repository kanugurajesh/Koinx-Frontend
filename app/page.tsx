"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/styles/app.module.css";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

export default function Home() {

  const [bitcoinPrice, setBitcoinPrice] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        toast.loading("Fetching bitcoin data");
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr%2Cusd&include_24hr_change=true"
        );

        if (!response) {
          toast.dismiss();
          toast.error("Error fetching bitoin data");
          return;
        }

        const data = await response.json();
        toast.dismiss();
        setBitcoinPrice(data);
        toast.success("Bitcoin data fetched")
      } catch (error) {
        toast.dismiss()
        toast.error("Cannot fetch bitcoin data");
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Toaster />
      <nav
        className={`flex justify-between items-center border-[#DEDFE2] border-bottom border-b-2 ${styles.navbar}`}
      >
        <Link href="/">
          <Image
            src={"/koinx.svg"}
            alt="koinx"
            width={100}
            height={100}
            className="cursor-pointer"
          />
        </Link>
        <ul className={`flex gap-6 items-center ${styles.list}`}>
          <li className="cursor-pointer">Crypto Taxes</li>
          <li className="cursor-pointer">Free Tools</li>
          <li className="cursor-pointer">Resource Center</li>
          <li className="bg-gradient-to-r from-[#284BEA] to-[#1B4AEF] p-2 pl-6 pr-6 rounded-md text-white cursor-pointer">
            Get Started
          </li>
        </ul>
        <ul className={`${styles.menu}`}>
          <li className="w-6 h-1 bg-black"></li>
          <li className="w-6 h-1 bg-black"></li>
          <li className="w-6 h-1 bg-black"></li>
        </ul>
      </nav>
      <main className={`bg-[#EFF2F5] h-full w-full ${styles.main}`}>
        <p className="text-sm">
          cryptocurrencies &gt;&gt; <span className="font-medium">Bitcoin</span>
        </p>
      </main>
    </div>
  );
}
