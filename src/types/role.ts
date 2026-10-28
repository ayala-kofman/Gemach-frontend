export const Role = {
    CUSTOMER: "CUSTOMER",
    GEMACH_MANAGER: "GEMACH_MANAGER",
    ADMIN: "ADMIN"
} as const;
export type Role = (typeof Role[keyof typeof Role]);