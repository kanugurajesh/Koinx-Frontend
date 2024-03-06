"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/styles/app.module.css";
import toast, { Toaster } from "react-hot-toast";
import Chart from "@/components/TradingChat";
import Link from "next/link";

export default function Home() {
  const [bitcoinPrice, setBitcoinPrice] = useState();

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
        console.log(data.bitcoin);
        toast.dismiss();
        setBitcoinPrice(data.bitcoin);
        toast.success("Bitcoin data fetched");
      } catch (error) {
        toast.dismiss();
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
      <main
        className={`bg-[#EFF2F5] h-full w-full ${styles.main} flex flex-col gap-2`}
      >
        <p className="text-sm mt-4 mb-2">
          Cryptocurrencies &gt;&gt; <span className="font-medium">Bitcoin</span>
        </p>
        <section className={`flex ${styles.section1} `}>
          <div className={`flex flex-col gap-2 ${styles.leftpanel}`}>
            <div className="p-6 bg-white rounded-md">
              <div>
                <div className="flex gap-2 items-center">
                  <div className="flex gap-2 items-center">
                    <Image
                      src="/bitcoin.svg"
                      alt="bitcoin"
                      width={30}
                      height={30}
                    />
                    <p className="font-bold text-lg">
                      Bitcoin{" "}
                      <span className="font-medium text-sm text-[#5D667B]">
                        BTC
                      </span>{" "}
                    </p>
                  </div>
                  <p className="bg-[#808A9D] w-[80px] h-[40px] flex justify-center items-center rounded-md text-white">
                    Rank #1
                  </p>
                </div>
                <div>
                  <div>
                    {/* @ts-ignore */}
                    <p>{bitcoinPrice && bitcoinPrice.usd}</p>
                    <div>
                      {/* @ts-ignore */}
                      <p>{bitcoinPrice && bitcoinPrice.inr}</p>
                      <div>
                        {/* @ts-ignore */}
                        <span>{bitcoinPrice && bitcoinPrice.usd_24h_change}</span>
                        <p>(24H)</p>
                      </div>
                    </div>
                  </div>
                  <p></p>
                </div>
              </div>
              <div className={`${styles.leftpanelchart}`}>
                <Chart />
              </div>
            </div>
            <div></div>
          </div>
          <div className="flex flex-col gap-2">
            <div></div>
            <div></div>
          </div>
        </section>
      </main>
    </div>
  );
}
