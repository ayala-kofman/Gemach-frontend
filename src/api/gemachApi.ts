import client from './client';
import type {Gemach} from '../types/gemach';
import type {Item,ItemSearchResult} from "../types/item"
import type {PaginatedResponse} from '../types/paginatedResponse';
import type { gemachRequest } from '../types/gemachRequest';

export const getGemachs=async(filter?:{q?:string;city?:string;
    category?:string;sort?:'name'|'newest';page?:number;})
: Promise<PaginatedResponse<Gemach>> =>{
    const response = await client.get(`/gemachim`,{params:filter});
    return response.data;
}
export const getGemachById=async(id:number):Promise<Gemach>=>{
    const response=await client.get(`/gemachim/${id}`);
    return response.data
}
export const getMyGemachim=async():Promise<Gemach[]>=>{
    const response=await client.get(`/gemachim/mine`);
    return response.data
}
export const createGemach=async(data:gemachRequest):Promise<Gemach>=>{
    const response=await client.post(`/gemachim`,data);
    return response.data
}
export const upDataGemach=async(id:number,data:Partial<gemachRequest>):Promise<Gemach>=>{
    const response=await client.put(`/gemachim/${id}`,data);
    return response.data
}
export const deleteGemach=async(id:number):Promise<void>=>{
    await client.delete(`/gemachim/${id}`);
}
export const getGemachItems=async(id:number,availableOnly?:boolean):Promise<Gemach>=>{
    const response=await client.get(`/gemachim/${id}/items`,
        {params:availableOnly?{availableOnly:true}:undefined});
    return response.data
}
export const searchItem=async(filters:{q?:string;
    city?:string;catagory?:string;availableOnly?:boolean;page?:number;
}):Promise<PaginatedResponse<ItemSearchResult>>=>{
    const response=await client.get(`/items/search`,{params:filters})
    return response.data
}
export const getCategories=async():Promise<String[]>=>{
    const response=await client.get(`/category`)
    return response.data
}