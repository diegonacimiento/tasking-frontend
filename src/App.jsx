import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CreateUserPage from "./pages/CreateUserPage";
import RecoveryPassPage from "./pages/RecoveryPassPage";
import UpdateUserPage from "./pages/UpdateUserPage";

import "./App.css";

export default function App() {
  return(
    <BrowserRouter>

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-user" element={<CreateUserPage />} />
        <Route path="/recovery-password" element={<RecoveryPassPage />} />
        <Route path="/update-user" element={<UpdateUserPage />} />
      </Routes>
    </BrowserRouter>
  );
};