import React from 'react';
import { fetcher } from '@/lib/coingecko.actions';
import Datatable from '@/components/Datatable';
import Image from 'next/image';
import { cn, formatCurrency } from '@/lib/utils';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const CategoriesFallback = () => {
  const rows = Array.from({ length: 10 });
  return (
    <div id="categories-fallback" className="custom-scroll-bar">
      <h4>Top categories</h4>
      <div className="overflow-x-auto rounded-xl border border-purple-100/10">
        <Table className="w-full border-collapse mt-3">
          <TableHeader>
            <TableRow className="bg-dark-400 border-b border-purple-100/10">
              <TableHead className="h-12 px-5 text-sm font-medium text-purple-200 whitespace-nowrap category-cell">
                Category
              </TableHead>
              <TableHead className="h-12 px-5 text-sm font-medium text-purple-200 whitespace-nowrap top-gainers-cell">
                Top Gainers
              </TableHead>
              <TableHead className="h-12 px-5 text-sm font-medium text-purple-200 whitespace-nowrap change-header-cell">
                24 hour change
              </TableHead>
              <TableHead className="h-12 px-5 text-sm font-medium text-purple-200 whitespace-nowrap market-cap-cell">
                Market Cap
              </TableHead>
              <TableHead className="h-12 px-5 text-sm font-medium text-purple-200 whitespace-nowrap volume-cell">
                24 hour volume
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((_, i) => (
              <TableRow key={i} className="h-14 transition-colors hover:bg-dark-400/40 border-b border-purple-100/5 last:border-0">
                <TableCell className="px-5 py-3 text-sm text-purple-100 whitespace-nowrap category-cell">
                  <div className="category-skeleton skeleton rounded" />
                </TableCell>
                <TableCell className="px-5 py-3 text-sm text-purple-100 whitespace-nowrap top-gainers-cell">
                  <div className="flex items-center gap-2">
                    <div className="coin-skeleton skeleton" />
                    <div className="coin-skeleton skeleton" />
                    <div className="coin-skeleton skeleton" />
                  </div>
                </TableCell>
                <TableCell className="px-5 py-3 text-sm text-purple-100 whitespace-nowrap change-cell">
                  <div className="price-change flex items-center gap-1">
                    <div className="change-icon skeleton" />
                    <div className="value-skeleton-sm skeleton rounded" />
                  </div>
                </TableCell>
                <TableCell className="px-5 py-3 text-sm text-purple-100 whitespace-nowrap market-cap-cell">
                  <div className="value-skeleton-md skeleton rounded" />
                </TableCell>
                <TableCell className="px-5 py-3 text-sm text-purple-100 whitespace-nowrap volume-cell">
                  <div className="value-skeleton-lg skeleton rounded" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const Categories = async () => {
  try {
    const categories = await fetcher<Category[]>('/coins/categories');

    const data = categories?.slice(0, 10) ?? [];

    if (!data.length) {
      return <CategoriesFallback />;
    }

    const columns: DataTableColumn<Category>[] = [
      { header: 'Category', cellClassName: 'category-cell', cell: (category) => category.name },
      {
        header: 'Top Gainers',
        cellClassName: 'top-gainers-cell',
        cell: (category) =>
          category.top_3_coins.map((coin) => (
            <Image src={coin} alt={coin} key={coin} width={28} height={28} />
          )),
      },
      {
        header: '24 hour change',
        cellClassName: 'change-header-cell',
        cell: (category) => {
          const change = category.market_cap_change_24h ?? 0;

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
        header: 'Market Cap',
        cellClassName: 'market-cap-cell',
        cell: (category) => formatCurrency(category.market_cap),
      },
      {
        header: '24 hour volume',
        cellClassName: 'volume-cell',
        cell: (category) => formatCurrency(category.volume_24h),
      },
    ];

    return (
      <div id="categories" className="custom-scroll-bar">
        <h4>Top categories</h4>

        <Datatable
          columns={columns}
          data={data}
          rowKey={(_, index) => index}
          tableClassName="mt-3"
        />
      </div>
    );
  } catch (error) {
    console.error('Error fetching categories', error);
    return <CategoriesFallback />;
  }
};
export default Categories;
