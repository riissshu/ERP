import { useEffect, useState } from "react";

const bomList = [
    {
      code: "BOM001",
      finishedItem: "Biscuit Box",
      outputQty: 100,
      unit: "Box",
      materials: [
        { material: "Flour", qty: 50, unit: "Kg" },
        { material: "Sugar", qty: 20, unit: "Kg" },
        { material: "Oil", qty: 10, unit: "Ltr" },
        { material: "Wrapper", qty: 100, unit: "Nos" },
      ],
    },
    {
      code: "BOM002",
      finishedItem: "Chocolate Box",
      outputQty: 50,
      unit: "Box",
      materials: [
        { material: "Chocolate", qty: 25, unit: "Kg" },
        { material: "Sugar", qty: 8, unit: "Kg" },
        { material: "Wrapper", qty: 50, unit: "Nos" },
      ],
    },
  ];

export default function ProductionEntryForm() {
  

  const [voucherNo, setVoucherNo] = useState("PRO000001");

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const [selectedBOM, setSelectedBOM] = useState("");

  const [finishedItem, setFinishedItem] = useState("");

  const [bomOutputQty, setBomOutputQty] = useState(1);

  const [outputUnit, setOutputUnit] = useState("");

  const [productionQty, setProductionQty] = useState("");

  const [rows, setRows] = useState([
  {
    material: "",
    bomQty: 0,
    requiredQty: 0,
    actualQty: 0,
    unit: "",
  },
]);

  const filteredBOMs = bomList.filter(
    (bom) => bom.finishedItem === finishedItem,
  );

  useEffect(() => {
    if (!selectedBOM) return;

    const bom = bomList.find((b) => b.code === selectedBOM);

    if (!bom) return;

    setBomOutputQty(bom.outputQty);

    setRows(
      bom.materials.map((item) => ({
        material: item.material,
        bomQty: item.qty,
        requiredQty: 0,
        actualQty: 0,
        unit: item.unit,
      })),
    );
  }, [selectedBOM]);

  useEffect(() => {

    // If Production Qty is blank or zero, reset quantities
    if (!productionQty || Number(productionQty) <= 0) {
      setRows((prev) =>
        prev.map((row) => ({
          ...row,
          requiredQty: 0,
          actualQty: 0,
        })),
      );
      return;
    }

    const factor = Number(productionQty) / Number(bomOutputQty);

    setRows((prev) =>
      prev.map((row) => {
        const required = Number((row.bomQty * factor).toFixed(3));

        return {
          ...row,
          requiredQty: required,
          actualQty: required, // Default consumed = required
        };
      }),
    );
  }, [productionQty, bomOutputQty]);

  const handleActualQtyChange = (index, value) => {
    const updated = [...rows];

    updated[index].actualQty = value;

    setRows(updated);
  };

  const handleFinishedProductChange = (value) => {
  setFinishedItem(value);
  setSelectedBOM("");
  setRows([
  {
    material: "",
    bomQty: 0,
    requiredQty: 0,
    actualQty: 0,
    unit: "",
  },
]);
  setProductionQty("");

  const product = bomList.find(
    (b) => b.finishedItem === value
  );

  if (product) {
    setOutputUnit(product.unit);
  } else {
    setOutputUnit("");
  }
};

  const handleSave = () => {
    const voucher = {
      voucherNo,
      date,
      selectedBOM,
      finishedItem,
      productionQty,
      unit: outputUnit,
      materials: rows,
    };

    console.log(voucher);

    alert("Production Saved Successfully");
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Production Entry</h5>
        </div>

        <div className="card-body">
          {/* Header */}

          <div className="row g-3 mb-4">
            <div className="col-md-3">
              <label className="form-label fw-semibold">Voucher No.</label>

              <input
                type="text"
                className="form-control"
                value={voucherNo}
                onChange={(e) => setVoucherNo(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label fw-semibold">Date</label>

              <input
                type="date"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label fw-semibold">Finished Product</label>

            <select
  className="form-select"
  value={finishedItem}
  onChange={(e) => handleFinishedProductChange(e.target.value)}
>
                <option value="">Select Finished Product</option>

                {[...new Set(bomList.map((b) => b.finishedItem))].map(
                  (item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ),
                )}
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label fw-semibold">BOM</label>

              <select
                className="form-select"
                value={selectedBOM}
                onChange={(e) => setSelectedBOM(e.target.value)}
                disabled={!finishedItem}
              >
                <option value="">Select BOM</option>

                {filteredBOMs.map((bom) => (
                  <option key={bom.code} value={bom.code}>
                    {bom.code}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Production Details */}

          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <label className="form-label fw-semibold">Production Qty</label>

              <input
                type="number"
                className="form-control text-end"
                value={productionQty}
                min="0"
                step="0.001"
                onChange={(e) => setProductionQty(e.target.value)}
                placeholder="Enter Quantity"
              />
            </div>

            <div className="col-md-2">
              <label className="form-label fw-semibold">Unit</label>

              <input
                type="text"
                className="form-control"
                value={outputUnit}
                readOnly
              />
            </div>
          </div>

          <div className="alert alert-light border py-2 mb-3">
            <strong>BOM:</strong> {selectedBOM || "-"} &nbsp;&nbsp;|&nbsp;&nbsp;
            <strong>Finished Product:</strong> {finishedItem || "-"}
          </div>

          {/* Material Table */}

          <div className="table-responsive">
            <table className="table table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  <th width="60">Sl</th>
                  <th>Raw Material</th>
                  <th width="140" className="text-end">
                    Required Qty As Per Bom
                  </th>
                  <th width="140" className="text-end">
                    Actual Consumed Qty
                  </th>
                  <th width="100">Unit</th>
                </tr>
              </thead>

              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>

                    <td>{row.material}</td>

                    <td className="text-end">{row.requiredQty}</td>

                    <td>
                      <input
                        type="number"
                        className="form-control text-end"
                        value={row.actualQty}
                        min="0"
                        step="0.001"
                        onChange={(e) =>
                          handleActualQtyChange(index, e.target.value)
                        }
                      />
                    </td>

                    <td>{row.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}

          <div className="d-flex justify-content-end gap-2 mt-4">
            <button
              className="btn btn-success"
              onClick={handleSave}
              disabled={!selectedBOM || !productionQty}
            >
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
