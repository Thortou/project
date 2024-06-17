export function camelToSnakeCase(input: string): string {
    return input.replace(/([A-Z])/g, (match) => `_${match.toLowerCase()}`);
  }
  