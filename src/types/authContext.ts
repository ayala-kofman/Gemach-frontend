import type {User} from "./user"
import type {LoginRequest, LoginResponse} from "./auth"
export interface AuthContextType{
    user:User|null,
    token:string|null,
    isLoading:boolean,
    isAuthenticated:boolean,
    login:(data:LoginResponse)=>void,
    logout:()=>void;
}
