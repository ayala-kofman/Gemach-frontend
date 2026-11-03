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
            <Link to="/" className="font-bold text-lg hover:text-primary flex items-center gap-2">
                <svg width="38" height="46" viewBox="0 0 50 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <clipPath id="globe-clip">
                            <circle cx="25" cy="20" r="16.5"/>
                        </clipPath>
                    </defs>
                    <circle cx="25" cy="20" r="17" fill="#EED9B9"/>
                    <g clipPath="url(#globe-clip)">
                        <line x1="8" y1="20" x2="42" y2="20" stroke="#9B0F06" strokeWidth="1.2"/>
                        <line x1="25" y1="3" x2="25" y2="37" stroke="#9B0F06" strokeWidth="1.2"/>
                        <path d="M 25 3 Q 11 20 25 37" stroke="#9B0F06" strokeWidth="1.2" fill="none"/>
                        <path d="M 25 3 Q 39 20 25 37" stroke="#9B0F06" strokeWidth="1.2" fill="none"/>
                        <path d="M 0 12 Q 25 9 50 12" stroke="#9B0F06" strokeWidth="1" fill="none"/>
                        <path d="M 0 28 Q 25 31 50 28" stroke="#9B0F06" strokeWidth="1" fill="none"/>
                    </g>
                    <circle cx="25" cy="20" r="17" fill="none" stroke="#5E0006" strokeWidth="1.8"/>
                    <rect x="3" y="37" width="44" height="3" fill="#5E0006" rx="1"/>
                    <rect x="6" y="40" width="9" height="14" fill="#D53E0F" rx="1"/>
                    <rect x="20.5" y="40" width="9" height="14" fill="#D53E0F" rx="1"/>
                    <rect x="35" y="40" width="9" height="14" fill="#D53E0F" rx="1"/>
                    <rect x="2" y="54" width="46" height="4" fill="#5E0006" rx="1"/>
                </svg>
                מאגר הגמ"חים
            </Link>
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
