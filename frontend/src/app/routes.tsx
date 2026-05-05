import { createBrowserRouter } from "react-router";
import { LandingPage } from "./components/LandingPage";
import { LoginPage } from "./components/LoginPage";
import { DashboardLayout } from "./components/layouts/DashboardLayout";
import { MonitoringPage } from "./components/dashboard/MonitoringPage";
import { DevicesPage } from "./components/dashboard/DevicesPage";
import { AlertsPage } from "./components/dashboard/AlertsPage";
import { ReportsPage } from "./components/dashboard/ReportsPage";
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
    Component: DashboardLayout,
    children: [
      { index: true, Component: MonitoringPage },
      { path: "devices", Component: DevicesPage },
      { path: "alerts", Component: AlertsPage },
      { path: "reports", Component: ReportsPage },
      { path: "admin", Component: AdminDashboardPage },
    ],
  },
]);