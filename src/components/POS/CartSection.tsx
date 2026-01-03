import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem } from "@/types/pos.types";

interface CartSectionProps {
    cart: CartItem[];
    increaseQty: (id: string) => void;
    decreaseQty: (id: string) => void;
    removeItem: (id: string) => void;
}

export default function CartSection({ cart, increaseQty, decreaseQty, removeItem }: CartSectionProps) {
    return (
        <Card className="flex-1 flex-col max-h-full">
            <CardHeader>
                <CardTitle>🛒 Carrito</CardTitle>
            </CardHeader>

            <ScrollArea className="flex-1 px-4 pr-8! mr-4">
                <div className="flex flex-col gap-3 max-h-[calc(100vh-5000px)] px-4">
                    {cart.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center">
                            No hay productos en el carrito
                        </p>
                    )}

                    {cart.map(item => (
                        <div
                            key={item.id}
                            className="flex justify-between items-center border-b pb-4 gap-4"
                        >
                            <div className="flex flex-col items-center gap-1">
                                <Button size="icon-sm" variant="outline" className="rounded-full bg-zinc-300 cursor-pointer" onClick={() => increaseQty(item.id)}>
                                    <Plus className="size-2.5" />
                                </Button>
                                <span className="text-sm w-6 text-center">{item.qty}</span>
                                <Button size="icon-sm" variant="outline" className="rounded-full bg-zinc-50 cursor-pointer" onClick={() => decreaseQty(item.id)}>
                                    <Minus className="size-2.5" />
                                </Button>
                            </div>

                            <div className="flex-1 space-y-2">
                                <p className="text-sm font-medium">{item.name}</p>
                                <p className="text-xs text-muted-foreground">
                                    ${item.price.toLocaleString()} c/u
                                </p>

                            </div>

                            <div className="flex flex-col items-end gap-1">
                                <p className="font-semibold">
                                    ${(item.qty * item.price).toLocaleString()}
                                </p>
                                <Button size="icon" variant="ghost" className="cursor-pointer" onClick={() => removeItem(item.id)}>
                                    <Trash2 size={16} className="text-destructive" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </Card>
    );
}