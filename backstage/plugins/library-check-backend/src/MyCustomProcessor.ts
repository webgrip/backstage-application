import {Logger} from "winston";

export class MyCustomProcessor {
  constructor(logger: Logger) {
    console.log(logger);
  }
}
