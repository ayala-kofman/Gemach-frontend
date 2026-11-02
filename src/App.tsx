import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import GemachDetailsPage from "./pages/GemachDetailsPage";
import GemachFormPage from "./pages/GemachFormPage";
import AdminRequestsPage from "./pages/AdminRequestsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { Role } from "./types/role";
import MyGemachimPage from "./pages/MyGemachimPage";
import CustomerRequestPage from "./pages/CustomerRequestPage";
import Navbar from "./components/navbar";

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/gemachim/:id" element={<GemachDetailsPage />} />
        <Route element={<ProtectedRoute allowedRoles={[Role.CUSTOMER]} />}>
          <Route path="/my-request" element={<CustomerRequestPage />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={[Role.ADMIN]} />}>
          <Route path="/admin/requests" element={<AdminRequestsPage />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={[Role.GEMACH_MANAGER, Role.ADMIN]} />}>
          <Route path="/gemachim/new" element={<GemachFormPage />} />
          <Route path="/gemachim/:id/edit" element={<GemachFormPage />} />
          <Route path="/my-gemachim" element={<MyGemachimPage />} />
        </Route>
      </Routes>
    </>
  )
}
export default App
