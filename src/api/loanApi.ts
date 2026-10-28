import client from "./client";
import type { LoanRequest } from "../types/Loanrequest";
import type {Loan} from "../types/loan"

export const getLoans =async(gemachId:number):Promise<Loan[]>=>{
    const response=await client.get(`/gemachum/${gemachId}/loans`)
    return response.data
}
export const createLoan=async(itemId:number,data:LoanRequest):Promise<Loan>=>{
    const response=await client.post(`/items/${itemId}/loans`,data)
    return response.data
}
export const updateLoan=async(loanId:number,data:Partial<LoanRequest>):Promise<Loan>=>{
    const response =await client.put(`/loans/${loanId}`,data)
    return response.data
}
export const returnLoan=async(loanId:number):Promise<void>=>{
    await client.delete(`/loans/${loanId}/return`)
}