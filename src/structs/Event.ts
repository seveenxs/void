import { EventName, EventProps, EventRunner } from "../types/event";

export default class VoidEvent<T extends EventName> implements EventProps<T> {
  declare name: T;
  declare runner: EventRunner<T>;
  public once?: boolean | undefined;

  public constructor(props: EventProps<T>) {
    Object.assign(this, props);
  }
}