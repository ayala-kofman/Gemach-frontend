import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import GemachListPage from "./pages/GemachListPage";
import GemachDetailsPage from "./pages/GemachDetailsPage";
import GemachFormPage from "./pages/GemachFormPage";
import LoansPage from "./pages/LoansPage";
import AdminRequestsPage from "./pages/AdminRequestsPage";
import AdminUsersPage from "./pages/AdminUsersPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/gemachim" element={<GemachListPage />} />
      <Route path="/gemachim/:id" element={<GemachDetailsPage />} />
      <Route path="/gemachim/new" element={<GemachFormPage />} />
      <Route path="/gemachim/:id/loans" element={<LoansPage />} />
      <Route path="/admin/requests" element={<AdminRequestsPage />} />
      <Route path="/admin/users" element={<AdminUsersPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
