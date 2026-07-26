import { useState } from "react";

const stockItems = [
  { name: "Rice", unit: "Bag" },
  { name: "Wheat", unit: "Bag" },
  { name: "Flour", unit: "Bag" },
  { name: "Sugar", unit: "Kg" },
  { name: "Oil", unit: "Ltr" },
];

function StockTransferTable({ title, rows, setRows }) {
  // Update row values
  const handleRowChange = (index, field, value) => {
    const updatedRows = rows.map((row, i) => {
      if (i !== index) return row;

      const updatedRow = { ...row, [field]: value };

      if (field === "item") {
        const selectedItem = stockItems.find((item) => item.name === value);
        updatedRow.unit = selectedItem ? selectedItem.unit : "";
      }

      const qty = Number(field === "qty" ? value : updatedRow.qty) || 0;
      const rate = Number(field === "rate" ? value : updatedRow.rate) || 0;
      updatedRow.amount = qty * rate;

      return updatedRow;
    });

    setRows(updatedRows);
  };

  // Add new row
  const addRow = () => {
    setRows([
      ...rows,
      {
        item: "",
        qty: "",
        unit: "",
        rate: "",
        amount: 0,
      },
    ]);
  };

  // Delete row
  const deleteRow = (index) => {
    if (rows.length === 1) return;

    const updatedRows = rows.filter((_, i) => i !== index);

    setRows(updatedRows);
  };

  return (
    <div className="card mb-3">
      <div className="card-header bg-secondary text-white">{title}</div>

      <div className="card-body p-0">
        <table className="table table-bordered table-sm mb-0">
          <thead className="table-light">
            <tr>
              <th style={{ width: "35%" }}>Item</th>
              <th style={{ width: "15%" }}>Qty</th>
              <th style={{ width: "15%" }}>Unit</th>
              <th style={{ width: "15%" }}>Rate</th>
              <th style={{ width: "15%" }}>Amount</th>
              <th style={{ width: "5%" }}></th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>
                  <select
                    className="form-select form-select-sm"
                    value={row.item}
                    onChange={(e) =>
                      handleRowChange(index, "item", e.target.value)
                    }
                  >
                    <option value="">Select Item</option>

                    {stockItems.map((item) => (
                      <option key={item.name} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </td>

                <td>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    value={row.qty}
                    onChange={(e) =>
                      handleRowChange(index, "qty", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    className="form-control form-control-sm"
                    value={row.unit}
                    readOnly
                  />
                </td>

                <td>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    value={row.rate}
                    onChange={(e) =>
                      handleRowChange(index, "rate", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    className="form-control form-control-sm"
                    value={row.amount}
                    readOnly
                  />
                </td>

                <td className="text-center">
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteRow(index)}
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card-footer">
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={addRow}
        >
          + Add Item
        </button>
      </div>
    </div>
  );
}

export default function StockJournalVoucher() {
  const [voucherNo, setVoucherNo] = useState("SJ-000001");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [narration, setNarration] = useState("");

  const [sourceRows, setSourceRows] = useState([
    { item: "", qty: "", unit: "", rate: "", amount: 0 },
  ]);

  const [destinationRows, setDestinationRows] = useState([
    { item: "", qty: "", unit: "", rate: "", amount: 0 },
  ]);

  // Derived totals — recalculated on every render, no extra state needed
  const sourceQty = sourceRows.reduce((sum, r) => sum + (Number(r.qty) || 0), 0);
  const sourceAmount = sourceRows.reduce((sum, r) => sum + (Number(r.amount) || 0), 0);
  const destinationQty = destinationRows.reduce((sum, r) => sum + (Number(r.qty) || 0), 0);
  const destinationAmount = destinationRows.reduce((sum, r) => sum + (Number(r.amount) || 0), 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const source = sourceRows.filter((r) => r.item !== "");
    const destination = destinationRows.filter((r) => r.item !== "");

    if (!source.length) {
      alert("Please enter at least one consumption item.");
      return;
    }
    if (!destination.length) {
      alert("Please enter at least one production item.");
      return;
    }

    const voucher = {
      voucherNo,
      date,
      source,
      destination,
      narration,
      totals: {
        sourceQty,
        sourceAmount,
        destinationQty,
        destinationAmount,
      },
    };

    console.log(voucher);
    alert("Stock Journal Saved Successfully");
    resetVoucher();
  };

  const resetVoucher = () => {
    setNarration("");
    setSourceRows([{ item: "", qty: "", unit: "", rate: "", amount: 0 }]);
    setDestinationRows([{ item: "", qty: "", unit: "", rate: "", amount: 0 }]);
  };

  return (
    <div className="container">
        
          <h2 className="pb-2 pt-2">Stock Journal Voucher</h2>

        <div className="card-body">
          {/* Header */}
          <div className="row mb-4">
            <div className="col-md-6">
              <label className="form-label">Voucher No</label>
              <input
                className="form-control"
                value={voucherNo}
                onChange={(e) => setVoucherNo(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          {/* Dual Entry Layout */}
          <div className="row">
            <div className="col-lg-6">
              <StockTransferTable
                title="Source (Consumption)"
                rows={sourceRows}
                setRows={setSourceRows}
              />
              <div className="text-end small text-muted mt-1">
                Qty: {sourceQty} &nbsp; Amount: {sourceAmount.toFixed(2)}
              </div>
            </div>

            <div className="col-lg-6">
              <StockTransferTable
                title="Destination (Production)"
                rows={destinationRows}
                setRows={setDestinationRows}
              />
              <div className="text-end small text-muted mt-1">
                Qty: {destinationQty} &nbsp; Amount: {destinationAmount.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Narration */}
          <div className="row mt-3">
            <div className="col-12">
              <label className="form-label">Narration</label>
              <textarea
                className="form-control"
                rows={2}
                value={narration}
                onChange={(e) => setNarration(e.target.value)}
                placeholder="Enter narration (optional)"
              />
            </div>
          </div>

          <div className="mt-3">
            <button className="btn btn-success me-2" onClick={handleSubmit}>
              Save
            </button>
            <button className="btn btn-primary" onClick={resetVoucher}>
              Reset
            </button>
          </div>
        </div>
    </div>
  );
}