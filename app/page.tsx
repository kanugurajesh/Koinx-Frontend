import Image from "next/image";
import styles from "@/styles/app.module.css";

export default function Home() {
  return (
    <div>
      <nav
        className={`flex justify-between items-center border-[#DEDFE2] border-bottom border-b-2 ${styles.navbar}`}
      >
        <Image src={"/koinx.svg"} alt="koinx" width={100} height={100} />
        <ul className={`flex gap-6 items-center ${styles.list}`}>
          <li className="cursor-pointer">Crypto Taxes</li>
          <li className="cursor-pointer">Free Tools</li>
          <li className="cursor-pointer">Resource Center</li>
          <li className="bg-gradient-to-r from-[#284BEA] to-[#1B4AEF] p-2 pl-6 pr-6 rounded-md text-white cursor-pointer">
            Get Started
          </li>
        </ul>
      </nav>
      <main className="bg-[#EFF2F5] h-full w-full">{/* data */}</main>
    </div>
  );
}
