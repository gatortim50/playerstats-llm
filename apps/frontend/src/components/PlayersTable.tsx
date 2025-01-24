import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PlayerStats } from "@/hooks/usePlayerStats";
import { useNavigate } from 'react-router-dom';

interface TableData {
  playersData: PlayerStats[] | undefined;
  isFetching: boolean;
  offset: number;
}

export function PlaysTable({ playersData, isFetching, offset }: TableData) {
  const navigate = useNavigate();
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Rank</TableHead>
          <TableHead>Player</TableHead>
          <TableHead>Hits</TableHead>
          <TableHead className="text-right">Year</TableHead>
          <TableHead className="text-right">Age That Year</TableHead>
          <TableHead className="text-right">Bats</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {!isFetching && playersData?.map((player, index) => (
          <TableRow key={offset + index} onClick={() => navigate(`/${player.id}`)} className="cursor-pointer">
            <TableCell className="font-medium">{(offset + index + 1)}</TableCell>
            <TableCell>{player.player}</TableCell>
            <TableCell>{player.hits}</TableCell>
            <TableCell className="text-right">{player.year}</TableCell>
            <TableCell className="text-right">{player.ageThatYear}</TableCell>
            <TableCell className="text-right">{player.bats === 'L' ? 'Left-hand' : 'Right-hand'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
