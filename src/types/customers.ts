export type Level = "Warga" | "Juragan" | "Konglomerat" | "Sultan";

export interface Customer {
    id: number;
    name: string;
    level: Level;
    favorite_menu: number;
    total_transaction: number;
    email: string;
    phone: string;
    created_at: Date;
    deleted_at: Date;
}