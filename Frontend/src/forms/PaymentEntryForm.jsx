import { useState } from "react";

export default function PaymentEntryForm() {
  const [voucherNo] = useState("PV000001");

  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [creditLedger, setCreditLedger] = useState("");

  const [rows, setRows] = useState([
    { ledger: "ABC Traders", amount: 15000 },
  ]);

  const [narration, setNarration] = useState("");

  const handleChange = (index, field, value) => {
    const data = [...rows];
    data[index][field] =
      field === "amount" ? Number(value) : value;
    setRows(data);
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        ledger: "",
        amount: "",
      },
    ]);
  };

  const removeRow = (index) => {
    const data = rows.filter((_, i) => i !== index);
    setRows(data);
  };

  const total = rows.reduce(
    (sum, row) => sum + (Number(row.amount) || 0),
    0
  );

  return (
    <div className="container">

          <h2 className="pb-2 pt-2">Payment Voucher</h2>

        <div className="card-body">

          <div className="row mb-3">

            <div className="col-md-3">
              <label className="fw-bold">
                Voucher No
              </label>

              <input
                className="form-control"
                value={voucherNo}
                readOnly
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
              onChange={(e) =>
                setCreditLedger(e.target.value)
              }
            >
              <option>Cash A/c</option>
              <option>SBI Bank</option>
              <option>HDFC Bank</option>
              <option>ICICI Bank</option>
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

                    <input
                      className="form-control"
                      value={row.ledger}
                      placeholder="Ledger Name"
                      onChange={(e) =>
                        handleChange(
                          index,
                          "ledger",
                          e.target.value
                        )
                      }
                    />

                  </td>

                  <td>

                    <input
                      type="number"
                      className="form-control text-end"
                      value={row.amount}
                      onChange={(e) =>
                        handleChange(
                          index,
                          "amount",
                          e.target.value
                        )
                      }
                    />

                  </td>

                  <td className="text-center">

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        removeRow(index)
                      }
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
                  ₹ {total.toLocaleString()}
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

            <button className="btn btn-success">
              Save (Ctrl + S)
            </button>

            <button className="btn btn-secondary">
              Cancel (Esc)
            </button>

          </div>

        </div>

      </div>
  );
}











// const creditLedger = [
//   "Cash",
//   "SBI Bank",
//   "HDFC Bank",
//   "ICICI Bank",
// ];

// const debitLedger = [
//   "ABC Traders",
//   "XYZ Suppliers",
//   "Rahul Kumar",
//   "Amit Singh",
// ];

// const [voucher, setVoucher] = useState({
//     voucherNo: "PV000001",
//     date: new Date().toISOString().split("T")[0],
//     creditLedger: "",
//     narration: ""
// });

// const [entries, setEntries] = useState([
//     {
//         debitLedger: "",
//         amount: ""
//     }
// ]);