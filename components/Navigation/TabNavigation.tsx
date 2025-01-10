import Link from 'next/link';

const tabs = [
  { href: '#overview', label: 'Overview', isActive: true },
  { href: '#fundamentals', label: 'Fundamentals' },
  { href: '#news-insights', label: 'News Insights' },
  { href: '#sentiments', label: 'Sentiments' },
  { href: '#team', label: 'Team' },
  { href: '#technicals', label: 'Technicals' },
  { href: '#tokenomics', label: 'Tokenomics' }
];

export default function TabNavigation() {
  return (
    <div className="mt-8 mb-5 overflow-x-auto">
      <div className="flex space-x-6 border-b border-gray-200 dark:border-gray-700 min-w-max">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`nav-link px-2 py-4 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap
              ${tab.isActive ? 'active text-blue-600 dark:text-blue-400 border-b-2 border-blue-600' : ''}
            `}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
