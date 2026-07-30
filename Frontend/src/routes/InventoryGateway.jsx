import DisplayLayout from "../layouts/DisplayLayout.jsx"
// import InventoryVoucher from "../layouts/InventoryVoucher.jsx"
import MfgJournalVocuher from "../layouts/MfgJournalVoucher.jsx"

function InventoryGateway() {
  return (
    <DisplayLayout>
           {/* <InventoryVoucher/> */}
           <MfgJournalVocuher/>
       </DisplayLayout>
  )
}

export default InventoryGateway
