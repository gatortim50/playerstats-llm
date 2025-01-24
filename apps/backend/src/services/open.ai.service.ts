import OpenAI from "openai";
import dotenv from "dotenv";
import { PlayerStats } from "@prisma/client";

dotenv.config();

class OpenAIService {
  private openAI: OpenAI;

  constructor() {
    this.openAI = new OpenAI({
      apiKey: process.env.OPEN_AI_KEY,
    });
  }

  async getDescription(playerStats: PlayerStats){
    const {systemMessage, userMessage} = this.getPrompts(playerStats);
      const response = await this.openAI.chat.completions.create({
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: userMessage },
        ],
        model: 'gpt-4o-mini',
        stream: true,
      });
      return response;
  }

  getPrompts(playerStats: PlayerStats): {
    systemMessage: string;
    userMessage: string;
  } {
    const systemMessage = `
      You are a knowledgeable and detail-oriented assistant specializing in summarizing player statistics into descriptive and engaging text. Your role is to take structured data about a player's performance and provide a concise and informative description in natural language. Ensure the tone is professional and friendly.
        `.trim();

    const userMessage = `
      Based on the following player statistics, generate a concise and engaging description of the player:
      
      - ID: ${playerStats.id}
      - Rank: ${playerStats.rank}
      - Player Name: ${playerStats.player}
      - Age That Year: ${playerStats.ageThatYear}
      - Hits: ${playerStats.hits}
      - Year: ${playerStats.year}
      - Bats: ${playerStats.bats}
      
      Please include details like their rank, age, hits, and batting style in the description. The description should read naturally and highlight their performance in an engaging manner.
        `.trim();

    return { systemMessage, userMessage };
  }
}

export default new OpenAIService();
