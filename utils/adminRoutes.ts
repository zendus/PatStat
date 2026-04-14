export type AdminRoute =
  | "overview"
  | "patient"
  | "teams"
  | "wards"
  | "access"
  | "audit"
  | "reports"
  | "settings"
  | "permissions"
  | "support";

export const routeMap: Record<string, AdminRoute> = {
  "/admin-dashboard/overview": "overview",
  "/admin-dashboard/patients": "patient",
  "/admin-dashboard/teams": "teams",
  "/admin-dashboard/wards": "wards",
  "/admin-dashboard/access": "access",
  "/admin-dashboard/audit": "audit",
  "/admin-dashboard/reports": "reports",
  "/admin-dashboard/settings": "settings",
  "/admin-dashboard/permissions": "permissions",
  "/admin-dashboard/support": "support",
};

export const footerRouteMap: Partial<Record<AdminRoute, string>> = {
  overview: "overview",
  patient: "patient",
  teams: "teams",
  wards: "wards",
  settings: "settings",
};