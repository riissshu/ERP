import { useState } from "react";

export default function StockAdjustmentSheet() {
  const [voucher, setVoucher] = useState({
    voucherNo: "SAV-000001",
    date: new Date().toISOString().split("T")[0],
    narration: "",
  });

  const [rows, setRows] = useState([
    {
      item: "Cement",
      type: "Damage",
      qty: 5,
      reason: "Broken Bags",
      remarks: "",
    },
    {
      item: "Steel",
      type: "Surplus",
      qty: 10,
      reason: "Extra Stock Found",
      remarks: "",
    },
  ]);

  const handleVoucherChange = (e) => {
    setVoucher({
      ...voucher,
      [e.target.name]: e.target.value,
    });
  };

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        item: "",
        type: "Other",
        qty: "",
        reason: "",
        remarks: "",
      },
    ]);
  };

  const removeRow = (index) => {
    if (rows.length === 1) return;
    setRows(rows.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    console.log({
      voucher,
      rows,
    });

    alert("Stock Adjustment Voucher Saved Successfully!");
  };

  return (
    <div className="container-fluid">
     
          <h2 className="pt-2 pb-2">Stock Adjustment Voucher</h2>   

        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-3">
              <label className="form-label">Voucher No.</label>
              <input
                type="text"
                className="form-control"
                name="voucherNo"
                value={voucher.voucherNo}
                onChange={handleVoucherChange}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-control"
                name="date"
                value={voucher.date}
                onChange={handleVoucherChange}
              />
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th style={{ width: "22%" }}>Item Name</th>
                  <th style={{ width: "16%" }}>Adjustment Type</th>
                  <th style={{ width: "10%" }}>Qty</th>
                  <th style={{ width: "22%" }}>Reason</th>
                  <th>Remarks</th>
                  <th style={{ width: "70px" }}>Action</th>
                </tr>
              </thead>

              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        value={row.item}
                        onChange={(e) =>
                          handleRowChange(index, "item", e.target.value)
                        }
                      />
                    </td>

                    <td>
                      <select
                        className="form-select"
                        value={row.type}
                        onChange={(e) =>
                          handleRowChange(index, "type", e.target.value)
                        }
                      >
                        <option>Damage</option>
                        <option>Surplus</option>
                        <option>Shortage</option>
                        <option>Expired</option>
                        <option>Lost</option>
                        <option>Other</option>
                      </select>
                    </td>

                    <td>
                      <input
                        type="number"
                        min="0"
                        className="form-control text-end"
                        value={row.qty}
                        onChange={(e) =>
                          handleRowChange(index, "qty", e.target.value)
                        }
                      />
                    </td>

                    <td>
                      <input
                        type="text"
                        className="form-control"
                        value={row.reason}
                        onChange={(e) =>
                          handleRowChange(index, "reason", e.target.value)
                        }
                      />
                    </td>

                    <td>
                      <input
                        type="text"
                        className="form-control"
                        value={row.remarks}
                        onChange={(e) =>
                          handleRowChange(index, "remarks", e.target.value)
                        }
                      />
                    </td>

                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => removeRow(index)}
                        disabled={rows.length === 1}
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button className="btn btn-outline-primary m-2" onClick={addRow}>
            + Add Row
          </button>

          <div className="mb-3 mt-3">
            <label className="form-label fw-semibold">Narration</label>
            <textarea
              className="form-control"
              rows="3"
              name="narration"
              value={voucher.narration}
              onChange={handleVoucherChange}
              placeholder="Enter narration..."
            ></textarea>
          </div>

          <div className="d-flex justify-content-between mt-3">
            <div>
              <button className="btn btn-success me-2" onClick={handleSave}>
                Save
              </button>

              <button className="btn btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      
    </div>
  );
}
