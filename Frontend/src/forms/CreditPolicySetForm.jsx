import { useState } from "react";

export default function CreditPolicySetForm() {
  const [group, setGroup] = useState("Sundry Creditors");

  const groups = ["Sundry Creditors", "Sundry Debtors"];

  const partyType = ["A", "B", "C"];

  const [ledgers, setLedgers] = useState([
    {
      id: 1,
      name: "3F Industries Limited",
      group: "Sundry Creditors",
      creditLimit: "",
      creditPeriod: "",
      checkDays: true,
      partyType: "",
    },
    {
      id: 2,
      name: "3F Industries Ltd",
      group: "Sundry Creditors",
      creditLimit: "",
      creditPeriod: "",
      checkDays: false,
      partyType: "",
    },
    {
      id: 3,
      name: "AITS Express, Chennai",
      group: "Sundry Creditors",
      creditLimit: "",
      creditPeriod: "",
      checkDays: false,
      partyType: "",
    },
    {
      id: 4,
      name: "Akhil Enterprises, Delhi",
      group: "Sundry Debtors",
      creditLimit: "",
      creditPeriod: "",
      checkDays: true,
      partyType: "",
    },
    {
      id: 5,
      name: "Amar Industries",
      group: "Sundry Debtors",
      creditLimit: "",
      creditPeriod: "",
      checkDays: false,
      partyType: "",
    },
    {
      id: 6,
      name: "Balajee Exchem Pvt Ltd",
      group: "Sundry Creditors",
      creditLimit: "",
      creditPeriod: "",
      checkDays: true,
      partyType: "",
    },
  ]);

  const [search, setSearch] = useState("");

  // Fixed: update by id instead of positional index, and avoid mutating state directly
  const handleChange = (id, field, value) => {
    setLedgers((prev) =>
      prev.map((ledger) =>
        ledger.id === id ? { ...ledger, [field]: value } : ledger,
      ),
    );
  };

  // Fixed: "Under Group" selector now actually scopes the ledger list
  const filtered = ledgers
    .filter((x) => x.group === group)
    .filter((x) => x.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="container-fluid mt-3">
      <div className="border">
        {/* Header */}

        <div className="bg-primary text-white px-3 py-2 d-flex justify-content-between">
          <strong>Multi Ledger Credit Limit</strong>
        </div>

        {/* Info */}

        <div className="row px-3 py-2 border-bottom">
          <div className="col-md-4 d-flex align-items-center">
            <label className="fw-bold me-2 mb-0">Under Group :</label>

            <select
              className="form-select form-select-sm"
              style={{ maxWidth: "260px" }}
              value={group}
              onChange={(e) => setGroup(e.target.value)}
            >
              {groups.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <input
              className="form-control form-control-sm"
              placeholder="Search Ledger..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}

        <div
          style={{
            maxHeight: "520px",
            overflowY: "auto",
          }}
        >
          <table className="table table-bordered table-hover table-sm align-middle mb-0">
            <thead
              className="table-light"
              style={{
                position: "sticky",
                top: 0,
                zIndex: 1,
              }}
            >
              <tr>
                <th width="70">S.No</th>

                <th>Name of Ledger</th>

                <th width="180">Category</th>

                <th width="170">Credit Limit</th>

                <th width="170">Credit Period</th>

                <th width="220">Check Credit Days</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((ledger, index) => (
                <tr key={ledger.id}>
                  <td>{index + 1}</td>

                  <td>{ledger.name}</td>

                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={ledger.partyType}
                      onChange={(e) =>
                        handleChange(ledger.id, "partyType", e.target.value)
                      }
                    >
                      {partyType.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td>
                    <input
                      type="number"
                      className="form-control form-control-sm text-end"
                      value={ledger.creditLimit}
                      onChange={(e) =>
                        handleChange(ledger.id, "creditLimit", e.target.value)
                      }
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      className="form-control form-control-sm text-center"
                      value={ledger.creditPeriod}
                      onChange={(e) =>
                        handleChange(ledger.id, "creditPeriod", e.target.value)
                      }
                    />
                  </td>

                  <td className="text-center">
                    <input
                      type="checkbox"
                      checked={ledger.checkDays}
                      onChange={(e) =>
                        handleChange(ledger.id, "checkDays", e.target.checked)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}

        <div className="border-top p-2 d-flex justify-content-between">
          <div>
            <button className="btn btn-secondary btn-sm me-2">Cancel</button>
          </div>

          <div>
            <button className="btn btn-success btn-sm">Save All</button>
          </div>
        </div>
      </div>
    </div>
  );
}