import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import HomePage from "./pages/Home";
import AdminPage from "./pages/Admin";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ProtectedRoute from "./components/PotectedRoute"; // Поправена печатна грешка (додадено 'r')
import { useAuth } from "./context/AuthContext"; // Мора да го импортираш useAuth

export default function App() {
  const { user, setUser, logout } = useAuth(); // Земаме сè што ни треба од контекстот

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (!localStorage.getItem("token") || !localStorage.getItem("user")) {
        logout(); // Наместо само setUser(null), ја повикуваме цела logout функција за да исчисти сè
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, [logout]); 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminPage />
            </ProtectedRoute>
          }
        />

        {/* PASSWORD RESET */}
        <Route path="/password-reset/:token" element={<ResetPasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
}
