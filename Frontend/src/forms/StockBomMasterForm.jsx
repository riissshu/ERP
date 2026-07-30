import { useState } from "react";

export default function BOMForm() {
  const finishedProducts = [
    { name: "Biscuit Box", unit: "Box" },
    { name: "Chocolate Box", unit: "Box" },
    { name: "Soap", unit: "Nos" },
    { name: "Detergent Powder", unit: "Bag" },
  ];

  const rawMaterials = [
    { name: "Flour", unit: "Kg" },
    { name: "Sugar", unit: "Kg" },
    { name: "Oil", unit: "Ltr" },
    { name: "Wrapper", unit: "Nos" },
    { name: "Chocolate", unit: "Kg" },
    { name: "Fragrance", unit: "Ltr" },
  ];

  const [finishedItem, setFinishedItem] = useState("");
  const [bomCode, setBomCode] = useState("");
  const [outputQty, setOutputQty] = useState("");
  const [finishedUnit, setFinishedUnit] = useState("");

  const [rows, setRows] = useState([
    {
      material: "",
      qty: "",
      unit: "",
    },
  ]);

  const handleFinishedProductChange = (value) => {
    setFinishedItem(value);

    const product = finishedProducts.find((p) => p.name === value);
    setFinishedUnit(product ? product.unit : "");
  };

  const handleMaterialChange = (index, value) => {
    const updated = [...rows];
    updated[index].material = value;

    const material = rawMaterials.find((m) => m.name === value);
    updated[index].unit = material ? material.unit : "";

    setRows(updated);
  };

  const handleQtyChange = (index, value) => {
    const updated = [...rows];
    updated[index].qty = value;
    setRows(updated);
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        material: "",
        qty: "",
        unit: "",
      },
    ]);
  };

  const removeRow = (index) => {
    if (rows.length === 1) return;
    setRows(rows.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const bom = {
      bomCode,
      finishedItem,
      outputQty: outputQty,
      materials: rows,
    };

    console.log("Saved BOM:", bom);
    alert("BOM Saved Successfully");
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Bill of Material (BOM)</h5>
        </div>

        <div className="card-body">
          {/* Finished Product */}
          <div className="row mb-4">
            <div className="col-md-4">
              <label className="form-label fw-semibold">Finished Product</label>

              <select
                className="form-select"
                value={finishedItem}
                onChange={(e) => handleFinishedProductChange(e.target.value)}
              >
                <option value="">Select Product</option>

                {finishedProducts.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <label className="form-label fw-semibold">Output Qty</label>
              <input
                type="number"
                className="form-control text-end"
                value={outputQty}
                onChange={(e) => setOutputQty(e.target.value)}
                min="0"
              />
            </div>

            <div className="col-md-2">
              <label className="form-label fw-semibold">Unit</label>
              <input
                type="text"
                className="form-control"
                value={finishedUnit}
                readOnly
              />
            </div>

            <div className="col-md-3">
              <label className="form-label fw-semibold">BOM Code</label>

              <input
                type="text"
                className="form-control"
                value={bomCode}
                onChange={(e) => setBomCode(e.target.value)}
                placeholder="Enter BOM Code"
              />
            </div>
          </div>

          {/* Materials Table */}
          <div className="table-responsive">
            <table className="table table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  <th width="60">Sl</th>
                  <th>Raw Material</th>
                  <th width="140">Qty</th>
                  <th width="120">Unit</th>
                  <th width="90" className="text-center">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>

                    <td>
                      <select
                        className="form-select"
                        value={row.material}
                        onChange={(e) =>
                          handleMaterialChange(index, e.target.value)
                        }
                      >
                        <option value="">Select</option>

                        {rawMaterials.map((item) => (
                          <option key={item.name} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td>
                      <input
                        type="number"
                        className="form-control text-end"
                        value={row.qty}
                        min="0"
                        step="0.001"
                        onChange={(e) => handleQtyChange(index, e.target.value)}
                      />
                    </td>

                    <td>
                      <input
                        type="text"
                        className="form-control"
                        value={row.unit}
                        readOnly
                      />
                    </td>

                    <td className="text-center">
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => removeRow(index)}
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Material */}
          <button className="btn btn-outline-primary mb-4" onClick={addRow}>
            + Add Material
          </button>

          {/* Footer Buttons */}
          <div className="d-flex justify-content-end gap-2">
            <button className="btn btn-success" onClick={handleSave}>
              Save
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
