import asyncHandler from "express-async-handler";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import OpenAIService from "../services/open.ai.service";

const prisma = new PrismaClient();

const querySchema = z.object({
  page: z.string().regex(/^\d+$/).transform(Number),
  take: z.string().regex(/^\d+$/).transform(Number),
  year: z.string().regex(/^\d+$/).transform(Number).optional(),
});

const playerStatsUpdateSchema = z.object({
  rank: z.number().int().optional(),           
  player: z.string().optional(),              
  ageThatYear: z.number().int().optional(),  
  hits: z.number().int().optional(),         
  year: z.number().int().optional(),         
  bats: z.enum(['L', 'R', 'S']).optional(),  
});

const getTotlPageSchema = z.object({
  take: z.string().regex(/^\d+$/).transform(Number),
  year: z.string().regex(/^\d+$/).transform(Number),
});

export const index = asyncHandler(async (req, res) => {
  try {
    const { page, take, year } = querySchema.parse(req.query);
    const data = await prisma.playerStats.findMany({
      where: {
        ...(year && { year }),
      },
      skip: (page - 1) * take,
      take: take,
      orderBy: [
        {hits: 'desc'},
        {ageThatYear: 'desc'},
      ],
    });
    res.json({ data });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
});

export const update = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    // Validate the request body using Zod
    const validatedData = playerStatsUpdateSchema.parse(req.body);

    // Update the record in the database
    const data = await prisma.playerStats.update({
      where: { id },
      data: validatedData,
    });

    res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      // Handle validation errors
       res.status(400).json({ error: error.errors });
    }
    // Handle other errors (e.g., Prisma errors)
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

export const getDescription = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await prisma.playerStats.findUnique({
      where: {
        id,
      }
    });
    if (data) {
      const response = await OpenAIService.getDescription(data);
      
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      for await (const chunk of response) {
        res.write(chunk.choices[0]?.delta?.content || "")
      }      
    }    
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
});

export const getTotalPage = asyncHandler(async (req, res) => {
  try {
    const { take, year } = getTotlPageSchema.parse(req.query);
    const data = await prisma.playerStats.count({
      where: {
        ...(year && { year }),
      },
    });
    res.json({ data: Math.ceil(data / take) });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
});

export const getPlayer = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const data = await prisma.playerStats.findUnique({
      where: {
        id,
      },
    });
    res.json({ data });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
})
