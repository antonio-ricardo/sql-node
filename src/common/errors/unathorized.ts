export class UnathorizedError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "UnathorizedError";
    }
  }
  