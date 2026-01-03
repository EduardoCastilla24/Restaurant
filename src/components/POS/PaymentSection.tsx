import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, Smartphone, CreditCard } from "lucide-react";
import ButtonPay from "@/components/POS/ButtonPay";
import { PaymentMethod } from "@/types/pos.types";

interface PaymentSectionProps {
    subtotal: number;
    paymentMethod: PaymentMethod;
    setPaymentMethod: (method: PaymentMethod) => void;
    handleConfirmSale: () => void;
}

export default function PaymentSection({
    subtotal,
    paymentMethod,
    setPaymentMethod,
    handleConfirmSale
}: PaymentSectionProps) {
    return (
        <Card>
            <CardContent className="flex flex-col gap-4">
                <div className="grid grid-cols-3 gap-2">
                    <ButtonPay value="efectivo" title="Efectivo" selectedMethod={paymentMethod} onSelect={setPaymentMethod}>
                        <Wallet size={20} />
                    </ButtonPay>

                    <ButtonPay value="yape" title="Yape" selectedMethod={paymentMethod} onSelect={setPaymentMethod}>
                        <Smartphone size={20} />
                    </ButtonPay>

                    <ButtonPay value="tarjeta" title="Tarjeta" selectedMethod={paymentMethod} onSelect={setPaymentMethod}>
                        <CreditCard size={20} />
                    </ButtonPay>
                </div>

                <div className="flex justify-between font-bold text-lg">
                    <span>TOTAL</span>
                    <span>${subtotal.toLocaleString()}</span>
                </div>

                <Button onClick={handleConfirmSale}>Confirmar Venta</Button>
            </CardContent>
        </Card>
    );
}