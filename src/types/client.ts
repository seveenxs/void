import { GatewayIntentBits, IntentsBitField } from "discord.js";

export type ClientIntents = IntentsBitField[] | GatewayIntentBits[];

export interface ClientProps {
  token: string,
  intents: ClientIntents
}