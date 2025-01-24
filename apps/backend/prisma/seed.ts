import axios from 'axios';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface PlayerStats {
    Rank: string;          // Player's rank
    Player: string;        // Player's name
    AgeThatYear: string;   // Player's age in the given year
    Hits: number;          // Number of hits
    Year: number;          // Year of the stats
    Bats: string;          // Batting orientation (e.g., L for Left-handed)
    id: number;            // Unique identifier for the player
  }

async function main() {
  try {
    // Fetch data from the API
    const response = await axios.get('https://api.sampleapis.com/baseball/hitsSingleSeason');
    const players = response.data as unknown as PlayerStats[]; // Adjust based on your API response structure
    const rankedPlayers = players.sort((a, b) => b.Hits - a.Hits).map((value, index) => ({...value, Rank: index+1, AgeThatYear: parseInt(value.AgeThatYear)}));

    // Transform and insert data into the database
    for (const player of rankedPlayers) {
      await prisma.playerStats.create({
        data: {
          rank: player.Rank,
          player: player.Player,
          ageThatYear: player.AgeThatYear,
          hits: player.Hits,
          year: player.Year,
          bats: player.Bats,
        },
      });
    }

    console.log('Data seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
