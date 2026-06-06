export const goalQueryKeys = {
  all: ["goals"] as const,
  active: () => [...goalQueryKeys.all, "active"] as const,
  detail: (id: string) => [...goalQueryKeys.all, "detail", id] as const,
};
