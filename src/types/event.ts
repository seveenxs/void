import { ClientEvents } from "discord.js";

export type EventName = keyof ClientEvents;
export type EventRunner<T extends EventName> = (...params: ClientEvents[T]) => Promise<any> | any;

export interface EventProps<T extends EventName> {
  name: T,
  runner: EventRunner<T>,
  once?: boolean
}