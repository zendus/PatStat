export type DoctorRoute =
  | "dashboard"
  | "patient"
  | "status"
  | "notes"
  | "shift"
  | "emergency"
  | "history"
  | "notifications"
  | "profile";

export const routeMap: Record<string, DoctorRoute> = {
  "/doctor-dashboard/dashboard": "dashboard",
  "/doctor-dashboard/patients": "patient",
  "/doctor-dashboard/status": "status",
  "/doctor-dashboard/notes": "notes",
  "/doctor-dashboard/shift": "shift",
  "/doctor-dashboard/emergency": "emergency",
  "/doctor-dashboard/history": "history",
  "/doctor-dashboard/notifications": "notifications",
  "/doctor-dashboard/profile": "profile",
};

export const footerRouteMap: Partial<Record<DoctorRoute, string>> = {
  dashboard: "dashboard",
  status: "updates",
  notes: "notes",
  profile: "profile",
};