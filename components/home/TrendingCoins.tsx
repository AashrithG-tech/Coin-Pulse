import React from 'react';
import { fetcher } from '@/lib/coingecko.actions';
import Link from 'next/link';
import Image from 'next/image';
import { cn, formatCurrency } from '@/lib/utils';
import { TrendingDown, TrendingUp } from 'lucide-react';
import Datatable from '@/components/Datatable';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const TrendingCoinsFallback = () => {
  const rows = Array.from({ length: 6 });
  return (
    <div id="trending-coins-fallback">
      <h4>Trending coins</h4>
      <div className="trending-coins-table">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="name-cell px-5">Name</TableHead>
              <TableHead className="text-right pr-5">24h</TableHead>
              <TableHead className="text-right pr-5">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((_, i) => (
              <TableRow key={i} className="h-14">
                <TableCell className="px-5">
                  <div className="name-link">
                    <div className="name-image skeleton" />
                    <div className="name-line skeleton rounded" />
                  </div>
                </TableCell>
                <TableCell className="text-right pr-5">
                  <div className="price-change justify-end">
                    <div className="change-icon skeleton" />
                    <div className="change-line skeleton rounded" />
                  </div>
                </TableCell>
                <TableCell className="text-right pr-5">
                  <div className="value-skeleton-sm skeleton rounded ml-auto" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const TrendingCoins = async () => {
  try {
    const trendingCoins = await fetcher<{ coins: TrendingCoin[] }>(
      '/search/trending',
      undefined,
      300,
    );

    const coins = trendingCoins?.coins?.slice(0, 6) ?? [];

    if (!coins.length) {
      return <TrendingCoinsFallback />;
    }

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
              <span>
                {change > 0 ? '+' : ''}
                {change.toFixed(2)}%
              </span>
            </div>
          );
        },
      },
      {
        header: 'Price',
        cellClassName: 'w-[80px] text-right ',
        headClassName: 'w-[100px] text-right',
        cell: (coin) => formatCurrency(coin.item.data.price),
      },
    ];

    return (
      <>
        <p>Trending coins</p>
        <div id="trending-coins">
          <Datatable
            data={coins}
            columns={columns}
            rowKey={(coin) => coin.item.id}
            tableClassName="trending-coins-table"
          />
        </div>
      </>
    );
  } catch (error) {
    console.error('Error fetching trending coins', error);
    return <TrendingCoinsFallback />;
  }
};

export default TrendingCoins;
