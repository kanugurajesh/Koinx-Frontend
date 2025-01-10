import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from '../ThemeToggle';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="relative bg-white dark:bg-gray-800">
      {/* Desktop and Mobile Header */}
      <div className="flex justify-between items-center p-2 px-4 border-b dark:border-gray-700">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/koinx.svg"
            alt="logo"
            width={100}
            height={40}
            className="cursor-pointer"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link 
            href="/crypto-taxes" 
            className="text-[#0F1629] dark:text-gray-200 hover:text-[#0141CF] dark:hover:text-blue-400 no-underline transition-colors"
          >
            Crypto Taxes
          </Link>
          <Link 
            href="/free-tools" 
            className="text-[#0F1629] dark:text-gray-200 hover:text-[#0141CF] dark:hover:text-blue-400 no-underline transition-colors"
          >
            Free Tools
          </Link>
          <Link 
            href="/resource-center" 
            className="text-[#0F1629] dark:text-gray-200 hover:text-[#0141CF] dark:hover:text-blue-400 no-underline transition-colors"
          >
            Resource Center
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/get-started"
              className="bg-[#1B4AEF] text-white px-6 py-2 rounded-lg hover:bg-[#1235b5] transition-colors"
            >
              Get Started
            </Link>
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/get-started"
            className="bg-[#1B4AEF] text-white px-4 py-2 rounded-lg hover:bg-[#1235b5] transition-colors text-sm"
          >
            Get Started
          </Link>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex flex-col justify-center items-center w-8 h-8"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-4 relative">
              <span className={`absolute h-0.5 w-6 bg-black dark:bg-white transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : 'translate-y-0'}`}></span>
              <span className={`absolute h-0.5 w-6 bg-black dark:bg-white translate-y-1.5 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`absolute h-0.5 w-6 bg-black dark:bg-white transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 translate-y-1.5' : 'translate-y-3'}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-4 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-800 shadow-lg">
            <Link 
              href="/crypto-taxes" 
              className="block px-3 py-2 text-base font-medium text-[#0F1629] dark:text-gray-200 hover:text-[#0141CF] dark:hover:text-blue-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Crypto Taxes
            </Link>
            <Link 
              href="/free-tools" 
              className="block px-3 py-2 text-base font-medium text-[#0F1629] dark:text-gray-200 hover:text-[#0141CF] dark:hover:text-blue-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Free Tools
            </Link>
            <Link 
              href="/resource-center" 
              className="block px-3 py-2 text-base font-medium text-[#0F1629] dark:text-gray-200 hover:text-[#0141CF] dark:hover:text-blue-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Resource Center
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
