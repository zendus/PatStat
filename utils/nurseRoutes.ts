export type NurseRoute =
  | "dashboard"
  | "patient"
  | "status"
  | "vitals"
  | "notes"
  | "history"
  | "alerts"
  | "profile";

export const routeMap: Record<string, NurseRoute> = {
  "/nurse-dashboard/dashboard": "dashboard",
  "/nurse-dashboard/patients": "patient",
  "/nurse-dashboard/status": "status",
  "/nurse-dashboard/vitals": "vitals",
  "/nurse-dashboard/notes": "notes",
  "/nurse-dashboard/history": "history",
  "/nurse-dashboard/alerts": "alerts",
  "/nurse-dashboard/profile": "profile",
};

export const footerRouteMap: Partial<Record<NurseRoute, string>> = {
  dashboard: "dashboard",
  status: "updates",
  notes: "notes",
  profile: "profile",
};