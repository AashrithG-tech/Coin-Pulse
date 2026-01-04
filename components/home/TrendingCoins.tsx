import React from 'react';
import { fetcher } from '@/lib/coingecko.actions';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { TrendingDown, TrendingUp } from 'lucide-react';
import Datatable from '@/components/Datatable';

const TrendingCoins = async () => {
  const trendingCoins = await fetcher<{ coins: TrendingCoin[] }>(
    '/search/trending',
    undefined,
    300,
  );

  // ✅ FIX 1: Proper data (no nested array)
  const coins = trendingCoins.coins.slice(0, 6);

  const columns: DataTableColumn<TrendingCoin>[] = [
    {
      header: 'Name',
      cellClassName: 'min-w-[200px]',
      cell: (coin) => {
        const item = coin.item;

        return (
          <Link href={`/coins/${item.id}`} className="flex items-center gap-2">
            <Image src={item.large} alt={item.name} width={36} height={36} />
            <p>{item.name}</p>
          </Link>
        );
      },
    },
    {
      header: '24h',
      cellClassName: 'text-right w-[90px]',
      headClassName: 'text-right',
      cell: (coin) => {
        const change = coin.item.data.price_change_percentage_24h?.usd ?? 0;

        const isTrendingUp = change > 0;

        return (
          <div
            className={cn(
              'price-change flex items-center gap-1',
              isTrendingUp ? 'text-green-500' : 'text-red-500',
            )}
          >
            {isTrendingUp ? (
              <TrendingUp width={16} height={16} />
            ) : (
              <TrendingDown width={16} height={16} />
            )}
          </div>
        );
      },
    },
    {
      header: 'Price',
      cellClassName: 'w-[80px] text-right ',
      headClassName: 'w-[100px] text-right',
      cell: (coin) => coin.item.data.price,
    },
  ];

  return (
    <>
      <p>Trending coins</p>
      <div id="trending-coins">
        <Datatable
          data={coins} // ✅ FIXED
          columns={columns}
          rowKey={(coin) => coin.item.id}
          tableClassName="trending-coins-table"
        />
      </div>
    </>
  );
};

export default TrendingCoins;
