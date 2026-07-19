import { useState } from "react";

const suppliers = [
  "ABC Traders",
  "XYZ Enterprises",
  "Global Suppliers",
];

const products = [
  "Laptop",
  "Keyboard",
  "Mouse",
  "Monitor",
];

export default function DemoPurchase() {
  const [voucher, setVoucher] = useState({
    voucherNo: "PV-0001",
    date: new Date().toISOString().substring(0, 10),
    supplier: "",
    invoiceNo: "",
    paymentType: "Credit",
    narration: "",
  });

  const [items, setItems] = useState([
    {
      product: "",
      qty: 1,
      rate: 0,
    },
  ]);

  const handleVoucher = (e) => {
    setVoucher({
      ...voucher,
      [e.target.name]: e.target.value,
    });
  };

  const handleItem = (index, field, value) => {
    const data = [...items];
    data[index][field] = value;
    setItems(data);
  };

  const addRow = () => {
    setItems([
      ...items,
      {
        product: "",
        qty: 1,
        rate: 0,
      },
    ]);
  };

  const deleteRow = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const subtotal = items.reduce(
    (sum, row) => sum + row.qty * row.rate,
    0
  );

  const saveVoucher = () => {
    const payload = {
      ...voucher,
      items,
      subtotal,
    };

    console.log(payload);

    alert("Purchase Voucher Saved");
  };

  return (
    <div className="container">

      <div className="card">

        <div className="card-header bg-success text-white">
          <h3>Purchase Voucher</h3>
        </div>

        <div className="card-body">

          <div className="row mb-3">

            <div className="col-md-3">
              <label>Voucher No</label>
              <input
                className="form-control"
                name="voucherNo"
                value={voucher.voucherNo}
                onChange={handleVoucher}
              />
            </div>

            <div className="col-md-3">
              <label>Date</label>
              <input
                type="date"
                className="form-control"
                name="date"
                value={voucher.date}
                onChange={handleVoucher}
              />
            </div>

            <div className="col-md-3">
              <label>Supplier</label>

              <select
                className="form-control"
                name="supplier"
                value={voucher.supplier}
                onChange={handleVoucher}
              >
                <option value="">Select Supplier</option>

                {suppliers.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="col-md-3">
              <label>Invoice No</label>

              <input
                className="form-control"
                name="invoiceNo"
                value={voucher.invoiceNo}
                onChange={handleVoucher}
              />
            </div>

          </div>

          <table className="table table-bordered">

            <thead>
              <tr>
                <th>Product</th>
                <th width="80">Qty</th>
                <th width="120">Rate</th>
                <th width="150">Amount</th>
                <th></th>
              </tr>
            </thead>

            <tbody>

              {items.map((row, index) => {

                const amount =
                  row.qty * row.rate

                return (
                  <tr key={index}>

                    <td>

                      <select
                        className="form-control"
                        value={row.product}
                        onChange={(e) =>
                          handleItem(index, "product", e.target.value)
                        }
                      >
                        <option value="">Select</option>

                        {products.map((p) => (
                          <option key={p}>{p}</option>
                        ))}

                      </select>

                    </td>

                    <td>
                      <input
                        type="number"
                        className="form-control"
                        value={row.qty}
                        onChange={(e) =>
                          handleItem(index, "qty", Number(e.target.value))
                        }
                      />
                    </td>

                    <td>
                      <input
                        type="number"
                        className="form-control"
                        value={row.rate}
                        onChange={(e) =>
                          handleItem(index, "rate", Number(e.target.value))
                        }
                      />
                    </td>


                    <td>{amount.toFixed(2)}</td>

                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteRow(index)}
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                );

              })}

            </tbody>

          </table>

          <button
            className="btn btn-primary mb-3"
            onClick={addRow}
          >
            Add Item
          </button>

          <div className="row">

            <div className="col-md-6">

              <label>Narration</label>

              <textarea
                className="form-control"
                rows="4"
                name="narration"
                value={voucher.narration}
                onChange={handleVoucher}
              />

            </div>

            <div className="col-md-6">

              <table className="table">

                <tbody>

                  <tr>
                    <th>Subtotal</th>
                    <td>{subtotal.toFixed(2)}</td>
                  </tr>

                </tbody>

              </table>

              <button
                className="btn btn-success"
                onClick={saveVoucher}
              >
                Save Purchase Voucher
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}