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
    under: "Primary",

    address1: "",
    address2: "",
    state: "Bihar",
    country: "India",
    pincode: undefined,

    contactPerson: "",
    mobile: undefined,
    email: "",

    openingBalance: undefined,
    balanceType: "Dr",
    creditPeriod: undefined,
    creditLimit: undefined,
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
    ledger.under === "Sundry Debtors" || ledger.under === "Sundry Creditors";

  return (
    <div className="container-fluid">
      <h2 className="pb-2 pt-2">Ledger Creation</h2>

      {/* BASIC DETAILS */}
      <hr
        style={{
          backgroundColor: "#3066b1",
          borderColor: "#3066b1",
          opacity: 0.25,
          height: "5px",
        }}
      />
      <div className="fw-bold">Basic Details</div>

      <div className="row mb-2 align-items-center">
        <label className="col-md-3">Name</label>

        <div className="col-md-9">
          <input
            className="form-control"
            name="name"
            value={ledger.name}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="row mb-2 align-items-center">
        <label className="col-md-3">Alias</label>

        <div className="col-md-9">
          <input
            className="form-control"
            name="alias"
            value={ledger.alias}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="row mb-2 align-items-center">
        <label className="col-md-3">Under</label>

        <div className="col-md-9">
          <select
            className="form-select"
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
      <hr className="border border-primary border-2 opacity-50" />

      {/* MAILING DETAILS */}

      <div className="fw-bold">Mailing Details</div>

      <div className="row mb-2 align-items-center">
        <label className="col-md-3">Address</label>

        <div className="col-md-9">
          <input
            className="form-control mb-1"
            name="address1"
            value={ledger.address1}
            onChange={handleChange}
          />

          <input
            className="form-control"
            name="address2"
            value={ledger.address2}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="row mb-2 align-items-center">
        <label className="col-md-3">State</label>

        <div className="col-md-4">
          <select
            className="form-select"
            name="state"
            value={ledger.state}
            onChange={handleChange}
          >
            {states.map((state) => (
              <option key={state}>{state}</option>
            ))}
          </select>
        </div>

        <label className="col-md-2">Country</label>

        <div className="col-md-3">
          <select
            className="form-select"
            name="country"
            value={ledger.country}
            onChange={handleChange}
          >
            <option>India</option>
          </select>
        </div>
      </div>

      <div className="row mb-3 align-items-center">
        <label className="col-md-3">Pincode</label>

        <div className="col-md-3">
          <input
            className="form-control"
            name="pincode"
            type="number"
            value={ledger.pincode}
            onChange={handleChange}
          />
        </div>
      </div>
      <hr className="border border-primary border-2 opacity-50" />

      {/* CONTACT DETAILS */}

      <div className="fw-bold">Contact Details</div>

      <div className="row mb-2 align-items-center">
        <label className="col-md-3">Contact Person</label>

        <div className="col-md-9">
          <input
            type="text"
            className="form-control"
            name="contactPerson"
            value={ledger.contactPerson}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="row mb-2">
        <label className="col-md-3">Mobile</label>

        <div className="col-md-3">
          <input
            type="number"
            className="form-control"
            name="mobile"
            value={ledger.mobile}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="row mb-3">
        <label className="col-md-3">Email</label>

        <div className="col-md-9">
          <input
            type="email"
            className="form-control"
            name="email"
            value={ledger.email}
            onChange={handleChange}
          />
        </div>
      </div>
      <hr className="border border-primary border-2 opacity-50" />

      {/* ACCOUNTING DETAILS */}

      <div className="fw-bold">Accounting Details</div>

      <div className="row mb-3">
        <label className="col-md-3">Opening Balance</label>

        <div className="col-md-3">
          <input
            type="number"
            className="form-control"
            name="openingBalance"
            value={ledger.openingBalance}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-2">
          <select
            className="form-select"
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
            <label className="col-md-3">Credit Period</label>

            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                name="creditPeriod"
                value={ledger.creditPeriod}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-2 d-flex align-items-center">Days</div>
          </div>

          <div className="row mb-3">
            <label className="col-md-3">Credit Limit</label>

            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                name="creditLimit"
                value={ledger.creditLimit}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-2 d-flex align-items-center">₹</div>
          </div>
        </>
      )}

      <div className="row mb-5 me-5 justify-content-end gap-2">
        <button className="btn btn-secondary col-auto" onClick={handleReset}>
          Reset
        </button>

        <button className="btn btn-primary col-auto me-5" onClick={handleSave}>
          Save Ledger
        </button>
      </div>
    </div>
  );
}
