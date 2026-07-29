import { useState } from "react";

const ledgerList = [
  "Cash",
  "Bank",
  "Capital Account",
  "Sales",
  "Purchase",
  "Salary Expense",
  "Rent Expense",
  "Electricity Expense",
  "Office Expense",
  "ABC Traders",
  "XYZ Suppliers",
];

export default function JournalEntryFormX() {
  const [voucherNo, setVoucherNo] = useState("JV-000001");
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [reference, setReference] = useState("");
  const [narration, setNarration] = useState("");

  const [rows, setRows] = useState([
    {
      ledger: "",
      debit: "",
      credit: "",
    },
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;

    // Only one side can have value
    if (field === "debit" && value !== "") {
      updated[index].credit = "";
    }

    if (field === "credit" && value !== "") {
      updated[index].debit = "";
    }

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
    if (rows.length === 1) return;

    setRows(rows.filter((_, i) => i !== index));
  };

  const totalDebit = rows.reduce(
    (sum, row) => sum + Number(row.debit || 0),
    0
  );

  const totalCredit = rows.reduce(
    (sum, row) => sum + Number(row.credit || 0),
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
      reference,
      narration,
      rows,
    });

    alert("Journal Voucher Saved");
  };

  return (
    <div className="container-fluid py-3">

      <div className="border">

        {/* Header */}

        <div className="bg-primary text-white text-center py-2">
          <h4 className="m-0">Journal Voucher</h4>
        </div>

        {/* Voucher Details */}

        <div className="p-3 border-bottom">

          <div className="row">

            <div className="col-md-3 mb-2">
              <label className="form-label fw-semibold">
                Voucher No.
              </label>

              <input
                className="form-control"
                value={voucherNo}
                onChange={(e) => setVoucherNo(e.target.value)}
              />
            </div>

            <div className="col-md-3 mb-2">
              <label className="form-label fw-semibold">
                Date
              </label>

              <input
                type="date"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="col-md-3 mb-2">
              <label className="form-label fw-semibold">
                Reference No.
              </label>

              <input
                className="form-control"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
              />
            </div>

          </div>

        </div>

        {/* Entry Table */}

        <div className="table-responsive">

          <table className="table table-bordered table-sm align-middle mb-0">

            <thead className="table-light">

              <tr>
                <th width="50%">Particulars (Ledger)</th>
                <th width="18%" className="text-end">
                  Debit
                </th>
                <th width="18%" className="text-end">
                  Credit
                </th>
                <th width="14%" className="text-center">
                  Action
                </th>
              </tr>

            </thead>

            <tbody>

              {rows.map((row, index) => (
                <tr key={index}>

                  <td>

                    <select
                      className="form-select form-select-sm"
                      value={row.ledger}
                      onChange={(e) =>
                        handleChange(index, "ledger", e.target.value)
                      }
                    >
                      <option value="">
                        Select Ledger
                      </option>

                      {ledgerList.map((ledger) => (
                        <option key={ledger}>
                          {ledger}
                        </option>
                      ))}
                    </select>

                  </td>

                  <td>

                    <input
                      type="number"
                      className="form-control form-control-sm text-end"
                      value={row.debit}
                      onChange={(e) =>
                        handleChange(
                          index,
                          "debit",
                          e.target.value
                        )
                      }
                    />

                  </td>

                  <td>

                    <input
                      type="number"
                      className="form-control form-control-sm text-end"
                      value={row.credit}
                      onChange={(e) =>
                        handleChange(
                          index,
                          "credit",
                          e.target.value
                        )
                      }
                    />

                  </td>

                  <td className="text-center">

                    <button
                      className="btn btn-success btn-sm me-1"
                      onClick={addRow}
                    >
                      +
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeRow(index)}
                    >
                      −
                    </button>

                  </td>

                </tr>
              ))}

            </tbody>

            <tfoot className="table-light">

              <tr className="fw-bold">

                <td className="text-end">
                  TOTAL
                </td>

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

        </div>

        {/* Narration */}

        <div className="p-3 border-top">

          <label className="form-label fw-semibold">
            Narration
          </label>

          <textarea
            rows="3"
            className="form-control"
            value={narration}
            onChange={(e) => setNarration(e.target.value)}
            placeholder="Enter narration..."
          />

        </div>

        {/* Footer */}

        <div className="border-top p-3 text-end">

          <button
            className="btn btn-secondary me-2"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>

          <button
            className="btn btn-primary"
            onClick={handleSave}
          >
            Save Voucher
          </button>

        </div>

      </div>

    </div>
  );
}