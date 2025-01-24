import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlayerStats } from "@/hooks/usePlayerStats"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from 'axios';
import baseUrl from "@/hooks/baseUrl"

interface Props {
  player: PlayerStats | undefined;
}

export function PlayerCard({ player }: Props) {
  const queryClient = useQueryClient()

  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState<PlayerStats>();

  const updatePlayerMutation = useMutation({
    mutationKey: ['updatePlayer'],
    mutationFn: async (playerStats: PlayerStats) => {
      const { data } = await axios.put(`${baseUrl}players/${playerStats.id}`, playerStats)
      return data.data as unknown as PlayerStats;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchPlayer', player?.id] });
    },
  })

  useEffect(() => {
    if (player?.id) setData(player);
  }, [player])

  const updatePlayer = () => {
    if (data) updatePlayerMutation.mutate(data);
    setIsEdit(false);
  }

  const changeData = (name: string, value: string) => {
    setData((prev) => ({ ...prev, [name]: name === 'player' ? value : parseInt(value) } as unknown as PlayerStats));
  }

  return (
    <Card className="w-[80%]">
      <CardHeader>
        <CardTitle>Player Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="player">Player</Label>
              <Input name="player" value={data?.player} disabled={!isEdit} onChange={(event) => changeData(event.target.name, event.target.value)} />
            </div>
            <div className="flex justify-between gap-2">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="hits">Hits</Label>
                <Input type="number" name="hits" value={data?.hits} disabled={!isEdit} onChange={(event) => changeData(event.target.name, event.target.value)} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="ageTharYear">Age That Year</Label>
                <Input type="number" name="ageTharYear" value={data?.ageThatYear} disabled={!isEdit} onChange={(event) => changeData(event.target.name, event.target.value)} />
              </div>
            </div>
            <div className="flex justify-between gap-2">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="year">Year</Label>
                <Input type="number" name="year" value={data?.year} disabled={!isEdit} onChange={(event) => changeData(event.target.name, event.target.value)} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="bats">Bats</Label>
                <Input name="bats" value={data?.bats} disabled={!isEdit} onChange={(event) => changeData(event.target.name, event.target.value)} />
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {isEdit && <Button onClick={() => updatePlayer()}>Update</Button>}
        {!isEdit && <Button onClick={() => setIsEdit(true)}>Edit</Button>}
      </CardFooter>
    </Card>
  )
}
