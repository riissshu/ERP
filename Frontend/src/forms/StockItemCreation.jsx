import { useState } from "react";

export default function StockItemCreation() {
  const [item, setItem] = useState({
    name: "",
    alias: "",
    under: "Primary",
    unit: "Bag",
    alternateUnit: "Kgs",
    openingQty: "",
    openingRate: "",
    openingValue: "",
  });

  const handleChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container-fluid p-0">
      <div
        className="d-flex justify-content-between px-3 py-1 text-white"
        style={{
          background: "#2e74b5",
          fontWeight: "bold",
          fontSize: "14px",
        }}
      >
        <span>Stock Item Creation</span>
      </div>
        <div className="p-3">
          <div className="row mb-2">
            <div className="col-md-1">Name</div>

            <div className="col-md-4">
              <input
                className="form-control form-control-sm"
                name="name"
                value={item.name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-1">(alias)</div>

            <div className="col-md-4">
              <input
                className="form-control form-control-sm"
                name="alias"
                value={item.alias}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <hr className="m-0" />

        <div className="row m-0">

          <div className="col-md-5 border-end" style={{ minHeight: 150 }}>

            <div className="row mt-3">
              <div className="col-5">Under</div>

              <div className="col-7">
                <select
                  className="form-select form-select-sm"
                  name="under"
                  value={item.under}
                  onChange={handleChange}
                >
                  <option>Primary</option>
                  <option>Finished Goods</option>
                  <option>Raw Material</option>
                </select>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-5">Base Unit</div>

              <div className="col-7">
                <select
                  className="form-select form-select-sm"
                  name="unit"
                  value={item.unit}
                  onChange={handleChange}
                >
                  <option>Bag</option>
                  <option>Nos</option>
                  <option>Kgs</option>
                  <option>Gram</option>
                  <option>Litre</option>
                  <option>Ml</option>
                  <option>Box</option>
                  <option>Packet</option>
                </select>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="row mt-3">
              <div className="col-5 ps-4 text-end">Alternate Units</div>

              <div className="col-7">
                <select
                  className="form-select form-select-sm"
                  name="alternateUnit"
                  value={item.alternateUnit}
                  onChange={handleChange}
                >
                  <option>Pcs</option>
                  <option>Kgs</option>
                  <option>Gram</option>
                  <option>Nos</option>
                  <option>Box</option>
                  <option>Packet</option>
                </select>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-5 ps-4 text-end">where</div>

              <div className="col-7">
                <div className="d-flex align-items-center">
                  <input
                    type="number"
                    name="altQty"
                    value={item.altQty}
                    onChange={handleChange}
                    className="form-control form-control-sm text-end"
                    style={{ width: 70 }}
                  />

                  <span className="mx-2">{item.alternateUnit}</span>

                  <span className="mx-4">=</span>

                  <input
                    type="number"
                    name="baseQty"
                    value={item.baseQty}
                    onChange={handleChange}
                    className="form-control form-control-sm text-end"
                    style={{ width: 70 }}
                  />

                  <span className="ms-2">{item.unit}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="m-0" />

          <div className="row mt-3">

            <span className="text-center fw-bold col-md-2 py-4">Opening Balance</span>

            <div className="col-md-2">
              Quantity
              <input
                className="form-control form-control-sm"
                style={{ width: 200 }}
                name="openingQty"
                value={item.openingQty}
                onChange={handleChange}
              />

            </div>

            <span className="text-center fw-bold col-md-1 py-4">{item.unit}</span>

            <div className="col-md-3">
              Rate
              <input
                className="form-control form-control-sm"
                style={{ width: 200 }}
                name="openingRate"
                value={item.openingRate}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-3">
              Value
              <input
                className="form-control form-control-sm"
                style={{ width: 200 }}
                name="openingValue"
                value={item.openingValue}
                onChange={handleChange}
              />
            </div>
          </div>
        
      
    </div>
  );
}
