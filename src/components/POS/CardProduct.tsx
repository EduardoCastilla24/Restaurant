import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Product {
    id: string
    name: string
    price: number
    stock: number
    category: string
}

export default function CardProduct({ product, addToCart }: { product: Product; addToCart: (product: Product) => void }) {
    return (
        <Card
            key={product.id}
            className="cursor-pointer hover:shadow-lg transition"
            onClick={() => addToCart(product)}
        >
            <CardContent className="p-0! px-4! flex flex-col gap-2">
                <h3 className="text-sm font-medium truncate">
                    {product.name}
                </h3>
                <div className="flex justify-between items-center">
                    <p className="text-lg font-semibold">
                        ${product.price.toLocaleString()}
                    </p>
                    <Badge variant="secondary" className="w-fit">
                        Stock: {product.stock}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    )
}