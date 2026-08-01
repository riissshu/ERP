import DisplayLayout from "../layouts/DisplayLayout.jsx"
// import InventoryVoucher from "../layouts/InventoryVoucher.jsx"
// import MfgJournalVocuher from "../layouts/MfgJournalVoucher.jsx"
import PhysicalStockVoucher from "../layouts/PhysicalStockVoucher.jsx"
// import StockAdjustmentVoucher from "../layouts/StockAdjustmentVoucher.jsx"

function InventoryGateway() {
  return (
    <DisplayLayout>
           {/* <InventoryVoucher/> */}
           {/* <MfgJournalVocuher/> */}
           <PhysicalStockVoucher/>
           {/* <StockAdjustmentVoucher/> */}
           
          
       </DisplayLayout>
  )
}

export default InventoryGateway
