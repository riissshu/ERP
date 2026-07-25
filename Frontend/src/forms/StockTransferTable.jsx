const stockItems = [
  { name: "Rice", unit: "Bag" },
  { name: "Wheat", unit: "Bag" },
  { name: "Flour", unit: "Bag" },
  { name: "Sugar", unit: "Kg" },
  { name: "Oil", unit: "Ltr" },
];

export default function StockTransferTable({ title, rows, setRows }) {
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
