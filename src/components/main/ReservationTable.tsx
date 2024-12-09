import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils/style';
import { getTimeFromIndex } from '@/lib/utils/time';

function ReservationTableRow({ data }: any) {
  return (
    <TableRow className={cn('divide-x-[1px]')}>
      <TableCell>{getTimeFromIndex(data.index)}</TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
}

export function ReservationTable() {
  const repeatList = Array.from({ length: 20 });
  return (
    <Table className='border'>
      <TableHeader>
        <TableRow className={cn('divide-x-[1px]', '*:text-accent *:bg-accent-foreground')}>
          <TableHead>시간</TableHead>
          <TableHead>강의실 1</TableHead>
          <TableHead>강의실 2</TableHead>
          <TableHead>강의실 3</TableHead>
          <TableHead>강의실 4</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {repeatList.map((el: any, i: number) => {
          return <ReservationTableRow key={i} data={{ ...el, index: i }} />;
        })}
      </TableBody>
    </Table>
  );
}
