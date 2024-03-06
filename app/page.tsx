import Image from "next/image";

export default function Home() {
  return (
    <div>
      <nav className="flex justify-between items-center p-2 pl-12 pr-12 border-[#DEDFE2] border-bottom border-b-2">
        <Image src={"/koinx.svg"} alt="koinx" width={100} height={100} />
        <ul className="flex gap-6 font-bold items-center">
          <li className="cursor-pointer">Crypto Taxes</li>
          <li className="cursor-pointer">Free Tools</li>
          <li className="cursor-pointer">Resource Center</li>
          <li className="bg-gradient-to-r from-[#284BEA] to-[#1B4AEF] p-2 pl-6 pr-6 rounded-md text-white cursor-pointer">
            Get Started
          </li>
        </ul>
      </nav>
      <main className="bg-[#EFF2F5] h-full w-full">
        {/* data */}
      </main>
    </div>
  );
}
