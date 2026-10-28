import type { Role } from "./role"

export interface User {
    id: number,
    email: string,
    fullName: string,
    phone: string | null,
    role: Role,
    createdAt: string,
}