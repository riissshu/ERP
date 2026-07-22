import { useState } from "react";

const creditLedgers = [
    "Cash",
    "HDFC Bank",
];

const debitLedgers = [
  "ABC Traders",
  "XYZ Suppliers",
];

export default function ReceiptEntryForm() {

  const [voucherNo, setVoucherNo] = useState("RV-0001");

  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [creditLedger, setCreditLedger] = useState("");

  const [rows, setRows] = useState([
        {
            ledger: "",
            amount: "0",
        },
    ]);

  const [narration, setNarration] = useState("");

  const handleChange = (index, field, value) => {
    const data = [...rows];
    data[index][field] =
      field === "amount" ? Number(value) : value;
    setRows(data);
  };

  const handleSave = () => {
  const voucher = {
    voucherNo,
    date,
    creditLedger,
    narration,
    entries: rows,
    total,
  };

  console.log(voucher);

  alert("Voucher Saved Successfully");
};

  const addRow = () => {
    setRows([
      ...rows,
      {
        ledger: "",
        amount: 0,
      },
    ]);
  };

    const removeRow = (index) => {
        if (rows.length === 1) return;
        setRows(rows.filter((_, i) => i !== index));
    };

    const total = rows.reduce(
        (sum, row) => sum + Number(row.amount || 0),
        0
    );

  return (
    <div className="container">

          <h2 className="pb-2 pt-2">Receipt Voucher</h2>

        <div className="card-body">

          <div className="row mb-3">

            <div className="col-md-3">
              <label className="fw-bold">
                Voucher No
              </label>

              <input
                    type="text"
                    className="form-control"
                    value={voucherNo}
                    onChange={(e) => setVoucherNo(e.target.value)}
                />

            </div>

            <div className="col-md-3">
              <label className="fw-bold">
                Date
              </label>

              <input
                type="date"
                className="form-control"
                value={date}
                onChange={(e) =>
                  setDate(e.target.value)
                }
              />
            </div>

          </div>

          {/* Credit Ledger */}

          <div className="mb-4">

            <label className="fw-bold mb-2">
              Account (Cr)
            </label>

         <select
            className="form-select"
            value={creditLedger}
            onChange={(e) => setCreditLedger(e.target.value)}
        >
            <option value="">Select Ledger</option>

            {creditLedgers.map((ledger) => (
                <option key={ledger} value={ledger}>
                    {ledger}
                </option>
            ))}
        </select>

          </div>

          <table className="table table-bordered align-middle">

            <thead>

              <tr>
                <th width="70%">Particulars (Dr)</th>
                <th width="20%">Amount</th>
                <th width="10%"></th>
              </tr>

            </thead>

            <tbody>

              {rows.map((row, index) => (

                <tr key={index}>

                  <td>
                        
                        <select
                            className="form-select"
                            value={row.ledger}
                            onChange={(e) =>
                            handleChange(index, "ledger", e.target.value)
                            }
                        >
                            <option value="">Select Ledger</option>

                            {debitLedgers.map((ledger) => (
                            <option key={ledger} value={ledger}>
                                {ledger}
                            </option>
                            ))}
                        </select>
                    

                  </td>

                  <td>

                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        className="form-control text-end"
                        value={row.amount}
                        onChange={(e) =>
                            handleChange(index, "amount", e.target.value)
                        }
                    />

                  </td>

                  <td className="text-center">

                    <button
                        className="btn btn-danger btn-sm"
                        disabled={rows.length === 1}
                        onClick={() => removeRow(index)}
                    >
                        ×
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

            <tfoot>

              <tr>

                <td className="text-end fw-bold">
                  Total
                </td>

                <td className="fw-bold text-end">
                  ₹ {total.toLocaleString("en-IN", )}
                </td>

                <td></td>

              </tr>

            </tfoot>

          </table>

          <button
            className="btn btn-outline-primary mb-4"
            onClick={addRow}
          >
            + Add Row
          </button>

          {/* Narration */}

          <div className="mb-4">

            <label className="fw-bold">
              Narration
            </label>

            <textarea
              rows="3"
              className="form-control"
              value={narration}
              onChange={(e) =>
                setNarration(e.target.value)
              }
            />

          </div>

          {/* Footer */}

          <div className="d-flex justify-content-between">

            <button
                className="btn btn-success"
                onClick={handleSave}
            >
                Save (Ctrl + S)
            </button>

          </div>

        </div>

      </div>
  );
}












