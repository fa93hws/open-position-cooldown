export class UnreachableException extends Error {
  constructor(val: never) {
    super(`unreachable value: ${JSON.stringify(val)}`);
  }
}
