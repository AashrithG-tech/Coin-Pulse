import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

const DataTable = <T,>({
  columns,
  data,
  rowKey,
  tableClassName,
  headerClassName,
  headerRowClassName,
  headerCellClassName,
  bodyRowClassName,
  bodyCellClassName,
}: DataTableProps<T>) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-purple-100/10">
      <Table className={cn('w-full border-collapse', tableClassName)}>
        {/* HEADER */}
        <TableHeader className={headerClassName}>
          <TableRow className={cn('bg-dark-400 border-b border-purple-100/10', headerRowClassName)}>
            {columns.map((column, i) => (
              <TableHead
                key={i}
                className={cn(
                  'h-12 px-5 text-sm font-medium text-purple-200 whitespace-nowrap',
                  headerCellClassName,
                  column.headClassName,
                )}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {/* BODY */}
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow
              key={rowKey(row, rowIndex)}
              className={cn(
                'h-14 transition-colors hover:bg-dark-400/40',
                'border-b border-purple-100/5 last:border-0',
                bodyRowClassName,
              )}
            >
              {columns.map((column, columnIndex) => (
                <TableCell
                  key={columnIndex}
                  className={cn(
                    'px-5 py-3 text-sm text-purple-100 whitespace-nowrap',
                    bodyCellClassName,
                    column.cellClassName,
                  )}
                >
                  {column.cell(row, rowIndex)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
