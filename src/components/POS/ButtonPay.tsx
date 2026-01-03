import { Button } from "../ui/button"

export type PaymentMethod = "efectivo" | "yape" | "tarjeta";

type Props = {
    children?: React.ReactNode;
    title?: string;
    value: PaymentMethod;
    selectedMethod: PaymentMethod;
    onSelect: (method: PaymentMethod) => void;
}

export default function ButtonPay({ children, title, value, selectedMethod, onSelect }: Props) {

    const isSelected = selectedMethod === value;

    return (
        <Button
            type="button"
            variant={isSelected ? "default" : "outline"}
            className={`flex flex-col cursor-pointer gap-1 h-14 ${isSelected ? "border-primary" : ""}`}
            onClick={() => onSelect(value)}
        >
            {children}
            <span className="text-xs">{title}</span>
        </Button>
    )
}