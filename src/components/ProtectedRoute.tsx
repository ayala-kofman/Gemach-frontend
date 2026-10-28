import { Navigate } from "react-router-dom";
import {useAuth} from "../hooks/useAuth"
import {Role} from "../types/role"

interface RolesProps{
    allowedRoles?:Role[];
}
const ProtectedRoute=({allowedRoles}:RolesProps)=>{
    const {isAuthenticated,user,isLoading}=useAuth();
    if(isLoading)return<div>טוען...</div>
    if(!isAuthenticated)return <Navigate to="/login" replace/>
    if(allowedRoles&&user&&!allowedRoles.includes(user.role))
        return <Navigate to="/" replace/>
}
export default ProtectedRoute