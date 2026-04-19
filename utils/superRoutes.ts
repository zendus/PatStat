export type SuperRoute =
  | "overview"
  | "hospital"
  | "admins"
  | "audit"
  | "settings";

export const routeMap: Record<string, SuperRoute> = {
  "/super-admin/overview": "overview",
  "/super-admin/hospitals": "hospital",
  "/super-admin/admins": "admins",
  "/super-admin/audit": "audit",
  "/super-admin/settings": "settings",
};

export const footerRouteMap: Partial<Record<SuperRoute, string>> = {
  overview: "overview",
  hospital: "hospital",
  admins: "admins",
  audit: "audit",
  settings: "settings",
};