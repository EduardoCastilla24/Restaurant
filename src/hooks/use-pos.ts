import { useState } from "react";
import { Product, CartItem, PaymentMethod } from "@/types/pos.types";

export function usePOS() {
    const [search, setSearch] = useState("");
    const [cart, setCart] = useState<CartItem[]>([]);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("efectivo");
    const [openCashModal, setOpenCashModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [cashAmount, setCashAmount] = useState(0);

    const addToCart = (product: Product) => {
        setCart((prev) => {
        const existing = prev.find((p) => p.id === product.id);
        if (existing) {
            return prev.map((p) =>
            p.id === product.id ? { ...p, qty: p.qty + 1 } : p
            );
        }
        return [...prev, { ...product, qty: 1 }];
        });
    };

    const increaseQty = (id: string) => {
        setCart((prev) =>
        prev.map((item) =>
            item.id === id ? { ...item, qty: item.qty + 1 } : item
        )
        );
    };

    const decreaseQty = (id: string) => {
        setCart((prev) =>
        prev
            .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
            .filter((item) => item.qty > 0)
        );
    };

    const removeItem = (id: string) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const subtotal = cart.reduce((acc, p) => acc + p.price * p.qty, 0);
    const change = cashAmount - subtotal;

    const handleConfirmSale = () => {
        if (paymentMethod === "efectivo") {
        setOpenCashModal(true);
        } else {
        alert(`Venta confirmada con ${paymentMethod}`);
        }
    };

    return {
        search,
        setSearch,
        cart,
        paymentMethod,
        setPaymentMethod,
        openCashModal,
        setOpenCashModal,
        selectedCategory,
        setSelectedCategory,
        cashAmount,
        setCashAmount,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem,
        subtotal,
        change,
        handleConfirmSale,
    };
}
