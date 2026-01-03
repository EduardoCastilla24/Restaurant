import { Product } from "@/types/pos.types";

export const CATEGORIES = ["Bebidas", "Snacks", "Golosinas", "Útiles", "Electrónicos"];

export const PRODUCTS: Product[] = [
    { id: "1", name: "Agua Mineral Villavicencio", price: 5500, stock: 14, category: "Bebidas" },
    { id: "2", name: "Chicle Trident Menta 10u", price: 90, stock: 100, category: "Golosinas" },
    { id: "3", name: "Chocolatina Milka 100g", price: 10500, stock: 21, category: "Golosinas" },
    { id: "4", name: "Coca-Cola 500ml", price: 250, stock: 35, category: "Bebidas" },
    { id: "5", name: "Cuadernillo Avon", price: 5000, stock: 10, category: "Útiles" },
    { id: "6", name: "Fernet Branca 750ml", price: 2000, stock: 19, category: "Bebidas" },
    { id: "7", name: "Galletitas Oreo 137g", price: 190, stock: 33, category: "Snacks" },
    { id: "8", name: "Jugo Cepita Naranja 1L", price: 280, stock: 15, category: "Bebidas" },
    { id: "9", name: "Lector Barras", price: 10500, stock: 2, category: "Electrónicos" },
    { id: "10", name: "Papas Fritas Lays 120g", price: 180, stock: 29, category: "Snacks" },
    { id: "11", name: "Pepsi 600ml", price: 230, stock: 40, category: "Bebidas" },
    { id: "12", name: "Snack Maní Salted 100g", price: 150, stock: 43, category: "Snacks" }
];