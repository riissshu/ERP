import CreateOrderForm from "../forms/CreateOrderForm.jsx"

export default function OrderVoucher() {
    return (
        <div className="voucher">
            <p>OrderVoucher</p>
            <div className="row row-4">
                <div className="col">
                    <CreateOrderForm/>
                </div>
            </div>
        </div>
    )
}