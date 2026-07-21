import React, { useEffect, useState } from "react";

const employeeList = [
  { id: 1, name: "Rahul Kumar" },
  { id: 2, name: "Amit Singh" },
  { id: 3, name: "Neha Sharma" },
  { id: 4, name: "Priya Verma" },
  { id: 5, name: "Rakesh Gupta" },
];

export default function AttendanceSheet() {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const attendanceData = employeeList.map((employee) => ({
      ...employee,
      status: "Present",
    }));

    setEmployees(attendanceData);
  }, []);

  const toggleAttendance = (id) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id
          ? {
              ...emp,
              status: emp.status === "Present" ? "Absent" : "Present",
            }
          : emp
      )
    );
  };

  const markAllPresent = () => {
    setEmployees((prev) =>
      prev.map((emp) => ({
        ...emp,
        status: "Present",
      }))
    );
  };

  const presentCount = employees.filter(
    (emp) => emp.status === "Present"
  ).length;

  const absentCount = employees.filter(
    (emp) => emp.status === "Absent"
  ).length;

  const saveAttendance = () => {
    const payload = {
      date,
      attendance: employees,
    };

    console.log(payload);
    alert("Attendance Voucher Saved Successfully");
  };

  return (
    <div className="container">

      <h2 className="pb-2 pt-2">Attendance Voucher</h2>

        <div className="card-body">

          <div className="row-mb-3">

            <div className="col-md-3">

              <label>Date</label>
              <input
                type="date"
                className="form-control mb-3"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div> 

          </div>

          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th width="200">Employee Name</th>
                <th width="180">Attendance</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.name}</td>

                  <td>
                    <button
                      className={`btn ${
                        emp.status === "Present"
                          ? "btn-success"
                          : "btn-danger"
                      }`}
                      onClick={() => toggleAttendance(emp.id)}
                    >
                      {emp.status}
                    </button>
                  </td>
                </tr>
              ))}

              {employees.length === 0 && (
                <tr>
                  <td colSpan="2" className="text-center">
                    No Employees Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <strong>Total:</strong> {employees.length} &nbsp;&nbsp;
              <strong className="text-success">
                Present: {presentCount}
              </strong>
              &nbsp;&nbsp;
              <strong className="text-danger">
                Absent: {absentCount}
              </strong>
            </div>

            <button
            className="btn"
            style={{
                    background: "green",
                    color: "#fff",
                  }}
            onClick={saveAttendance}
            >
            Save Voucher
            </button>

          </div>
          
          <button
              className="btn btn-primary"
              onClick={markAllPresent}
            >
              Mark All Present
          </button>

        </div>
        
      </div>
  );
}


