import { createBrowserRouter } from "react-router";
import { LandingPage } from "./components/LandingPage";
import { LoginPage } from "./components/LoginPage";
import { DashboardPage } from "./components/DashboardPage";
import { MonitoringPage } from "./components/dashboard/MonitoringPage";
import { DevicesPage } from "./components/dashboard/DevicesPage";
import { AlertsPage } from "./components/dashboard/AlertsPage";
import { ReportsPage } from "./components/dashboard/ReportsPage";
import { SettingsPage } from "./components/dashboard/SettingsPage";
import { AdminDashboardPage } from "./components/dashboard/AdminDashboardPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/dashboard",
    Component: DashboardPage,
    children: [
      { index: true, Component: MonitoringPage },
      { path: "devices", Component: DevicesPage },
      { path: "alerts", Component: AlertsPage },
      { path: "reports", Component: ReportsPage },
      { path: "settings", Component: SettingsPage },
      { path: "admin", Component: AdminDashboardPage },
    ],
  },
]);
