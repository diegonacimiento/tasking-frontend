import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CreateUserPage from "./pages/CreateUserPage";
import RecoveryPassPage from "./pages/RecoveryPassPage";
import UpdateUserPage from "./pages/UpdateUserPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import TasksPage from "./pages/TasksPage";
import "./App.css";
import { ProtectedRouteLogged, ProtectedRouteUnLogged } from "./components/ProtectedRoute";

export default function App() {
  return(
    
    <BrowserRouter>

      <Routes>
        <Route element={<ProtectedRouteUnLogged />}>
          <Route path="/" element={<TasksPage />} />
          <Route path="/update-user" element={<UpdateUserPage />} />
          
        </Route>

        <Route element={<ProtectedRouteLogged />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-user" element={<CreateUserPage />} />
          <Route path="/recovery-password" element={<RecoveryPassPage />} />
          <Route path="/recovery-change-password" element={<ChangePasswordPage />} />

        </Route>
     
      </Routes>

    </BrowserRouter>
  );
};