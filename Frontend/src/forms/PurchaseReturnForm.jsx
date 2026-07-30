import { useState } from "react";

const suppliers = [
  "ABC Traders",
  "XYZ Suppliers",
  "Global Industries",
];

const stockItems = [
  "Cement",
  "Steel",
  "Sand",
  "Bricks",
];

export default function PurchaseReturnForm() {
  const [voucherNo, setVoucherNo] = useState("DN-000001");

  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [supplier, setSupplier] = useState("");

  const [invoiceNo, setInvoiceNo] = useState("");

  const [invoiceDate, setInvoiceDate] = useState("");

  const [reason, setReason] = useState("");

  const [rows, setRows] = useState([
    {
      item: "",
      qty: 0,
      unit: "Nos",
      rate: 0,
    },
  ]);

  const [narration, setNarration] = useState("");

  const handleRowChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        item: "",
        qty: 0,
        unit: "Nos",
        rate: 0,
      },
    ]);
  };

  const removeRow = (index) => {
    const updated = rows.filter((_, i) => i !== index);
    setRows(updated);
  };

  const totalAmount = rows.reduce((sum, r) => {
  const gross = r.qty * r.rate;
  return sum + (gross);
}, 0);

const netAmount = totalAmount;

  const saveVoucher = () => {
    const data = {
      voucherNo,
      date,
      supplier,
      invoiceNo,
      invoiceDate,
      reason,
      rows,
      narration,
      totalAmount,
    };

    console.log(data);

    alert("Purchase Return Saved");
  };

  return (
    <div className="container">

          <h2 className="pt-2 pb-2">Purchase Return (Debit Note)</h2>
       
        <div className="card-body">

          <div className="row g-3">

            <div className="col-md-2">
              <label className="form-label">Voucher No</label>
              <input
                className="form-control"
                value={voucherNo}
                onChange={(e)=>setVoucherNo(e.target.value)}
              />
            </div>

            <div className="col-md-2">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-control"
                value={date}
                onChange={(e)=>setDate(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Supplier</label>

              <select
                className="form-select"
                value={supplier}
                onChange={(e)=>setSupplier(e.target.value)}
              >
                <option value="">Select</option>

                {suppliers.map((s)=>(
                  <option key={s}>{s}</option>
                ))}

              </select>

            </div>

            <div className="col-md-2">
              <label className="form-label">
                Invoice No
              </label>

              <input
                className="form-control"
                value={invoiceNo}
                onChange={(e)=>setInvoiceNo(e.target.value)}
              />

            </div>

            <div className="col-md-2">
              <label className="form-label">
                Invoice Date
              </label>

              <input
                type="date"
                className="form-control"
                value={invoiceDate}
                onChange={(e)=>setInvoiceDate(e.target.value)}
              />

            </div>

            <div className="col-12 mb-4">
              <label className="form-label">
                Reason
              </label>

              <input
                className="form-control"
                value={reason}
                onChange={(e)=>setReason(e.target.value)}
              />

            </div>

          </div>

          <div className="table-responsive">

            <table className="table table-bordered align-middle">

              <thead className="table-light">

                <tr>

                  <th>Item</th>
                  <th width="90">Qty</th>
                  <th width="90">Unit</th>
                  <th width="120">Rate</th>
                  <th width="140">Amount</th>
                  <th width="70"></th>

                </tr>

              </thead>

              <tbody>

                {rows.map((row,index)=>{

                  const amount = row.qty*row.rate;

                  return(

                    <tr key={index}>

                      <td>

                        <select
                          className="form-select"
                          value={row.item}
                          onChange={(e)=>handleRowChange(index,"item",e.target.value)}
                        >

                          <option value="">Select</option>

                          {stockItems.map((i)=>(
                            <option key={i}>{i}</option>
                          ))}

                        </select>

                      </td>

                      <td>

                        <input
                          type="number"
                          className="form-control"
                          value={row.qty}
                          onChange={(e)=>handleRowChange(index,"qty",Number(e.target.value))}
                        />

                      </td>

                      <td>

                        <input
                          className="form-control"
                          value={row.unit}
                          onChange={(e)=>handleRowChange(index,"unit",e.target.value)}
                        />

                      </td>

                      <td>

                        <input
                          type="number"
                          className="form-control"
                          value={row.rate}
                          onChange={(e)=>handleRowChange(index,"rate",Number(e.target.value))}
                        />

                      </td>

                      <td className="text-end">

                        {amount.toFixed(2)}

                      </td>

                      <td>

                        <button
                          className="btn btn-sm btn-danger"
                          onClick={()=>removeRow(index)}
                        >
                          ×
                        </button>

                      </td>

                    </tr>

                    

                  );

                })}

              </tbody>

            </table>

          </div>
        

            <div className="row">
             <div className="col-auto"> 
          <button
            className="btn btn-outline-primary"
            onClick={addRow}
          >
            + Add Item
          </button>
          </div>  

          <div className="col me-5 pe-5 mt-4">
                <h4 style={{ textAlign: "end"}}>Subtotal : ₹ {totalAmount.toFixed(2)}</h4>
                 </div>
            </div>
          

            <label className="form-label">
              Narration
            </label>

            <textarea
              rows="2"
              className="form-control"
              value={narration}
              onChange={(e)=>setNarration(e.target.value)}
            />

          <div className="text-end m-4">

            <button
              className="btn btn-success me-2"
              onClick={saveVoucher}
            >
              Save
            </button>

            <button
              className="btn btn-secondary me-2"
            >
              Cancel
            </button>

          </div>

        </div>


      

    </div>
  );
}