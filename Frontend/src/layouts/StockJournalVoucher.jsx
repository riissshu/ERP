import { useState } from "react";
import StockTransferTable from "../forms/StockTransferTable.jsx";

export default function StockJournalVoucher() {
  const [voucherNo, setVoucherNo] = useState("SJ-000001");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [narration, setNarration] = useState("");

  const [sourceRows, setSourceRows] = useState([
    { item: "", qty: "", unit: "", rate: "", amount: 0 },
  ]);

  const [destinationRows, setDestinationRows] = useState([
    { item: "", qty: "", unit: "", rate: "", amount: 0 },
  ]);

  // Derived totals — recalculated on every render, no extra state needed
  const sourceQty = sourceRows.reduce((sum, r) => sum + (Number(r.qty) || 0), 0);
  const sourceAmount = sourceRows.reduce((sum, r) => sum + (Number(r.amount) || 0), 0);
  const destinationQty = destinationRows.reduce((sum, r) => sum + (Number(r.qty) || 0), 0);
  const destinationAmount = destinationRows.reduce((sum, r) => sum + (Number(r.amount) || 0), 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const source = sourceRows.filter((r) => r.item !== "");
    const destination = destinationRows.filter((r) => r.item !== "");

    if (!source.length) {
      alert("Please enter at least one consumption item.");
      return;
    }
    if (!destination.length) {
      alert("Please enter at least one production item.");
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
    };

    console.log(voucher);
    alert("Stock Journal Saved Successfully");
    resetVoucher();
  };

  const resetVoucher = () => {
    setNarration("");
    setSourceRows([{ item: "", qty: "", unit: "", rate: "", amount: 0 }]);
    setDestinationRows([{ item: "", qty: "", unit: "", rate: "", amount: 0 }]);
  };

  return (
    <div className="container-fluid py-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Stock Journal Voucher</h4>
        </div>

        <div className="card-body">
          {/* Header */}
          <div className="row mb-4">
            <div className="col-md-6">
              <label className="form-label">Voucher No</label>
              <input
                className="form-control"
                value={voucherNo}
                onChange={(e) => setVoucherNo(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          {/* Dual Entry Layout */}
          <div className="row">
            <div className="col-lg-6">
              <StockTransferTable
                title="Source (Consumption)"
                rows={sourceRows}
                setRows={setSourceRows}
              />
              <div className="text-end small text-muted mt-1">
                Qty: {sourceQty} &nbsp; Amount: {sourceAmount.toFixed(2)}
              </div>
            </div>

            <div className="col-lg-6">
              <StockTransferTable
                title="Destination (Production)"
                rows={destinationRows}
                setRows={setDestinationRows}
              />
              <div className="text-end small text-muted mt-1">
                Qty: {destinationQty} &nbsp; Amount: {destinationAmount.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Narration */}
          <div className="row mt-3">
            <div className="col-12">
              <label className="form-label">Narration</label>
              <textarea
                className="form-control"
                rows={2}
                value={narration}
                onChange={(e) => setNarration(e.target.value)}
                placeholder="Enter narration (optional)"
              />
            </div>
          </div>

          <div className="mt-3">
            <button className="btn btn-success me-2" onClick={handleSubmit}>
              Save
            </button>
            <button className="btn btn-primary" onClick={resetVoucher}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}