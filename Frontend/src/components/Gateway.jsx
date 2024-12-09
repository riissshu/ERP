import "./Gateway.css"
import {Sales, Purchase, Order, Inventory, HR, Finance, CRM} from "./Card"

function Gateway() {
    return (
    <div className="row row-cols-4 card-container">
        <Sales/>
        <Purchase/>
        <Order/>
        <Inventory/>
        <HR/>
        <Finance/>
        <CRM/>
    </div>
    )
}

export default Gateway