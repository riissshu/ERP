import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CreditPolicySetForm() {
  const [group, setGroup] = useState("Sundry Creditors");

const groups = [
  "Sundry Creditors",
  "Sundry Debtors",
];

  const [ledgers, setLedgers] = useState([
    {
      id: 1,
      name: "3F Industries Limited",
      creditLimit: "",
      creditPeriod: "",
      checkDays: true,
    },
    {
      id: 2,
      name: "3F Industries Ltd",
      creditLimit: "",
      creditPeriod: "",
      checkDays: false,
    },
    {
      id: 3,
      name: "AITS Express, Chennai",
      creditLimit: "",
      creditPeriod: "",
      checkDays: false,
    },
    {
      id: 4,
      name: "Akhil Enterprises, Delhi",
      creditLimit: "",
      creditPeriod: "",
      checkDays: true,
    },
    {
      id: 5,
      name: "Amar Industries",
      creditLimit: "",
      creditPeriod: "",
      checkDays: false,
    },
    {
      id: 6,
      name: "Balajee Exchem Pvt Ltd",
      creditLimit: "",
      creditPeriod: "",
      checkDays: true,
    },
    {
      id: 7,
      name: "Durga Plastic Industries",
      creditLimit: "",
      creditPeriod: "",
      checkDays: false,
    },
  ]);

  const [search, setSearch] = useState("");

  const handleChange = (index, field, value) => {
    const data = [...ledgers];
    data[index][field] = value;
    setLedgers(data);
  };

  const filtered = ledgers.filter((x) =>
    x.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="container-fluid mt-3">
      <div className="border">
        {/* Header */}

        <div className="bg-primary text-white px-3 py-2 d-flex justify-content-between">
          <strong>Multi Ledger Credit Limit</strong>

          <div>
            <strong>R.M IMPEX</strong>
          </div>
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

          <div className="col-md-4 text-end">
            <strong>FY :</strong> 2026-27
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
                    <input
                      type="number"
                      className="form-control form-control-sm text-end"
                      value={ledger.creditLimit}
                      onChange={(e) =>
                        handleChange(index, "creditLimit", e.target.value)
                      }
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      className="form-control form-control-sm text-center"
                      value={ledger.creditPeriod}
                      onChange={(e) =>
                        handleChange(index, "creditPeriod", e.target.value)
                      }
                    />
                  </td>

                  <td className="text-center">
                    <input
                      type="checkbox"
                      checked={ledger.checkDays}
                      onChange={(e) =>
                        handleChange(index, "checkDays", e.target.checked)
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
