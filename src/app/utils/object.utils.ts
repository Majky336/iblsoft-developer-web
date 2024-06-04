export const removeNullUndefined = (obj: Record<string, unknown>) => Object.entries(obj).filter(([_, v]) => v != null).reduce((acc, [k, v]) => ({
  ...acc,
  [k]: v
}), {} as Record<string, unknown>);
