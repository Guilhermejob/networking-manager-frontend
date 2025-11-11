import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntentionPage from "./pages/IntentionPage";
import { AdminProvider } from "./contexts/AdminContext";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { InviteProvider } from "./contexts/InviteContext";
import InvitePage from "./pages/InvitePage";
import { MembersProvider } from "./contexts/MembersContext";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { MembersPage } from "./pages/admin/MembersPage";

export default function App() {
  return (
    <BrowserRouter>
      <InviteProvider>
        <Routes>
          <Route path="/" element={<IntentionPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminProvider>
                  <AdminDashboard />
                </AdminProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/members"
            element={
              <ProtectedRoute>
                <AdminProvider>
                  <MembersProvider>
                    <MembersPage />
                  </MembersProvider>
                </AdminProvider>
              </ProtectedRoute>
            }
          />
          <Route path="/invite" element={<InvitePage />} />
          <Route
            path="/member-login"
            element={
              <MembersProvider>
                <MembersPage />
              </MembersProvider>
            }
          />
        </Routes>
      </InviteProvider>
    </BrowserRouter>
  );
}
