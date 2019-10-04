export function capitalizeFirstLetter(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function getShortString(value: string, resultLength: number = 12) {
  if (value.length <= resultLength) {
    return value;
  }
  return `${value.slice(0, resultLength / 2)}…${value.slice(-resultLength / 2)}`;
}
