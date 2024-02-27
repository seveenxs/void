import { Client, Collection } from "discord.js";
import { ClientProps } from "../types/client";

import VoidEvent from "./Event";
import { EventName } from "../types/event";
import { globSync } from "glob";
import VoidManager from "./VoidManager";

export default class VoidClient extends Client {
  private static instance: VoidClient;
  public void: VoidManager;
  public events: Collection<string, VoidEvent<EventName>> = new Collection();

  public static getInstance() { return VoidClient.instance };

  public constructor(public props: ClientProps) {
    super({ intents: props.intents });
    
    this.void = new VoidManager();

    VoidClient.instance = this;

    this.loadEvents();
    this.login(this.props.token);
  }

  public loadEvents() {
    const files = globSync('./src/events/**/*.ts');
    
    files.forEach(async (file) => {
      const event = (await import(`../../${file}`)).default as VoidEvent<EventName>;
      this.events.set(event.name, event);

      if (event.once) this.once(event.name, event.runner);
      else this.on(event.name, event.runner);

      console.log(`✅ Evento carregado: ${event.name}!`);
    });
  }
}