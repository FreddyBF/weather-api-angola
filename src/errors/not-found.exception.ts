
export class NotFoundException extends Error {
  public constructor(message: string) {
    super(message);
    this.name = "NotFoundException";
    Object.setPrototypeOf(this, NotFoundException.prototype);
  }
}