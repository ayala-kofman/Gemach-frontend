export interface Gemach {
    id: number,
    name: string,
    city: string,
    description: string | null,
    address: string,
    phone: string,
    category: string,
    openingHours: string|null,
    createdAt: string,
    itemsCount: number,
    managerId?: number,
}