const assetModules = import.meta.glob("../assets/**/*", {
  eager: true,
  import: "default",
  query: "?url",
}) as Record<string, string>;

export const resolveAssetPath = (path?: string) => {
  if (!path) return undefined;
  if (/^(https?:|data:|blob:|mailto:)/.test(path)) return path;

  const normalized = path.replace(/^\/?src\//, "").replace(/^\//, "");
  const modulePath = `../${normalized}`;

  if (assetModules[modulePath]) return assetModules[modulePath];
  if (normalized.startsWith("assets/")) return undefined;

  return path.startsWith("/") ? path : `/${path}`;
};
