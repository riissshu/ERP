import { useState } from "react";

const stockItems = [
  { id: 1, name: "Rice", unit: "Bag" },
  { id: 2, name: "Wheat", unit: "Bag" },
  { id: 3, name: "Flour", unit: "Bag" },
  { id: 4, name: "Sugar", unit: "Kg" },
  { id: 5, name: "Oil", unit: "Ltr" },
];

const createLine = () => ({
  item: "",
  qty: "",
  unit: "",
  rate: "",
  amount: 0,
});

const createGridRow = () => ({
  source: createLine(),
  destination: createLine(),
});

export default function StockJournalSheet() {
  const [voucherNo, setVoucherNo] = useState("SJ-000001");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [narration, setNarration] = useState("");
  const [rows, setRows] = useState([createGridRow()]);

  const updateLine = (rowIndex, section, field, value) => {
    setRows((currentRows) =>
      currentRows.map((row, index) => {
        if (index !== rowIndex) return row;

        const updatedLine = {
          ...row[section],
          [field]: value,
        };

        if (field === "item") {
          const selectedItem = stockItems.find((item) => item.name === value);

          updatedLine.unit = selectedItem ? selectedItem.unit : "";
        }

        const qty = Number(updatedLine.qty) || 0;
        const rate = Number(updatedLine.rate) || 0;

        updatedLine.amount = qty * rate;

        return {
          ...row,
          [section]: updatedLine,
        };
      })
    );
  };

  const addRow = () => {
    setRows((currentRows) => [...currentRows, createGridRow()]);
  };

  const deleteRow = (rowIndex) => {
    if (rows.length === 1) return;

    setRows((currentRows) =>
      currentRows.filter((_, index) => index !== rowIndex)
    );
  };

  const sourceRows = rows.map((row) => row.source);
  const destinationRows = rows.map((row) => row.destination);

  const sourceQty = sourceRows.reduce(
    (sum, row) => sum + (Number(row.qty) || 0),
    0
  );

  const sourceAmount = sourceRows.reduce(
    (sum, row) => sum + (Number(row.amount) || 0),
    0
  );

  const destinationQty = destinationRows.reduce(
    (sum, row) => sum + (Number(row.qty) || 0),
    0
  );

  const destinationAmount = destinationRows.reduce(
    (sum, row) => sum + (Number(row.amount) || 0),
    0
  );

  const resetVoucher = () => {
    setNarration("");
    setRows([createGridRow()]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const source = sourceRows.filter(
      (row) => row.item && Number(row.qty) > 0
    );

    const destination = destinationRows.filter(
      (row) => row.item && Number(row.qty) > 0
    );

    if (!source.length) {
      alert("Please enter at least one Consumption item with a quantity.");
      return;
    }

    if (!destination.length) {
      alert("Please enter at least one Production item with a quantity.");
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
      createdAt: new Date().toISOString(),
    };

    console.log("Stock Journal Voucher:", voucher);
    alert("Stock Journal Saved Successfully");

    resetVoucher();
  };

  return (
    <div className="container-fluid">

      <h2 className="pb-2 pt-2">Stock Journal Voucher</h2>
      
      <form onSubmit={handleSubmit}>
          
        <div className="card-body">
          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <label className="form-label">Voucher No.</label>
              <input
                className="form-control"
                value={voucherNo}
                onChange={(event) => setVoucherNo(event.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-control"
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered table-sm align-middle mb-0">
              <thead>
                <tr className="text-center">
                  <th colSpan="5" className="bg-danger-subtle text-danger">
                    Consumption
                  </th>

                  <th
                    className="bg-white border-top-0 border-bottom-0"
                    style={{ minWidth: "48px" }}
                  >
                    &nbsp;
                  </th>

                  <th colSpan="5" className="bg-success-subtle text-success">
                    Production / Receipt
                  </th>
                </tr>

                <tr className="table-light text-center">
                  <th style={{ minWidth: "180px" }}>Item</th>
                  <th style={{ minWidth: "80px" }}>Qty</th>
                  <th style={{ minWidth: "75px" }}>Unit</th>
                  <th style={{ minWidth: "90px" }}>Rate</th>
                  <th style={{ minWidth: "105px" }}>Amount</th>

                  <th className="bg-white border-top-0 border-bottom-0">
                    &nbsp;
                  </th>

                  <th style={{ minWidth: "180px" }}>Item</th>
                  <th style={{ minWidth: "80px" }}>Qty</th>
                  <th style={{ minWidth: "75px" }}>Unit</th>
                  <th style={{ minWidth: "90px" }}>Rate</th>
                  <th style={{ minWidth: "105px" }}>Amount</th>
                </tr>
              </thead>

              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <select
                        className="form-select form-select-sm border-0"
                        value={row.source.item}
                        onChange={(event) =>
                          updateLine(
                            index,
                            "source",
                            "item",
                            event.target.value
                          )
                        }
                      >
                        <option value="">Select item</option>
                        {stockItems.map((item) => (
                          <option key={item.id} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td>
                      <input
                        type="number"
                        min="0"
                        step="any"
                        className="form-control form-control-sm border-0 text-end"
                        value={row.source.qty}
                        onChange={(event) =>
                          updateLine(
                            index,
                            "source",
                            "qty",
                            event.target.value
                          )
                        }
                      />
                    </td>

                    <td>
                      <input
                        className="form-control form-control-sm border-0 bg-light text-center"
                        value={row.source.unit}
                        readOnly
                      />
                    </td>

                    <td>
                      <input
                        type="number"
                        min="0"
                        step="any"
                        className="form-control form-control-sm border-0 text-end"
                        value={row.source.rate}
                        onChange={(event) =>
                          updateLine(
                            index,
                            "source",
                            "rate",
                            event.target.value
                          )
                        }
                      />
                    </td>

                    <td>
                      <input
                        className="form-control form-control-sm border-0 bg-light text-end"
                        value={row.source.amount.toFixed(2)}
                        readOnly
                      />
                    </td>

                    <td className="text-center bg-light">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        title="Delete row"
                        onClick={() => deleteRow(index)}
                        disabled={rows.length === 1}
                      >
                        ×
                      </button>
                    </td>

                    <td>
                      <select
                        className="form-select form-select-sm border-0"
                        value={row.destination.item}
                        onChange={(event) =>
                          updateLine(
                            index,
                            "destination",
                            "item",
                            event.target.value
                          )
                        }
                      >
                        <option value="">Select item</option>
                        {stockItems.map((item) => (
                          <option key={item.id} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td>
                      <input
                        type="number"
                        min="0"
                        step="any"
                        className="form-control form-control-sm border-0 text-end"
                        value={row.destination.qty}
                        onChange={(event) =>
                          updateLine(
                            index,
                            "destination",
                            "qty",
                            event.target.value
                          )
                        }
                      />
                    </td>

                    <td>
                      <input
                        className="form-control form-control-sm border-0 bg-light text-center"
                        value={row.destination.unit}
                        readOnly
                      />
                    </td>

                    <td>
                      <input
                        type="number"
                        min="0"
                        step="any"
                        className="form-control form-control-sm border-0 text-end"
                        value={row.destination.rate}
                        onChange={(event) =>
                          updateLine(
                            index,
                            "destination",
                            "rate",
                            event.target.value
                          )
                        }
                      />
                    </td>

                    <td>
                      <input
                        className="form-control form-control-sm border-0 bg-light text-end"
                        value={row.destination.amount.toFixed(2)}
                        readOnly
                      />
                    </td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr className="table-secondary fw-semibold">
                  <td>Total</td>
                  <td className="text-end">{sourceQty}</td>
                  <td />
                  <td />
                  <td className="text-end">
                    {sourceAmount.toFixed(2)}
                  </td>

                  <td className="text-center">
                    <button
                      type="button"
                      className="btn btn-sm btn-primary"
                      onClick={addRow}
                    >
                      + Row
                    </button>
                  </td>

                  <td>Total</td>
                  <td className="text-end">{destinationQty}</td>
                  <td />
                  <td />
                  <td className="text-end">
                    {destinationAmount.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="mt-4">
            <label className="form-label">Narration</label>
            <textarea
              className="form-control"
              rows={2}
              value={narration}
              onChange={(event) => setNarration(event.target.value)}
              placeholder="Enter narration (optional)"
            />
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={resetVoucher}
            >
              Reset
            </button>

            <button type="submit" className="btn btn-success">
              Save Voucher
            </button>
          </div>
        </div>
        
      </form>
    </div>
  );
}