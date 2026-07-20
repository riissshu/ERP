import { useState } from "react";

const customers = [
  "ABC Traders",
  "XYZ Enterprises",
  "Global Foods",
];

const products = [
  "Laptop",
  "Keyboard",
  "Mouse",
  "Monitor",
];

export default function DemoOrder() {
  const [voucher, setVoucher] = useState({
    orderNo: "OD-0001",
    date: new Date().toISOString().substring(0, 10),
    customer: "",
    transporter: "",
    paymentType: "Credit",
    remarks: "",
  });

  const [items, setItems] = useState([
    {
      product: "",
      qty: 0,
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
        qty: 0,
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

    alert("Order Created");
  };

  return (
    <div className="container">
      <h2 className="pb-2 pt-2">Order Voucher</h2>

        <div className="card-body">

          <div className="row mb-3">

            <div className="col-md-3">
              <label>Order No</label>
              <input
                className="form-control"
                name="orderNo"
                value={voucher.orderNo}
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
              <label>Customer</label>

              <select
                className="form-control"
                name="customer"
                value={voucher.customer}
                onChange={handleVoucher}
              >
                <option value="">Select Customer</option>

                {customers.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="col-md-3">
              <label>Transporter</label>

              <input
                className="form-control"
                name="transporter"
                value={voucher.transporter}
                onChange={handleVoucher}
              />
            </div>

          </div>

          <table className="table table-bordered">

            <thead>
              <tr>
                <th width="50">#</th>
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
                    <td>{index + 1}</td>

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

              <label>Remarks</label>

              <textarea
                className="form-control"
                rows="4"
                name="remark"
                value={voucher.remark}
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
                className="btn"
                 style={{
                    background: "green",
                    color: "#fff",
                  }}
                onClick={saveVoucher}
              >
                Create Order
              </button>

            </div>

          </div>

        </div>
      
      </div>
  );
}