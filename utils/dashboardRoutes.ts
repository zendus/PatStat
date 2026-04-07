export type DashboardRoute =
  | "overview"
  | "updates"
  | "history"
  | "careteam"
  | "notifications"
  | "help";

export const routeMap: Record<string, DashboardRoute> = {
  "/patient-dashboard/overview": "overview",
  "/patient-dashboard/updates": "updates",
  "/patient-dashboard/history": "history",
  "/patient-dashboard/careteam": "careteam",
  "/patient-dashboard/notifications": "notifications",
  "/patient-dashboard/help": "help",
};

/* Footer ONLY supports these */
export const footerRouteMap: Partial<Record<DashboardRoute, string>> = {
  overview: "status",
  updates: "updates",
  careteam: "careteam",
  help: "help",
};