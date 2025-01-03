'use client'

import { useEffect, useState } from 'react';
import { useMonitors } from '@/hooks/useMonitors';
import { Site } from '@/types/site';
import { useLayout } from '@/hooks/useLayout';
import { motion } from 'framer-motion';
import FilteredSites from '@/components/FilteredSites';
import { SITE_TYPES } from '@/constants/site';
import GridLayout from '@/components/layouts/GridLayout';
import ListLayout from '@/components/layouts/ListLayout';
import MasonryLayout from '@/components/layouts/MasonryLayout';
import LayoutSwitcher from '@/components/LayoutSwitcher';
import RecommendedSites from '@/components/RecommendedSites';
import { useSites } from '@/hooks/useSites';

function Header() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-12"
    >
      <motion.h1 
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="text-4xl font-bold bg-clip-text text-transparent 
          bg-gradient-to-r from-gray-900 to-gray-700 mb-4"
      >
        SitePin
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-gray-600 max-w-2xl mx-auto mb-4"
      >
        汇集网站，监控状态
      </motion.p>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-center gap-4"
      >
        <a
          href="https://github.com/MindMorbius"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
        <a
          href="https://t.me/mind_morbius"  // 替换成你的 Telegram 链接
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
        </a>
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const { sites, loading: sitesLoading } = useSites();
  const { monitors, loading: monitorsLoading } = useMonitors();
  const [layout, setLayout] = useLayout();
  const [filteredSites, setFilteredSites] = useState<Site[]>([]);

  useEffect(() => {
    if (sites.length > 0) {
      setFilteredSites(sites.filter(site => site.type === SITE_TYPES[0].value));
    }
  }, [sites]);

  function MonitorCardSkeleton() {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fluent-card rounded-xl p-6 aspect-square"
      >
        <div className="space-y-4">
          <motion.div 
            className="h-6 bg-gray-200 rounded w-3/4"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />
          <motion.div 
            className="relative aspect-[4/3] rounded-xl bg-gray-200"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.2 }}
          />
        </div>
      </motion.div>
    );
  }

  if (sitesLoading || monitorsLoading) return (
    <main className="min-h-screen bg-gradient-to-br to-indigo-50">
      <div className="subtle-pattern">
        <div className="container mx-auto px-6 py-12">
          <Header />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <MonitorCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );

  return (
    <main className="min-h-screen bg-gradient-to-br to-indigo-50">
      <div className="subtle-pattern">
        <RecommendedSites />
        
        <div className="container mx-auto px-6 py-12">
          <Header />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <FilteredSites 
              sites={sites}
              onSitesFiltered={setFilteredSites}
            />
            <LayoutSwitcher layout={layout} onChange={setLayout} />
          </div>

          <motion.div
            key={layout}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-[200px]"
          >
            {layout === 'grid' && (
              <GridLayout sites={filteredSites} monitors={monitors} />
            )}
            {layout === 'list' && (
              <ListLayout sites={filteredSites} monitors={monitors} />
            )}
            {layout === 'masonry' && (
              <MasonryLayout sites={filteredSites} monitors={monitors} />
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
