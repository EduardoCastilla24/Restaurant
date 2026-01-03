export interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
    category: string;
}

export interface CartItem extends Product {
    qty: number;
}

export type PaymentMethod = "efectivo" | "yape" | "tarjeta";
