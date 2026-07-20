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
        qty: 0,
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
    <div>
      <h2>Sales Voucher</h2>
      <div className="row mb-3">

        <div className="col-md-2">
          <label>Voucher No</label>
          <input
            name="invoiceNo"
            className="form-control"
            value={voucher.invoiceNo}
            onChange={handleVoucherChange}
          />
        </div>

        <div className="col-md-2">
          <label>Date</label>
          <input
            type="date"
            className="form-control"
            name="date"
            value={voucher.date}
            onChange={handleVoucherChange}
          />
        </div>

        <div className="col-md-2">
          <label>Customer</label>
          <input
            type="text"
            className="form-control"
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
                <button 
                  onClick={() => removeRow(index)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <button className="btn btn-primary btn-sm" onClick={addRow}>
          Add Item
      </button>

      <hr />
      
      <div className="row">
        
        <div className="col-md-6">

              <label>Narration</label>

              <textarea
                className="form-control"
                rows="4"
                name="narration"
                value={voucher.narration}
                onChange={handleVoucherChange}
              />
        </div> 
        
        <div className="col-md-6 pt-4" >
            <h3 style={{ textAlign: "center"}}>Subtotal : ₹ {subtotal.toFixed(2)}</h3>
        </div>
        
      </div>
      
      
      <button
        className="btn mt-4 mb-4"
          style={{
            background: "green",
            color: "#fff",
          }}
        onClick={saveVoucher}
      >
        Save Voucher
      </button>

    </div>
  );
};

export default demo;