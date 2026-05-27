import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import ResetPasswordForm from "./components/auth/ResetPasswordForm";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordForm />} />
      </Routes>
    </BrowserRouter>
  );
}
