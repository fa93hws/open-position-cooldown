export function nonEmpty(val: string) {
  if (val.length === 0) {
    return false;
  }
  return /(?![\r\n])./.test(val);
}

export function mustBeNumber(val: string) {
  return /^-?[0-9\\.]+$/.test(val);
}
