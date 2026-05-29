import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/Home";
import AdminPage from "./pages/Admin";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ProtectedRoute from "./components/PotectedRoute"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/password-reset/:token" element={<ResetPasswordPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
