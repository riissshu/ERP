import DisplayLayout from "../layouts/DisplayLayout.jsx"
import PaymentVoucher from "../layouts/PaymentVoucher.jsx" 
import ReceiptVoucher from "../layouts/ReceiptVoucher.jsx"

function FinanceGateway() {
  return (
    <DisplayLayout>
        <PaymentVoucher/>
        <hr /><hr />
        <ReceiptVoucher/>
    </DisplayLayout>
  )
}

export default FinanceGateway
