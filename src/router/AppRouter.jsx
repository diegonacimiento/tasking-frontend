import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import CreateUserPage from "../pages/CreateUserPage";
import RecoveryPassPage from "../pages/RecoveryPassPage";
import UpdateUserPage from "../pages/UpdateUserPage";
import ChangePasswordPage from "../pages/ChangePasswordPage";
import TasksPage from "../pages/TasksPage";
import NotFoundPage from "../pages/NotFoundPage";
import ServerErrorPage from "../pages/ServerErrorPage";
import {
  ProtectedRouteLogged,
  ProtectedRouteUnLogged,
  ProtectedRecoveryPass,
} from "../components/ProtectedRoute";
import { ContextProvider } from "../context/Context";
import Layout from "../components/Layout";


export default function AppRouter() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <Layout>
          <Routes>
            <Route element={<ProtectedRouteUnLogged />}>
              <Route path="/" element={<TasksPage />} />
              <Route path="/update-user" element={<UpdateUserPage />} />
            </Route>

            <Route element={<ProtectedRouteLogged />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/create-user" element={<CreateUserPage />} />
              <Route path="/recovery-password" element={<RecoveryPassPage />} />
            </Route>

            <Route element={<ProtectedRecoveryPass />}>
              <Route
                path="/recovery-change-password"
                element={<ChangePasswordPage />}
              />
            </Route>

            <Route path="/server-error" element={<ServerErrorPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </ContextProvider>
    </BrowserRouter>
  );
}
