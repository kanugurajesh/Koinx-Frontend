"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/styles/app.module.css";
import toast, { Toaster } from "react-hot-toast";
import Chart from "@/components/TradingChat";
import Link from "next/link";
import {v4} from "uuid";
// import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const [bitcoinPrice, setBitcoinPrice] = useState();
  const [trendingCoins, setTrendingCoins] = useState();
  const [trendingCoinsList, setTrendingCoinsList] = useState();
  // @ts-ignore

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
        setBitcoinPrice(data.bitcoin);
        toast.success("Bitcoin data fetched");
      } catch (error) {
        toast.dismiss();
        toast.error("Cannot fetch bitcoin data");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const url = "https://api.coingecko.com/api/v3/search/trending";
    const API_KEY = process.env.NEXT_PUBLIC_COINGECKO_API_KEY as string;
    const options = { method: "GET", headers: { "x-cg-pro-api-key": API_KEY } };
    console.log(API_KEY)
    const fetchData = async () => {
      await fetch(url, options)
        .then((res) => res.json())
        .then((json) => {
          setTrendingCoins(json.coins);
        })
        .catch((err) => {
          toast.error("Error fetching trending coins");
          console.error("error:" + err);
        });
    };
    fetchData();
  }, []);

  useEffect(() => {
    let count = 0;
    const tempList = [];
    // @ts-ignore
    for (let key in trendingCoins) {
      const firstValue = trendingCoins[key];
      const data = {
        // @ts-ignore
        name: firstValue.item.name,
        // @ts-ignore
        thumb: firstValue.item.thumb,
        // @ts-ignore
        price_change: firstValue.item.data.price_change_percentage_24h.usd,
      };
      tempList.push(data);
      count++;
      if (count > 2) {
        break;
      }
    }
    // @ts-ignore
    setTrendingCoinsList(tempList);
  }, [trendingCoins]);

  useEffect(() => {
    console.log(trendingCoinsList)
  },[trendingCoinsList])

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
            className="cursor-pointer pb-1"
          />
        </Link>
        <ul className={`flex gap-6 items-center ${styles.list}`}>
          <li className="cursor-pointer hover:text-[#0141CF] border-0 border-b-2 border-[#FFFFFF] hover:border-[#0141CF] transition-all ease-in-out duration-500 pb-1">
            Crypto Taxes
          </li>
          <li className="cursor-pointer hover:text-[#0141CF] border-0 border-b-2 border-[#FFFFFF] hover:border-[#0141CF] transition-all ease-in-out duration-500 pb-1">
            Free Tools
          </li>
          <li className="cursor-pointer hover:text-[#0141CF] border-0 border-b-2 border-[#FFFFFF] hover:border-[#0141CF] transition-all ease-in-out duration-500 pb-1">
            Resource Center
          </li>
          <li className="bg-gradient-to-r from-[#284BEA] to-[#1B4AEF] p-2 pl-6 pr-6 rounded-md text-white cursor-pointer mb-1">
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
        <section className={`${styles.section1} flex justify-around`}>
          <div className={`flex flex-col gap-2 ${styles.leftpanel}`}>
            <div className="flex flex-col p-6 bg-white rounded-md gap-6">
              <div className="flex flex-col gap-8">
                <div className="flex gap-7 items-center">
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
                <div className="flex flex-col gap-1">
                  <div className="flex gap-8 items-center">
                    <p className="text-2xl font-bold">
                      $ {/* @ts-ignore */}
                      {bitcoinPrice &&
                      // @ts-ignore
                        Intl.NumberFormat("en-IN").format(bitcoinPrice.usd)}
                    </p>
                    <div className="flex gap-2 items-center">
                      <span className="flex gap-1 items-center text-[#14B079] bg-[#EBF9F4] w-[84px] h-[28px] justify-center rounded-md">
                        <Image
                          src="/arrowup.svg"
                          alt=""
                          width={10}
                          height={10}
                        />
                        {/* @ts-ignore */}
                        {bitcoinPrice && bitcoinPrice.usd_24h_change.toFixed(2)}
                        %
                      </span>
                      <p className="text-[#768396] text-sm">(24H)</p>
                    </div>
                  </div>
                  <p className="text-md font-semibold">
                    ₹ {/* @ts-ignore */}
                    {bitcoinPrice && Intl.NumberFormat("en-US").format(bitcoinPrice.inr)}
                  </p>
                </div>
              </div>
              <div className={`${styles.leftpanelchart}`}>
                <Chart />
              </div>
            </div>
            <div className="mt-8 mb-5">
              <ul className="flex gap-10 border-b-2 border-[#DEDFE2] pb-2 font-semibold">
                <li className="border-b-4 border-[#EFF2F5] hover:border-[#0141CF] pb-2 transition-all ease-in-out duration-300 hover:text-[#0141CF] cursor-pointer">
                  Overview
                </li>
                <li className="border-b-4 border-[#EFF2F5] hover:border-[#0141CF] pb-2 transition-all ease-in-out duration-300 hover:text-[#0141CF] cursor-pointer">
                  Fundamentals
                </li>
                <li className="border-b-4 border-[#EFF2F5] hover:border-[#0141CF] pb-2 transition-all ease-in-out duration-300 hover:text-[#0141CF] cursor-pointer">
                  News Insights
                </li>
                <li className="border-b-4 border-[#EFF2F5] hover:border-[#0141CF] pb-2 transition-all ease-in-out duration-300 hover:text-[#0141CF] cursor-pointer">
                  Sentiments
                </li>
                <li className="border-b-4 border-[#EFF2F5] hover:border-[#0141CF] pb-2 transition-all ease-in-out duration-300 hover:text-[#0141CF] cursor-pointer">
                  Team
                </li>
                <li className="border-b-4 border-[#EFF2F5] hover:border-[#0141CF] pb-2 transition-all ease-in-out duration-300 hover:text-[#0141CF] cursor-pointer">
                  Technicals
                </li>
                <li className="border-b-4 border-[#EFF2F5] hover:border-[#0141CF] pb-2 transition-all ease-in-out duration-300 hover:text-[#0141CF] cursor-pointer">
                  Tokenomics
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="bg-[#0052FE] w-[427px] rounded-md flex flex-col gap-7 justify-center items-center text-white p-10">
              <h1 className="font-bold text-2xl w-[268px] text-center">
                Get Started with Koinx for Free
              </h1>
              <p className="text-center w-[327px]">
                With our range of features that you can equip for free, KoinX
                allows you to be more educated and aware of your tax reports.
              </p>
              <Image src="/mobile.svg" alt="mobile" width={200} height={200} />
              <Link
                href="/"
                className="w-[237px] h-[48px] text-black bg-white flex justify-center items-center font-bold rounded-md"
              >
                Get Started for Free 🡪
              </Link>
            </div>
            <div className="w-[427px] h-[225px] bg-white rounded-md p-5">
              <h1 className="font-semibold text-xl mb-6">
                Trending Coins (24h)
              </h1>
              <div className="flex flex-col gap-5">
                {/* @ts-ignore */}
                {trendingCoinsList &&
                // @ts-ignore
                  trendingCoinsList.map((obj) => {
                    return (
                      <div className="flex items-center justify-between" key={v4()}>
                        <div className="flex font-semibold items-center gap-2">
                          <Image
                            src={obj.thumb}
                            alt="data"
                            width={30}
                            height={30}
                            style={{borderRadius:'50%'}}
                          />
                          <p>{obj.name}</p>
                        </div>
                        <div>
                          <span className="flex gap-1 items-center text-[#14B079] bg-[#EBF9F4] w-[84px] h-[28px] justify-center rounded-md">
                          <Image
                            src="/arrowup.svg"
                            alt=""
                            width={10}
                            height={10}
                          />
                          {/* @ts-ignore */}
                          {obj.price_change.toFixed(2)}
                          %
                        </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
