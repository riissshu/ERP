import React, { useState } from "react";

const demo = () => {
  const [voucher, setVoucher] = useState({
    invoiceNo: "",
    customer: "",
    date: "",
  });

  const [items, setItems] = useState([
    {
      product: "",
      qty: 0,
      rate: 0,
      amount: 0,
    },
  ]);

  const handleVoucherChange = (e) => {
    setVoucher({
      ...voucher,
      [e.target.name]: e.target.value,
    });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;

    const updatedItems = [...items];
    updatedItems[index][name] = value;

    updatedItems[index].amount =
      Number(updatedItems[index].qty) *
      Number(updatedItems[index].rate);

    setItems(updatedItems);
  };

  const addRow = () => {
    setItems([
      ...items,
      {
        product: "",
        qty: 1,
        rate: 0,
        amount: 0,
      },
    ]);
  };

  const removeRow = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );


  const saveVoucher = () => {
    const data = {
      ...voucher,
      items,
      subtotal,
      gst
    };

    console.log(data);
    alert("Voucher Saved");
  };

  return (
    <div style={{ padding: 20, maxWidth: 1000, margin: "auto" }}>
      <h2>Sales Voucher Entry</h2>

      <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
        <div>
          <label>Gatepass No</label>
          <br />
          <input
            type="text"
            name="invoiceNo"
            value={voucher.invoiceNo}
            onChange={handleVoucherChange}
          />
        </div>

        <div>
          <label>Date</label>
          <br />
          <input
            type="date"
            name="date"
            value={voucher.date}
            onChange={handleVoucherChange}
          />
        </div>

        <div>
          <label>Customer</label>
          <br />
          <input
            type="text"
            name="customer"
            value={voucher.customer}
            onChange={handleVoucherChange}
          />
        </div>
      </div>

      <table
        border="1"
        cellPadding="8"
        width="100%"
        style={{ borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>

              <td>
                <input
                  type="text"
                  name="product"
                  value={item.product}
                  onChange={(e) => handleItemChange(index, e)}
                />
              </td>

              <td>
                <input
                  type="number"
                  name="qty"
                  value={item.qty}
                  onChange={(e) => handleItemChange(index, e)}
                />
              </td>

              <td>
                <input
                  type="number"
                  name="rate"
                  value={item.rate}
                  onChange={(e) => handleItemChange(index, e)}
                />
              </td>

              <td>{item.amount.toFixed(2)}</td>

              <td>
                <button onClick={() => removeRow(index)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <button onClick={addRow}>Add Item</button>

      <hr />

      <div style={{ textAlign: "right" }}>
        <h3>Subtotal : ₹ {subtotal.toFixed(2)}</h3>
      </div>

      <button
        onClick={saveVoucher}
        style={{
          padding: "10px 20px",
          background: "green",
          color: "#fff",
          border: 0,
          cursor: "pointer",
        }}
      >
        Save Voucher
      </button>
    </div>
  );
};

export default demo;