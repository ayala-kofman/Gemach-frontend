import client from "./client";
import type { LoginResponse, RegisterRequest, LoginRequest } from "../types/auth";
//import { TOKEN_KEY ,USER_KEY} from "../utils/constants";


const login = async (req: LoginRequest): Promise<LoginResponse> => {
    const res = await client.post<LoginResponse>("/auth/login", req);
    return res.data;
}
const register = async (req: RegisterRequest): Promise<LoginResponse> => {
    const res = await client.post<LoginResponse>("/auth/register", req);
    return res.data;
}
export const authApi = { login, register }