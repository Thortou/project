export function minutesToMilliseconds(minutes: number): number {
  return minutes * 60 * 1000;
}

export function hoursToMilliseconds(hours: number): number {
  return hours * 60 * 60 * 1000;
}

export function secondsToMilliseconds(seconds: number): number {
  return seconds * 1000;
}
