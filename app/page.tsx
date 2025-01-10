"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/styles/app.module.css";
import toast, { Toaster } from "react-hot-toast";
import Chart from "@/components/TradingChat";
import Link from "next/link";
import { v4 } from "uuid";
import { fetchBitcoinPrice, fetchTrendingCoins } from "@/lib/api";
import { BitcoinPrice, TrendingCoinsResponse, TrendingCoinListItem, LikeCoinListItem } from "@/types";
import { CoinSkeleton } from "@/components/Skeleton";

export default function Home() {
  const [bitcoinPrice, setBitcoinPrice] = useState<BitcoinPrice | null>(null);
  const [trendingCoins, setTrendingCoins] = useState<TrendingCoinsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trendingCoinsList, setTrendingCoinsList] = useState<TrendingCoinListItem[]>([]);
  const [likeCoinsList, setLikeCoinsList] = useState<LikeCoinListItem[]>([]);
  const [menuClick, setMenuClick] = useState(false);
  
  const handleMenuClick = () => {
    setMenuClick(!menuClick)
  }

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const [bitcoinResponse, trendingResponse] = await Promise.all([
          fetchBitcoinPrice(),
          fetchTrendingCoins()
        ]);

        if (bitcoinResponse.error || trendingResponse.error) {
          throw new Error(bitcoinResponse.error || trendingResponse.error || 'An error occurred while fetching data');
        }

        setBitcoinPrice(bitcoinResponse.data);
        setTrendingCoins(trendingResponse.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        toast.error('Failed to load data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (!trendingCoins?.coins || !Array.isArray(trendingCoins.coins)) {
      setTrendingCoinsList([]);
      return;
    }

    const tempList = trendingCoins.coins
      .slice(0, 3)
      .map(coin => ({
        name: coin.item.name,
        thumb: coin.item.thumb,
        symbol: coin.item.symbol,
        price_btc: coin.item.price_btc,
        market_cap_rank: coin.item.market_cap_rank
      }));

    setTrendingCoinsList(tempList);
  }, [trendingCoins]);

  useEffect(() => {
    if (!trendingCoins?.coins || !Array.isArray(trendingCoins.coins)) {
      setLikeCoinsList([]);
      return;
    }

    const tempList = trendingCoins.coins
      .filter(coin => coin.item.data)
      .map(coin => ({
        symbol: coin.item.symbol,
        thumb: coin.item.thumb,
        price_change: coin.item.data?.price_change_percentage_24h.usd ?? 0,
        price: coin.item.data?.price ?? '0',
        sparkline: coin.item.data?.sparkline ?? ''
      }));

    setLikeCoinsList(tempList);
  }, [trendingCoins])

  return (
    <div className={`relative ${menuClick ? 'overflow-hidden h-screen':''}`}>
      <Toaster />
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
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
        <ul className={` ${styles.menu} ${ menuClick ? styles.click : ''} `} onClick={() => handleMenuClick()}>
          <li className="w-7 h-1 bg-black transition-all duration-800 ease-in-out"></li>
          <li className="w-7 h-1 bg-black transition-all duration-800 ease-in-out"></li>
          <li className="w-7 h-1 bg-black transition-all duration-800 ease-in-out"></li>
        </ul>
        <div className={`${styles.menuList} ${menuClick ? styles.menuShow : ''} transition-all ease-in-out duration-300`}>
          <ul className={`flex flex-col gap-8 items-center justify-center h-full`}>
            <li className="cursor-pointer hover:text-[#0141CF] border-0 border-b-2 border-[#FFFFFF] hover:border-[#0141CF] transition-all ease-in-out duration-500 pb-1 font-semibold">
              Crypto Taxes
            </li>
            <li className="cursor-pointer hover:text-[#0141CF] border-0 border-b-2 border-[#FFFFFF] hover:border-[#0141CF] transition-all ease-in-out duration-500 pb-1 font-semibold">
              Free Tools
            </li>
            <li className="cursor-pointer hover:text-[#0141CF] border-0 border-b-2 border-[#FFFFFF] hover:border-[#0141CF] transition-all ease-in-out duration-500 pb-1 font-semibold">
              Resource Center
            </li>
            <li className="bg-gradient-to-r from-[#284BEA] to-[#1B4AEF] p-2 pl-6 pr-6 rounded-md text-white cursor-pointer mb-1 font-semibold">
              Get Started
            </li>
          </ul>
        </div>
      </nav>
      <main
        className={`min-h-screen bg-white dark:bg-gray-900 ${styles.main} flex flex-col gap-2 pb-8`}
      >
        <p className="text-sm mt-4 mb-2">
          Cryptocurrencies &gt;&gt; <span className="font-medium">Bitcoin</span>
        </p>
        <section className={`${styles.section1} flex justify-between`}>
          <div className={`flex flex-col gap-2 ${styles.leftpanel}`}>
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
              {isLoading ? (
                <CoinSkeleton />
              ) : (
                <>
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
                          $ {bitcoinPrice && Intl.NumberFormat("en-IN").format(bitcoinPrice.usd)}
                        </p>
                        <div className="flex gap-2 items-center">
                          <span className={`flex gap-1 items-center ${bitcoinPrice && bitcoinPrice.usd_24h_change > 0 ? 'text-[#14B079] bg-[#EBF9F4]' : 'text-red-500 bg-red-100'} w-[84px] h-[28px] justify-center rounded-md`}>
                            <Image
                              src={bitcoinPrice && bitcoinPrice.usd_24h_change > 0 ? "/arrowup.svg" : "/arrowdown.svg"}
                              alt=""
                              width={10}
                              height={10}
                            />
                            {bitcoinPrice && Math.abs(bitcoinPrice.usd_24h_change).toFixed(2)}%
                          </span>
                          <p className="text-[#768396] text-sm">(24H)</p>
                        </div>
                      </div>
                      <p className="text-md font-semibold">
                        ₹ {bitcoinPrice && Intl.NumberFormat("en-US").format(bitcoinPrice.inr)}
                      </p>
                    </div>
                  </div>
                </>
              )}
              <div className={`${styles.leftpanelchart}`}>
                <Chart />
              </div>
            </div>
            <div className="mt-8 mb-5">
              <ul className={`flex ${styles.leftpanellist} border-b-2 border-[#DEDFE2] pb-2 font-semibold`}>
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
          <div className={`flex flex-col gap-5 ${styles.rightpanel}`}>
            <div className={`bg-[#0052FE] ${styles.rightpanelnote} rounded-md flex flex-col gap-7 justify-center items-center text-white p-10`}>
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
                Get Started for Free 
              </Link>
            </div>
            <div className={`${styles.rightpanelnote} h-[225px] bg-white dark:bg-gray-800 rounded-md p-5`}>
              <h1 className="font-semibold text-xl mb-6">
                Trending Coins (24h)
              </h1>
              <div className="flex flex-col gap-5">
                {isLoading ? (
                  <>
                    <CoinSkeleton />
                    <CoinSkeleton />
                    <CoinSkeleton />
                  </>
                ) : (
                  trendingCoinsList.map((coin) => (
                    <div className="flex items-center justify-between" key={v4()}>
                      <div className="flex font-semibold items-center gap-2">
                        <Image
                          src={coin.thumb}
                          alt={coin.name}
                          width={30}
                          height={30}
                          style={{borderRadius:'50%'}}
                        />
                        <p>{coin.name}</p>
                      </div>
                      <span className={`flex gap-1 items-center ${coin.price_btc > 0 ? 'text-[#14B079] bg-[#EBF9F4]' : 'text-red-500 bg-red-100'} w-[84px] h-[28px] justify-center rounded-md`}>
                        <Image
                          src={coin.price_btc > 0 ? "/arrowup.svg" : "/arrowdown.svg"}
                          alt=""
                          width={10}
                          height={10}
                        />
                        {Math.abs(coin.price_btc).toFixed(2)}%
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
        <section className={`${styles.section2} ${styles.prizes} bg-white dark:bg-gray-800 rounded-md gap-8`}>
          <div className="p-5 flex flex-col gap-8 w-[100%]">
            <h1 className="font-semibold text-2xl">Performance</h1>
            <div className="w-[100%] flex flex-col gap-10">
              <div className="flex justify-between items-center w-[100%] gap-10">
                <div className="flex flex-col gap-2 text-[#44475B]">
                  <p className="text-[13.78px] text-nowrap">Today&apos;s Low</p>
                  <p className="text=[#44475B] text-[15.63px] font-semibold">46,932.22</p>
                </div>
                <div className="w-[100%]">
                  <div className={`bg-gradient-to-r from-[#FF4949] via-[#FF4E11] via-[#FC870A] via-[#FFAF11] via-[#C2CB21] to-[#11EB68] h-[10px] ${styles.colorline}`}></div>
                </div>
                <div className="flex flex-col gap-2 text-[#44475B]">
                  <p className="text-[13.78px] text-nowrap">Today&apos;s High</p>
                  <p className="text=[#44475B] text-[15.63px] font-semibold">49,343.83</p>
                </div>
              </div>
              <div className="flex justify-between items-center w-[100%] gap-10">
                <div className="flex flex-col gap-2 text-[#44475B]">
                  <p className="text-[13.78px] text-nowrap">52W Low</p>
                  <p className="text=[#44475B] text-[15.63px] font-semibold">16,930.22</p>
                </div>
                <div className="w-[100%]">
                  <div className={`bg-gradient-to-r from-[#FF4949] via-[#FF4E11] via-[#FC870A] via-[#FFAF11] via-[#C2CB21] to-[#11EB68] h-[10px] ${styles.colorline}`}></div>
                </div>
                <div className="flex flex-col gap-2 text-[#44475B]">
                  <p className="text-[13.78px] text-nowrap">52W High</p>
                  <p className="text=[#44475B] text-[15.63px] font-semibold">49,743.83</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-5 flex flex-col gap-8 w-[100%]">
            <div className="flex gap-2">
              <h1 className="font-semibold text-lg text-[#44475B]">Fundamentals</h1>
              <Image src="/question.svg" alt="question" width={20} height={20} className="cursor-pointer" />
            </div>
            <div className="flex justify-between">
              <div className="w-[45%] flex flex-col gap-4">
                <div className="flex justify-between border-b-2 border-[#DEE2E6] pb-5">
                  <p className="text-[#768396] text-[14px]">Bitcoin Prize</p>
                  <p className="font-medium text-[13px]">$16,815.46</p>
                </div>
                <div className="flex justify-between border-b-2 border-[#DEE2E6] pb-5">
                  <p className="text-[#768396] text-[14px]">Bitcoin Prize</p>
                  <p className="font-medium text-[13px]">$16,815.46</p>
                </div>
                <div className="flex justify-between border-b-2 border-[#DEE2E6] pb-5">
                  <p className="text-[#768396] text-[14px]">Bitcoin Prize</p>
                  <p className="font-medium text-[13px]">$16,815.46</p>
                </div>
                <div className="flex justify-between border-b-2 border-[#DEE2E6] pb-5">
                  <p className="text-[#768396] text-[14px]">Bitcoin Prize</p>
                  <p className="font-medium text-[13px]">$16,815.46</p>
                </div>
                <div className="flex justify-between border-b-2 border-[#DEE2E6] pb-5">
                  <p className="text-[#768396] text-[14px]">Bitcoin Prize</p>
                  <p className="font-medium text-[13px]">$16,815.46</p>
                </div>
              </div>
              <div className="w-[45%] flex flex-col gap-4">
                <div className="flex justify-between border-b-2 border-[#DEE2E6] pb-5">
                  <p className="text-[#768396] text-[14px]">Bitcoin Prize</p>
                  <p className="font-medium text-[13px]">$16,815.46</p>
                </div>
                <div className="flex justify-between border-b-2 border-[#DEE2E6] pb-5">
                  <p className="text-[#768396] text-[14px]">Bitcoin Prize</p>
                  <p className="font-medium text-[13px]">$16,815.46</p>
                </div>
                <div className="flex justify-between border-b-2 border-[#DEE2E6] pb-5">
                  <p className="text-[#768396] text-[14px]">Bitcoin Prize</p>
                  <p className="font-medium text-[13px]">$16,815.46</p>
                </div>
                <div className="flex justify-between border-b-2 border-[#DEE2E6] pb-5">
                  <p className="text-[#768396] text-[14px]">Bitcoin Prize</p>
                  <p className="font-medium text-[13px]">$16,815.46</p>
                </div>
                <div className="flex justify-between border-b-2 border-[#DEE2E6] pb-5">
                  <p className="text-[#768396] text-[14px]">Bitcoin Prize</p>
                  <p className="font-medium text-[13px]">$16,815.46</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={`${styles.section2} ${styles.section3} bg-white dark:bg-gray-800 rounded-md flex flex-col gap-6 p-6 mt-3` }>
          <h1 className="font-semibold text-2xl">Sentiment</h1>
          <div className="flex flex-col gap-5 w-[100%]">
            <div className="flex gap-2">
              <p className="text-[#44475B] font-medium">Key Events</p>
              <Image src="/question.svg" alt="question" width={20} height={20} className="cursor-pointer" />
            </div>
            <div className="flex gap-2 overflow-x-scroll w-[100%] overflow-y-hidden" style={{scrollbarWidth:'none'}}>
              <div className={`${styles.section3note} flex items-start gap-3 bg-[#E8F4FD] dark:bg-gray-700 p-5 rounded-lg`}>
                <Image src="/news.svg" alt="news" width={50} height={50} />
                <div className={`${styles.section3note}`}>
                  <p className="font-semibold">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione</p>
                  <p className="font-mediumj text-[#768396]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, dicta porro, sit culpa nesciunt fugiat quasi eos velit minus fugit cum beatae numquam dolorem aspernatur, quaerat quo voluptatibus ducimus mollitia</p>
                </div>
              </div>
              <div className={`${styles.section3note} flex items-start gap-3 bg-[#EBF9F4] dark:bg-gray-700 p-5 rounded-lg`}>
                <Image src="/growth.svg" alt="news" width={50} height={50} />
                <div className={`w-[456px]`}>
                  <p className="font-semibold">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione</p>
                  <p className="font-mediumj text-[#768396]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, dicta porro, sit culpa nesciunt fugiat quasi eos velit minus fugit cum beatae numquam dolorem aspernatur, quaerat quo voluptatibus ducimus mollitia</p>
                </div>
              </div>
              <div className={`${styles.section3note} flex items-start gap-3 bg-[#E8F4FD] dark:bg-gray-700 p-5 rounded-lg`}>
                <Image src="/news.svg" alt="news" width={50} height={50} />
                <div className={`${styles.section3note}`}>
                  <p className="font-semibold">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione</p>
                  <p className="font-mediumj text-[#768396]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, dicta porro, sit culpa nesciunt fugiat quasi eos velit minus fugit cum beatae numquam dolorem aspernatur, quaerat quo voluptatibus ducimus mollitia</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex gap-2 mt-2">
              <p className="text-[#44475B] font-medium">Analyst Estimates</p>
              <Image src="/question.svg" alt="question" width={20} height={20} className="cursor-pointer" />
            </div>
            <div className="flex gap-6 items-center w-[100%]">
              <div className="w-[140.86px] h-[120px] bg-[#EBF9F4] dark:bg-gray-700 flex justify-center items-center" style={{borderRadius:'50%'}}>
                <h1 className="text-[#0FBA83] text-3xl font-semibold flex items-center">76 <span className="text-lg">%</span></h1>
              </div>
              <div className="flex flex-col gap-2  w-[100%] text-[#7C7E8C]">
                <div className="flex gap-2 items-center w-[100%]">
                  <p>Buy</p>
                  <span className={`${styles.green} bg-[#00B386] h-[10px] rounded-sm`}></span>
                  <p>76%</p>
                </div>
                <div className="flex gap-2 items-center">
                  <p>Hold</p>
                  <span className={`${styles.grey} bg-[#C7C8CE] h-[10px] rounded-sm`}></span>
                  <p>8%</p>
                </div>
                <div className="flex gap-2 items-center">
                  <p>Sell</p>
                  <span className={`${styles.red} bg-[#F7324C] h-[10px] rounded-sm`}></span>
                  <p>16%</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={`${styles.section4} bg-white dark:bg-gray-800 rounded-md mt-3 p-6 flex flex-col gap-5`}>
          <h1 className="font-semibold text-2xl">About Bitcoin</h1>
          <div className="flex flex-col gap-3 border-b-[2px] pb-4">
            <h2 className="font-semibold text-lg">What is Bitcoin?</h2>
            <p className="font-medium text-[#3E424A]">Bitcoin&apos;s price today is US$16,951.82, with a 24-hour trading volume of $19.14 B. BTC is +0.36% in the last 24 hours. It is currently -7.70% from its 7-day all-time high of $18,366.66, and 3.40% from its 7-day all-time low of $16,394.75. BTC has a circulating supply of 19.24 M BTC and a max supply of 21 M BTC.</p>
          </div>
          <div className="border-b-[2px] pb-4">
            <h2 className="font-semibold text-lg">Lorem ipsum dolor sit amet.</h2>
            <div className="flex flex-col gap-8 mt-2 font-medium text-[#3E424A]">
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae, assumenda. Nesciunt, aut incidunt. Similique consectetur itaque quidem voluptates suscipit alias voluptatem quibusdam sit veritatis deserunt, atque praesentium quod. Optio fugiat minima fugit? Aut, eos! Dolore voluptates molestiae ex natus aspernatur!
              </p>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae, assumenda. Nesciunt, aut incidunt. Similique consectetur itaque quidem voluptates suscipit alias voluptatem quibusdam sit veritatis deserunt, atque praesentium quod. Optio fugiat minima fugit? Aut, eos! Dolore voluptates molestiae ex natus aspernatur!
              </p>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae, assumenda. Nesciunt, aut incidunt. Similique consectetur itaque quidem voluptates suscipit alias voluptatem quibusdam sit veritatis deserunt, atque praesentium quod. Optio fugiat minima fugit? Aut, eos! Dolore voluptates molestiae ex natus aspernatur!
              </p>
            </div>
          </div>
          <div className="border-b-[2px] pb-4 flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">Already Holding Bitcoin?</h1>
            <div className={`flex gap-4 ${styles.cards}`}>
              <div className={`flex gap-5 items-center bg-gradient-to-r from-[#79F1A4] to-[#1F0EAD] w-[338px] h-[151px] p-4 rounded-md justify-center ${styles.card}`}>
                <Image src="/trade1.svg" alt="trade" width={120} height={120} />
                <div className="flex flex-col gap-3">
                  <h1 className="font-semibold text-white text-xl">Calculate your Profits</h1>
                  <Link href="/" className={`bg-white w-[150px] rounded-md p-2 flex justify-center items-center font-semibold ${styles.change}`}>
                    Check Now 
                  </Link>
                </div>
              </div>
              <div className={`flex gap-5 items-center bg-gradient-to-r from-[#FF9865] to-[#EF3031] w-[338px] h-[151px] p-4 rounded-md justify-center ${styles.card}`}>
                <Image src="/trade2.svg" alt="trade" width={120} height={120} />
                <div className="flex flex-col gap-3">
                  <h1 className="font-semibold text-white text-xl">Calculate your Profits</h1>
                  <Link href="/" className={`bg-white w-[150px] rounded-md p-2 flex justify-center items-center font-semibold ${styles.change}`}>
                    Check Now 
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="text-[#3E424A] font-medium">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, tempore minus. Corrupti cupiditate, eaque voluptatibus excepturi, ducimus incidunt repellat quis vitae sint cum inventore deserunt nesciunt aliquid, numquam at voluptatem. Ad eveniet voluptates repudiandae nihil aut incidunt? Eius, earum ipsam.</p>
          </div>
        </section>
        <section className={`${styles.section4} bg-white dark:bg-gray-800 rounded-md p-6 mt-3 flex flex-col gap-6`}>
          <h1 className="text-2xl font-semibold">Tokenomics</h1>
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Initial Distribution</h2>
            <div className="flex items-center gap-5 justify-start">
              <Image src="/chart.svg" alt="chart" width={150} height={150} />
              <div className="flex flex-col gap-3 items-start">
                <div className="flex gap-2 items-center">
                  <span className="w-[10px] h-[10px] bg-[#0082FF]" style={{borderRadius:'50%'}}></span>
                  <p>Crowdsale investors: 80%</p>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="w-[10px] h-[10px] bg-[#FAA002]" style={{borderRadius:'50%'}}></span>
                  <p>Foundation: 20%</p>
                </div>
              </div>
            </div>
          </div>
          <p className="font-medium">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas, aperiam! Ab id atque iure qui dolorem optio nemo labore et omnis temporibus fugit harum error impedit tempore neque unde in possimus, modi, cum doloribus illo voluptatibus ex. Fuga beatae modi dolores eius deserunt molestiae, quos reiciendis dignissimos dolorum dolor harum quibusdam nisi esse quis, ut consectetur eveniet aliquid accusamus velit!</p>
        </section>
        <section className={`${styles.section4} bg-white dark:bg-gray-800 rounded-md p-6 mt-3 flex flex-col gap-6`}>
          <h1 className="text-2xl font-semibold">Team</h1>
          <p className="font-medium text-[#3E424A]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur eligendi quibusdam vel, assumenda perspiciatis perferendis exercitationem voluptate expedita quo ipsa.</p>
          <div className="flex flex-col gap-6">
            <div className={`bg-[#E8F4FD] dark:bg-gray-700 ${styles.teamnote} p-3 rounded-md pl-6 pr-6 gap-6`}>
              <div className="flex flex-col w-[60%] justify-between items-center">
                <Image src="/person.svg" alt="" width={100} height={100} />
                <p className="font-semibold text-lg mt-1 text-nowrap">John Smith</p>
                <p className="font-semibold text-sm text-[#64748B] text-nowrap">Designation here</p>
              </div>
              <div>
                <p className="font-medium text-[#1E293B]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, assumenda. Nesciunt, aut incidunt. Similique consectetur itaque quidem voluptates suscipit alias voluptatem quibusdam sit veritatis deserunt, atque praesentium quod. Optio fugiat minima fugit? Aut, eos! Dolore voluptates molestiae ex natus aspernatur!</p>
              </div>
            </div>
            <div className={`bg-[#E8F4FD] dark:bg-gray-700 ${styles.teamnote} p-3 rounded-md pl-6 pr-6 gap-6`}>
              <div className="flex flex-col w-[60%] justify-between items-center">
                <Image src="/person.svg" alt="" width={100} height={100} />
                <p className="font-semibold text-lg mt-1 text-nowrap">John Smith</p>
                <p className="font-semibold text-sm text-[#64748B] text-nowrap">Designation here</p>
              </div>
              <div>
                <p className="font-medium text-[#1E293B]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, assumenda. Nesciunt, aut incidunt. Similique consectetur itaque quidem voluptates suscipit alias voluptatem quibusdam sit veritatis deserunt, atque praesentium quod. Optio fugiat minima fugit? Aut, eos! Dolore voluptates molestiae ex natus aspernatur!</p>
              </div>
            </div>
            <div className={`bg-[#E8F4FD] dark:bg-gray-700 ${styles.teamnote} p-3 rounded-md pl-6 pr-6 gap-6`}>
              <div className="flex flex-col w-[60%] justify-between items-center">
                <Image src="/person.svg" alt="" width={100} height={100} />
                <p className="font-semibold text-lg mt-1 text-nowrap">John Smith</p>
                <p className="font-semibold text-sm text-[#64748B] text-nowrap">Designation here</p>
              </div>
              <div>
                <p className="font-medium text-[#1E293B]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, assumenda. Nesciunt, aut incidunt. Similique consectetur itaque quidem voluptates suscipit alias voluptatem quibusdam sit veritatis deserunt, atque praesentium quod. Optio fugiat minima fugit? Aut, eos! Dolore voluptates molestiae ex natus aspernatur!</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="p-10 pt-20 pb-20 w-full flex flex-col gap-8">
        <div className=" flex flex-col gap-5">
          <h1 className="font-semibold text-2xl">You May Also Like</h1>
          <div>
            <div className="flex w-[100%] gap-2 overflow-x-scroll overflow-y-hidden" style={{scrollbarWidth:"none"}}>
              {likeCoinsList && likeCoinsList.map((obj) => {
                return (
                  <div className={`border-2  border-[#E3E3E3] rounded-lg p-4`} key={v4()}>
                    <div className="w-[252px] h-[160px] flex gap-3 flex-col">
                      <div className="flex items-center gap-2">
                        <Image
                          src={obj.thumb}
                          alt="data"
                          width={30}
                          height={30}
                          style={{borderRadius:'50%'}}
                          key={v4()}
                        />
                        <p>{obj.symbol}</p>
                        <p className={`p-1 pl-3 pr-3 bg-[#EBF9F4] dark:bg-gray-700 rounded-md text-[#32BE88] ${ Number(obj.price_change) > 0 ? '':'bg-[#fef0ee] text-[#e96975]'}`}>{Number(obj.price_change) > 0 ?  '+' + obj.price_change.toFixed(2) + '%' : obj.price_change.toFixed(2) + '%'}</p>
                      </div>
                      <p className="font-semibold text-xl">{obj.price}</p>
                      {obj.sparkline && <Image src={obj.sparkline} alt="sparkline" width={150} height={150} /> }
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className=" flex flex-col gap-5">
          <h1 className="font-semibold text-2xl">Trending Coins</h1>
          <div>
            <div className="flex w-[100%] gap-2 overflow-x-scroll overflow-y-hidden" style={{scrollbarWidth:"none"}}>
              {likeCoinsList && likeCoinsList.map((obj) => {
                return (
                  <div className={`border-2  border-[#E3E3E3] rounded-lg p-4`} key={v4()}>
                    <div className="w-[252px] h-[160px] flex gap-3 flex-col">
                      <div className="flex items-center gap-2">
                        <Image
                          src={obj.thumb}
                          alt="data"
                          width={30}
                          height={30}
                          style={{borderRadius:'50%'}}
                          key={v4()}
                        />
                        <p>{obj.symbol}</p>
                        <p className={`p-1 pl-3 pr-3 bg-[#EBF9F4] dark:bg-gray-700 rounded-md text-[#32BE88] ${ Number(obj.price_change) > 0 ? '':'bg-[#fef0ee] text-[#e96975]'}`}>{Number(obj.price_change) > 0 ?  '+' + obj.price_change.toFixed(2) + '%' : obj.price_change.toFixed(2) + '%'}</p>
                      </div>
                      <p className="font-semibold text-xl">{obj.price}</p>
                      {obj.sparkline && <Image src={obj.sparkline} alt="sparkline" width={150} height={150} /> }
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
