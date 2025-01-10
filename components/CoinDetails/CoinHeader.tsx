import Image from 'next/image';
import { BitcoinPrice } from '@/types';

interface CoinHeaderProps {
  bitcoinPrice: BitcoinPrice | null;
}

export default function CoinHeader({ bitcoinPrice }: CoinHeaderProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-4 sm:gap-7 items-center">
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
            </span>
          </p>
        </div>
        <p className="bg-[#808A9D] w-[80px] h-[40px] flex justify-center items-center rounded-md text-white">
          Rank #1
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex flex-wrap gap-4 sm:gap-8 items-center">
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
  );
}
