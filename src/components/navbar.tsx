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
        <nav>
            <Link to="/">דף ראשי</Link>
            {!isAuthenticated && (
                <>
                    <Link to="/login">התחברות</Link>
                    <Link to="/register">הרשמה</Link>
                </>
            )}
            {isAuthenticated && user?.role === Role.CUSTOMER && (
                <Link to="/my-request">בקשה לפתוח גמ"ח</Link>
            )}
            {isAuthenticated && (user?.role === Role.GEMACH_MANAGER || user?.role === Role.ADMIN) && (
                <Link to="/my-gemachim">הגמ"חים שלי</Link>
            )}
            {isAuthenticated && user?.role === Role.ADMIN && (
                <Link to="/admin/requests">בקשות ממתינות</Link>
            )}
            {isAuthenticated && (
                <button onClick={handleLogout}>התנתקות</button>
            )}
        </nav>
    )
}
export default Navbar