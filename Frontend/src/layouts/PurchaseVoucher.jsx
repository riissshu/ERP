import PurchaseInputForm from "../forms/PurchaseInputForm.jsx";

export default function PurchaseVoucher() {
    return (
        <div className="voucher">
            <p>PurchaseVoucher</p>
            <div className="row row-4">
                <div className="col">
                   <PurchaseInputForm/>
                </div>
            </div>
        </div>
    )
}