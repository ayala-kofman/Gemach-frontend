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
            {isAuthenticated && user?.role === Role.CUSTOMER && (
                <Link to="/my -request"></Link>)}
            {isAuthenticated&&(user?.role===Role.GEMACH_MANAGER||user?.role===Role.ADMIN)}
        </nav>
    )

}
export default Navbar