import { usePOS } from "@/hooks/use-pos";
import CatalogSection from "@/components/POS/CatalogSection";
import CartSection from "@/components/POS/CartSection";
import PaymentSection from "@/components/POS/PaymentSection";
import CashModal from "@/components/POS/ModalPay";

export default function POSScreen() {
    const {
        search, setSearch,
        cart,
        paymentMethod, setPaymentMethod,
        openCashModal, setOpenCashModal,
        selectedCategory, setSelectedCategory,
        cashAmount, setCashAmount,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem,
        subtotal,
        change,
        handleConfirmSale
    } = usePOS();

    return (
        <div className="grid grid-cols-12 gap-4 p-4 h-dvh bg-muted/40 w-full">
            <CatalogSection
                search={search}
                setSearch={setSearch}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                addToCart={addToCart}
            />

            <div className="col-span-3 flex flex-col gap-4 max-h-screen">
                <CartSection
                    cart={cart}
                    increaseQty={increaseQty}
                    decreaseQty={decreaseQty}
                    removeItem={removeItem}
                />

                <PaymentSection
                    subtotal={subtotal}
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                    handleConfirmSale={handleConfirmSale}
                />
            </div>

            <CashModal
                open={openCashModal}
                setOpen={setOpenCashModal}
                subtotal={subtotal}
                cashAmount={cashAmount}
                setCashAmount={setCashAmount}
                change={change}
            />
        </div>
    );
}