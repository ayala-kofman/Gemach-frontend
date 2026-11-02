import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { Role } from "../types/role"

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate("/login")
    }
    return (
        <nav className="bg-dark text-cream px-6 py-3 flex gap-6 items-center shadow-md">
            <Link to="/" className="font-bold text-lg hover:text-primary">מאגר הגמ"חים</Link>
            <div className="flex gap-4 mr-auto items-center">
                {!isAuthenticated && (
                    <>
                        <Link to="/login" className="hover:text-primary">התחברות</Link>
                        <Link to="/register" className="bg-primary text-cream px-3 py-1 rounded hover:bg-secondary">הרשמה</Link>
                    </>
                )}
                {isAuthenticated && user?.role === Role.CUSTOMER && (
                    <Link to="/my-request" className="hover:text-primary">בקשה לפתוח גמ"ח</Link>
                )}
                {isAuthenticated && (user?.role === Role.GEMACH_MANAGER || user?.role === Role.ADMIN) && (
                    <Link to="/my-gemachim" className="hover:text-primary">הגמ"חים שלי</Link>
                )}
                {isAuthenticated && user?.role === Role.ADMIN && (
                    <Link to="/admin/requests" className="hover:text-primary">בקשות ממתינות</Link>
                )}
                {isAuthenticated && (
                    <button onClick={handleLogout} className="bg-primary text-cream px-3 py-1 rounded hover:bg-secondary transition">
                        התנתקות
                    </button>
                )}
            </div>
        </nav>
    )
}
export default Navbar
