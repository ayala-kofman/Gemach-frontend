import type { Gemach } from "./gemach";

export interface Item {
    id: number,
    gemachId: number,
    name: string,
    description: string | null,
    category: string,
    totalQuantity: number,
    availableQuantity: number,
    isAvailable: boolean,
    createdAt: string,
}

export type ItemSearchResult = {
    gemach: Gemach,
    items: Item[],
}