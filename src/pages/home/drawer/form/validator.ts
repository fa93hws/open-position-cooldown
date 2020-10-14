export function nonEmpty(val: string) {
  return val.length > 0;
}

export function mustBeNumber(val: string) {
  return /^-?[0-9\\.]+$/.test(val);
}
