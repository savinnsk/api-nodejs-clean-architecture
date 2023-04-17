export class ServerError extends Error {
  constructor(stack: string | null) {
    // inheritance needs super
    super(`Internal Server Error`);
    this.name = "ServerError";
    this.stack = stack;
  }
}
