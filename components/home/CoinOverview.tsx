import React from 'react';
import { fetcher } from '@/lib/coingecko.actions';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';
import CandlestickChart from '@/components/CandleStickChart';

const CoinOverviewFallback = () => {
  return (
    <div id="coin-overview-fallback" className="px-3 py-3 rounded-xl bg-dark-500">
      <div className="chart-header">
        <div className="flex-1">
          <div className="header pt-2 items-center">
            <div className="header-image skeleton" />
            <div className="info">
              <div className="header-line-sm skeleton rounded" />
              <div className="header-line-lg skeleton rounded" />
            </div>
          </div>
        </div>

        <div className="button-group">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="period-button-skeleton skeleton" />
          ))}
        </div>
      </div>

      <div className="chart">
        <div className="chart-skeleton skeleton" />
      </div>
    </div>
  );
};

const CoinOverview = async () => {
  try {
    const [coin, coinOHLCData] = await Promise.all([
      fetcher<CoinDetailsData>('/coins/bitcoin'),
      fetcher<OHLCData[]>('/coins/bitcoin/ohlc', {
        vs_currency: 'usd',
        days: 1, // ✅ valid
      }),
    ]);

    if (!coin || !coinOHLCData?.length) {
      return <CoinOverviewFallback />;
    }

    return (
      <div id="coin-overview">
        <CandlestickChart data={coinOHLCData} coinId="bitcoin">
          <div className="header pt-2 flex gap-3 items-center">
            <Image src={coin.image.large} alt={coin.name} width={56} height={56} />

            <div className="info">
              <p>
                {coin.name} / {coin.symbol.toUpperCase()}
              </p>
              <h1>{formatCurrency(coin.market_data.current_price.usd)}</h1>
            </div>
          </div>
        </CandlestickChart>
      </div>
    );
  } catch (error) {
    console.error('Error fetching coin overview', error);
    return <CoinOverviewFallback />;
  }
};

export default CoinOverview;
