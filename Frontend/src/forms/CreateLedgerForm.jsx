import { useState } from "react";

const groups = [
  "Primary",
  "Bank Accounts",
  "Bank OD Accounts",
  "Branch / Divisions",
  "Capital Account",
  "Cash-in-Hand",
  "Current Assets",
  "Current Liabilities",
  "Deposits (Assets)",
  "Direct Expenses",
  "Direct Incomes",
  "Duties & Taxes",
  "Fixed Assets",
  "Indirect Expenses",
  "Indirect Income",
  "Investments",
  "Loans & Advances (Assets)",
  "Loans (Liability)",
  "Purchase Accounts",
  "Sales Accounts",
  "Secured Loans",
  "Sundry Creditors",
  "Sundry Debtors",
  "Unsecured Loans",
];

const states = [
  "Andhra Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "West Bengal",
];

export default function CreateLedgerForm() {
  const [ledger, setLedger] = useState({
    name: "",
    alias: "",
    under: "Sundry Debtors",

    address1: "",
    address2: "",
    state: "Bihar",
    country: "India",
    pincode: "",

    contactPerson: "",
    mobile: "",
    phone: "",
    email: "",

    openingBalance: "",
    balanceType: "Dr",
    creditPeriod: "",
    creditLimit: "",
  });

  const handleChange = (e) => {
    setLedger({
      ...ledger,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    console.log(ledger);
    alert("Ledger Saved Successfully");
  };

  const handleReset = () => {
    window.location.reload();
  };

  const showCreditPolicy =
  ledger.under === "Sundry Debtors" ||
  ledger.under === "Sundry Creditors";

  return (
    <div className="container-fluid tally-container">
      {/* HEADER */}

      <div className="tally-header">
        <div className="row align-items-center">
          <div className="col">
            <h5 className="m-0">Ledger Creation</h5>
          </div>
        </div>
      </div>

      {/* BASIC DETAILS */}

      <div className="tally-section">Basic Details</div>

      <div className="tally-body">
        <div className="row mb-2 align-items-center">
          <label className="col-md-3 tally-label">Name</label>

          <div className="col-md-9">
            <input
              className="form-control tally-input"
              name="name"
              value={ledger.name}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row mb-2 align-items-center">
          <label className="col-md-3 tally-label">Alias</label>

          <div className="col-md-9">
            <input
              className="form-control tally-input"
              name="alias"
              value={ledger.alias}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row mb-2 align-items-center">
          <label className="col-md-3 tally-label">Under</label>

          <div className="col-md-9">
            <select
              className="form-select tally-input"
              name="under"
              value={ledger.under}
              onChange={handleChange}
            >
              {groups.map((group) => (
                <option key={group}>{group}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* MAILING DETAILS */}

      <div className="tally-section">Mailing Details</div>

      <div className="tally-body">
        <div className="row mb-2 align-items-center">
          <label className="col-md-3 tally-label">Address</label>

          <div className="col-md-9">
            <input
              className="form-control tally-input mb-2"
              name="address1"
              value={ledger.address1}
              onChange={handleChange}
            />

            <input
              className="form-control tally-input"
              name="address2"
              value={ledger.address2}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row mb-2 align-items-center">
          <label className="col-md-3 tally-label">State</label>

          <div className="col-md-4">
            <select
              className="form-select tally-input"
              name="state"
              value={ledger.state}
              onChange={handleChange}
            >
              {states.map((state) => (
                <option key={state}>{state}</option>
              ))}
            </select>
          </div>

          <label className="col-md-2 tally-label">Country</label>

          <div className="col-md-3">
            <input
              className="form-control tally-input"
              name="country"
              value={ledger.country}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row mb-3 align-items-center">
          <label className="col-md-3 tally-label">Pincode</label>

          <div className="col-md-3">
            <input
              className="form-control tally-input"
              name="pincode"
              value={ledger.pincode}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* CONTACT DETAILS */}

      <div className="tally-section">Contact Details</div>

      <div className="tally-body">
        <div className="row mb-2 align-items-center">
          <label className="col-md-3 tally-label">Contact Person</label>

          <div className="col-md-9">
            <input
              type="text"
              className="form-control tally-input"
              name="contactPerson"
              value={ledger.contactPerson}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row mb-2">
          <label className="col-md-3 tally-label">Mobile</label>

          <div className="col-md-3">
            <input
              type="text"
              className="form-control tally-input"
              name="mobile"
              value={ledger.mobile}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-md-3 tally-label">Email</label>

          <div className="col-md-9">
            <input
              type="email"
              className="form-control tally-input"
              name="email"
              value={ledger.email}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* ACCOUNTING DETAILS */}

      <div className="tally-section">Accounting Details</div>

      <div className="tally-body">
        <div className="row mb-3">
          <label className="col-md-3 tally-label">Opening Balance</label>

          <div className="col-md-3">
            <input
              type="number"
              className="form-control tally-input"
              name="openingBalance"
              value={ledger.openingBalance}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-2">
            <select
              className="form-select tally-input"
              name="balanceType"
              value={ledger.balanceType}
              onChange={handleChange}
            >
              <option>Dr</option>
              <option>Cr</option>
            </select>
          </div>
        </div>

      {/* CREDIT PERIOD & CREDIT DAYS - MAKING DISPLAY CONDITIONALLY */}

        {showCreditPolicy && (
        
        <>
        <div className="row mb-3">
          <label className="col-md-3 tally-label">Credit Period</label>

          <div className="col-md-3">
            <input
              type="number"
              className="form-control tally-input"
              name="creditPeriod"
              value={ledger.creditPeriod}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-2 d-flex align-items-center">Days</div>
        </div>

        <div className="row mb-3">
          <label className="col-md-3 tally-label">Credit Limit</label>

          <div className="col-md-3">
            <input
              type="number"
              className="form-control tally-input"
              name="creditLimit"
              value={ledger.creditLimit}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-2 d-flex align-items-center">₹</div>
        </div>
        </>
        )}

      </div>

      {/* FOOTER */}

      <div className="tally-footer">
        <div className="d-flex justify-content-end gap-2 align-items-center flex-wrap">
          <button
            className="btn btn-secondary btn-sm me-2"
            onClick={handleReset}
          >
            Reset
          </button>

          <button className="btn btn-primary btn-sm" onClick={handleSave}>
            Save Ledger
          </button>
        </div>
      </div>
    </div>
  );
}
