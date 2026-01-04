import React, { Suspense } from 'react';
import CoinOverview from '@/components/home/CoinOverview';
import TrendingCoins from '@/components/home/TrendingCoins';

const Page = async () => {
  return (
    <main className="main-container">
      {/* DASHBOARD GRID */}
      <section className="grid grid-cols-12 gap-6">
        {/* LEFT CONTENT */}
        <div className="col-span-12 lg:col-span-8">
          <Suspense fallback={<div>Loading Overview...</div>}>
            <CoinOverview />
          </Suspense>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="col-span-12 lg:col-span-4">
          <Suspense fallback={<div>Loading Trending Coins...</div>}>
            <TrendingCoins />
          </Suspense>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="w-full mt-7 space-y-5">
        <p>Categories</p>
      </section>
    </main>
  );
};

export default Page;
