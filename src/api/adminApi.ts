import client from "./client";
import type { PaginatedResponse } from "../types/paginatedResponse"
import type { ManagerRequest } from "../types/managerRequest";
import type { Role } from "../types/role";
import type { User, } from "../types/user";

export const getRequests = async (status?: string): Promise<PaginatedResponse<ManagerRequest>> => {
    const response = await client.get(`/manager-requests`, { params: status ? { status } : undefined })
    return response.data
}
export const getMyRequests = async (): Promise<ManagerRequest[]> => {
    const response = await client.get(`/manager-request/mine`)
    return response.data
}
export const createRequest = async (description: string): Promise<ManagerRequest> => {
    const response = await client.post(`/manager-request`, { description })
    return response.data
}
export const approveRequest = async (id: number): Promise<ManagerRequest> => {
    const response = await client.patch(`/manager-request/${id}/approve`)
    return response.data
}
export async function rejectRequest(id: number): Promise<ManagerRequest> {
    const response = await client.patch(`/manager-requests/${id}/reject`);
    return response.data;
}
export const getUsers = async (q?: string, role?: Role): Promise<PageinatedResponse<User>> => {
    const response = await client.get(`/users`, { params: { q, role } })
    return response.data
}
export const updateUserRole=async(userId:number,role:Role):Promise<User>=>{
    const response=await client.patch(`/users/${userId}/role`,{role})
    return response.data
}