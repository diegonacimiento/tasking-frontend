import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CreateUserPage from "./pages/CreateUserPage";
import RecoveryPassPage from "./pages/RecoveryPassPage";
import UpdateUserPage from "./pages/UpdateUserPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import TasksPage from "./pages/TasksPage";
import NotFoundPage from "./pages/NotFoundPage";
import "./App.css";
import { ProtectedRouteLogged, ProtectedRouteUnLogged } from "./components/ProtectedRoute";

export default function App() {
  return(
    
    <BrowserRouter>

      <Routes>
        <Route element={<ProtectedRouteUnLogged />}>
          <Route path="/tasking-frontend/" element={<TasksPage />} />
          <Route path="/tasking-frontend/update-user" element={<UpdateUserPage />} />
          
        </Route>

        <Route element={<ProtectedRouteLogged />}>
          <Route path="/tasking-frontend/login" element={<LoginPage />} />
          <Route path="/tasking-frontend/create-user" element={<CreateUserPage />} />
          <Route path="/tasking-frontend/recovery-password" element={<RecoveryPassPage />} />
          <Route path="/tasking-frontend/recovery-change-password" element={<ChangePasswordPage />} />

        </Route>

        <Route path="*" element={<NotFoundPage />} />
     
      </Routes>

    </BrowserRouter>
  );
};