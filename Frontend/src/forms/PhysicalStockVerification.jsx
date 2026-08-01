import { useState } from "react";

export default function PhysicalStockVerification() {
  const [voucher, setVoucher] = useState({
    voucherNo: "PSM-000001",
    date: new Date().toISOString().split("T")[0],
    remarks: "",
  });

  const [rows, setRows] = useState([
    {
      item: "Cement",
      bookQty: 100,
      physicalQty: undefined,
      shortage: undefined,
      surplus: undefined,
    },
    {
      item: "Steel",
      bookQty: 250,
      physicalQty: undefined,
      shortage: undefined,
      surplus: undefined,
    },
    {
      item: "Bricks",
      bookQty: 500,
      physicalQty: undefined,
      shortage: undefined,
      surplus: undefined,
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

    const book = Number(updatedRows[index].bookQty) || 0;
    const physical = Number(updatedRows[index].physicalQty) || 0;

    updatedRows[index].shortage = physical < book ? book - physical : 0;
    updatedRows[index].surplus = physical > book ? physical - book : 0;

    setRows(updatedRows);
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        item: "",
        bookQty: "",
        physicalQty: "",
        shortage: 0,
        surplus: 0,
      },
    ]);
  };
  const removeRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const handleSave = () => {
    console.log({
      voucher,
      rows,
    });

    alert("Physical Stock Saved Successfully!");
  };

  return (
    <div className="container">

          <h2 className="pt-2 pb-2">Physical Stock Verification</h2>
        
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

            <div className="col-md-6">
              <label className="form-label">Remarks</label>
              <input
                type="text"
                className="form-control"
                name="remarks"
                value={voucher.remarks}
                onChange={handleVoucherChange}
              />
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Item Name</th>
                  <th>Book Qty</th>
                  <th>Physical Qty</th>
                  <th>Shortage</th>
                  <th>Surplus</th>
                  <th>Action</th>
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
                      <input
                        type="number"
                        className="form-control"
                        value={row.bookQty}
                        onChange={(e) =>
                          handleRowChange(index, "bookQty", e.target.value)
                        }
                      />
                    </td>

                    <td>
                      <input
                        type="number"
                        className="form-control"
                        value={row.physicalQty}
                        onChange={(e) =>
                          handleRowChange(index, "physicalQty", e.target.value)
                        }
                      />
                    </td>

                    <td className="text-center">{row.shortage}</td>

                    <td className="text-center">{row.surplus}</td>

                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => removeRow(index)}
                        disabled={rows.length === 1}
                      >
                        ×
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mb-3">
            <button className="btn btn-outline-primary" onClick={addRow}>
              + Add Row
            </button>
          </div>

          <div className="text-end me-5">
            <button className="btn btn-success" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      
    </div>
  );
}
