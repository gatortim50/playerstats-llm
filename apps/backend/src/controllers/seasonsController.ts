import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const index = asyncHandler(async (req, res) => {
  try {
    
    const data = await prisma.playerStats.findMany({
      where: {},
      orderBy: {
        year: 'desc'
      }
    });
    const years = data.reduce<number[]>((years, player) => {
      if (!years.includes(player.year)) {
        years.push(player.year); // Add the year if not already in the list
      }
      return years;
    }, []);
    res.json({ data: years });
  } catch (error) {
    res.status(400).json({ error });
  }
});
