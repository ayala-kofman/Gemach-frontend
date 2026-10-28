import type { User } from "./user"

export interface LoginResponse {
    token: string;
    user: User;
}
export interface LoginRequest {
    email: string,
    password: string
}
export interface RegisterRequest {
    fullName: string,
    email: string,
    password: string,
    phone?: string,
}