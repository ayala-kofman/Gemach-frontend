import client from "./client";
import type {Item} from "../types/item"
import type {ItemRequest} from "../types/itemRequest"

export const createItem=async(gemachId:number,data:ItemRequest):Promise<Item>=>{
    const response=await client.post(`/gemachim/${gemachId}/items`,data)
    return response.data
}
export const updateItem=async(itemId:number,data:Partial<ItemRequest>):Promise<Item>=>{
    const response=await client.put(`/items/${itemId}`,data)
    return response.data
}
export const deleteItem=async(itemsId:number):Promise<void>=>{
    await client.delete(`/items/${itemsId}`)
}