import { useState } from "react";

const ledgerList = [
  "Cash",
  "Bank",
  "Sales",
  "Purchase",
  "Salary Expense",
  "Rent Expense",
  "ABC Traders",
  "XYZ Suppliers",
];

export default function JournalEntryForm() {
  const [voucherNo, setVoucherNo] = useState("JV-000001");

  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [refNo, setRefNo] = useState("");

  const [rows, setRows] = useState([
    {
      ledger: "",
      debit: "",
      credit: "",
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
        ledger: "",
        debit: "",
        credit: "",
      },
    ]);
  };

  const removeRow = (index) => {
    const updated = rows.filter((_, i) => i !== index);
    setRows(updated);
  };

  const totalDebit = rows.reduce(
    (sum, row) => sum + (parseFloat(row.debit) || 0),
    0
  );

  const totalCredit = rows.reduce(
    (sum, row) => sum + (parseFloat(row.credit) || 0),
    0
  );

  const handleSave = () => {
    if (totalDebit !== totalCredit) {
      alert("Debit and Credit totals must be equal.");
      return;
    }

    console.log({
      voucherNo,
      date,
      refNo,
      rows,
      narration,
    });

    alert("Journal Voucher Saved");
  };

  return (
    <div className="container mt-4">

      <div className="card shadow">

        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Journal Voucher</h4>
        </div>

        <div className="card-body">

          <div className="row mb-3">

            <div className="col-md-3">
              <label className="form-label">Voucher No.</label>
              <input
                className="form-control"
                value={voucherNo}
                onChange={(e) => setVoucherNo(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Reference No.</label>
              <input
                className="form-control"
                value={refNo}
                onChange={(e) => setRefNo(e.target.value)}
              />
            </div>

          </div>

          <table className="table table-bordered align-middle">

            <thead className="table-light">
              <tr>
                <th style={{ width: "45%" }}>Ledger</th>
                <th style={{ width: "20%" }}>Debit</th>
                <th style={{ width: "20%" }}>Credit</th>
                <th style={{ width: "15%" }}>Action</th>
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
                        handleRowChange(index, "ledger", e.target.value)
                      }
                    >
                      <option value="">Select Ledger</option>

                      {ledgerList.map((ledger) => (
                        <option key={ledger}>{ledger}</option>
                      ))}
                    </select>
                  </td>

                  <td>
                    <input
                      type="number"
                      className="form-control text-end"
                      value={row.debit}
                      onChange={(e) =>
                        handleRowChange(index, "debit", e.target.value)
                      }
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      className="form-control text-end"
                      value={row.credit}
                      onChange={(e) =>
                        handleRowChange(index, "credit", e.target.value)
                      }
                    />
                  </td>

                  <td className="text-center">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeRow(index)}
                    >
                      Remove
                    </button>
                  </td>

                </tr>
              ))}

            </tbody>

            <tfoot>

              <tr className="fw-bold">

                <td className="text-end">Total</td>

                <td className="text-end">
                  {totalDebit.toFixed(2)}
                </td>

                <td className="text-end">
                  {totalCredit.toFixed(2)}
                </td>

                <td></td>

              </tr>

            </tfoot>

          </table>

          <button
            className="btn btn-secondary mb-3"
            onClick={addRow}
          >
            + Add Row
          </button>

          <div className="mb-3">

            <label className="form-label">
              Narration
            </label>

            <textarea
              rows="3"
              className="form-control"
              value={narration}
              onChange={(e) => setNarration(e.target.value)}
            />

          </div>

          <div className="text-end">

            <button
              className="btn btn-success"
              onClick={handleSave}
            >
              Save Voucher
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}