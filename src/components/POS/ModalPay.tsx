import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ModalPayProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    cashAmount: number;
    setCashAmount: (amount: number) => void;
    change: number;
    subtotal?: number;
}

export default function ModalPay({ open, setOpen, setCashAmount, change, subtotal }: ModalPayProps) {
    const isNegative = change < 0;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="w-sm">
                <DialogHeader className="text-center flex items-center">
                    <DialogTitle className="text-2xl font-bold">Registrar Pago</DialogTitle>
                </DialogHeader>

                <div className="mb-4 gap-2 font-semibold flex flex-col justify-between w-full items-center">
                    <p className="text-zinc-900/70">Total a pagar</p>
                    <p className="text-2xl">${subtotal?.toLocaleString()}</p>
                </div>

                <div className="space-y-6">
                    <div className="space-y-4">
                        <Label>¿Con cuánto paga?</Label>
                        <Input
                            className="border border-zinc-700"
                            type="number"
                            // value={cashAmount}
                            onChange={e => setCashAmount(Number(e.target.value))}
                        />
                    </div>

                    <div className={`flex justify-between p-4 rounded-md items-center flex-col ${isNegative ? "bg-zinc-200 text-zinc-700" : "bg-green-100 text-green-800"}`}>
                        <span className="font-bold">Vuelto</span>
                        <span>
                            ${Math.max(change, 0).toLocaleString()}
                        </span>
                    </div>
                </div>

                <DialogFooter className="justify-center!">
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancelar
                    </Button>
                    <Button disabled={change < 0}>Confirmar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}