import type { User } from "./user"

export interface ManagerRequest {
    id: number,
    userId: number,
    description: string,
    status:"PENDING" | "APPROVED" | "REJECTED",
    createdAt: string,
    decidedAt: string | null,
    user?: User,
}