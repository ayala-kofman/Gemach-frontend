import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import type { AuthContextType } from "../types/authContext";

export const useAuth=():AuthContextType=>{
    const context=useContext(AuthContext);
    if(context===undefined){
        throw new Error("useAuth must be used inside AuthProvider")
    }
    return context;
}
