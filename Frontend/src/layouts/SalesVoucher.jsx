import "./SalesVoucher.css"
import VoucherInput from "./VoucherInput"

export default function SalesVoucher() {
    return (
        <div className="voucher">
            <p>SalesVoucher</p>
            <input type="text" />
            <div>current bal</div>
            <input type="text" />
            <div>running bal</div>
            <div className="row row-4">
                <div className="col">
                   <VoucherInput/>
                </div>
            </div>
        </div>
    )
}