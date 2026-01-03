import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import CardProduct from "@/components/POS/CardProduct";
import { CATEGORIES, PRODUCTS } from "@/data/pos-data";
import { Product } from "@/types/pos.types";

interface CatalogSectionProps {
    search: string;
    setSearch: (value: string) => void;
    selectedCategory: string | null;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
    addToCart: (product: Product) => void;
}

export default function CatalogSection({
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    addToCart
}: CatalogSectionProps) {
    return (
        <div className="col-span-9 flex flex-col gap-4">
            <Card>
                <CardHeader>
                    <CardTitle>Catálogo de Productos</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                    <div className="flex gap-2">
                        <Input
                            placeholder="Buscar producto (Nombre)"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                        <Input placeholder="Escanea el código y presiona Enter" />
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map(cat => (
                            <Badge
                                key={cat}
                                variant={selectedCategory === cat ? "default" : "outline"}
                                className="cursor-pointer px-6 py-2"
                                onClick={() =>
                                    setSelectedCategory(prev => (prev === cat ? null : cat))
                                }
                            >
                                {cat}
                            </Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <ScrollArea className="flex-1">
                <div className="grid grid-cols-4 gap-4 pr-2">
                    {PRODUCTS.filter(p =>
                        p.name.toLowerCase().includes(search.toLowerCase()) &&
                        (!selectedCategory || p.category === selectedCategory)
                    ).map(product => (
                        <CardProduct key={product.id} product={product} addToCart={addToCart} />
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}