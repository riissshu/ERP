import { useState } from "react";

export default function EmployeeCreation() {
  const [employee, setEmployee] = useState({
    employeeCode: "",
    firstName: "",
    lastName: "",
    gender: "Male",
    dob: "",
    mobile: "",
    email: "",
    department: "",
    designation: "",
    joiningDate: "",
    salary: "",
    address: "",
    city: "",
    state: "",
    pincode: "",

    aadhaar: "",
    pan: "",

    bankName: "",
    accountNo: "",
    ifsc: "",
    branch: "",

    photo: null,
    documents: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setEmployee({
        ...employee,
        [name]: checked,
      });
    } else if (type === "file") {
      setEmployee({
        ...employee,
        [name]: name === "documents" ? Array.from(files) : files[0],
      });
    } else {
      setEmployee({
        ...employee,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(employee);

    alert("Employee Saved Successfully!");
  };

  const handleReset = () => {
    setEmployee({
      employeeCode: "",
      firstName: "",
      lastName: "",
      gender: "Male",
      dob: "",
      mobile: "",
      email: "",
      department: "",
      designation: "",
      joiningDate: "",
      salary: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      aadhaar: "",
      pan: "",
      bankName: "",
      accountNo: "",
      ifsc: "",
      branch: "",
      photo: null,
      documents: [],

    });
  };

  return (
    <div className="container">

        <h2 className="pb-2 pt-2">Employee Creation</h2>
        
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Basic Information */}

            <h5 className="mb-3">Basic Information</h5>

            <div className="row">
              <div className="col-md-3 mb-3">
                <label className="form-label">Employee Code</label>
                <input
                  type="text"
                  className="form-control"
                  name="employeeCode"
                  value={employee.employeeCode}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={employee.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-5 mb-3">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={employee.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-3 mb-3">
                <label className="form-label">Gender</label>

                <select
                  className="form-select"
                  name="gender"
                  value={employee.gender}
                  onChange={handleChange}
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="col-md-3 mb-3">
                <label className="form-label">Date of Birth</label>

                <input
                  type="date"
                  className="form-control"
                  name="dob"
                  value={employee.dob}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-3 mb-3">
                <label className="form-label">Mobile</label>

                <input
                  type="text"
                  className="form-control"
                  name="mobile"
                  value={employee.mobile}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-3 mb-3">
                <label className="form-label">Email</label>

                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={employee.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <hr />

            {/* Employment */}

            <h5 className="mb-3">Employment Details</h5>

            <div className="row">
              <div className="col-md-3 mb-3">
                <label className="form-label">Department</label>

                <select
                  className="form-select"
                  name="department"
                  value={employee.department}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option>Accounts</option>
                  <option>Sales</option>
                  <option>Purchase</option>
                  <option>HR</option>
                  <option>Production</option>
                  <option>Store</option>
                </select>
              </div>

              <div className="col-md-3 mb-3">
                <label className="form-label">Designation</label>

                <input
                  type="text"
                  className="form-control"
                  name="designation"
                  value={employee.designation}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-3 mb-3">
                <label className="form-label">Joining Date</label>

                <input
                  type="date"
                  className="form-control"
                  name="joiningDate"
                  value={employee.joiningDate}
                  onChange={handleChange}
                />
              </div>

              {/* <div className="col-md-3 mb-3">
                <label className="form-label">Employment Type</label>

                <select
                  className="form-select"
                  name="employmentType"
                  value={employee.employmentType}
                  onChange={handleChange}
                >
                  <option>Full Time</option>
                  <option>Part Time</option>
                  <option>Contract</option>
                  <option>Intern</option>
                </select>
              </div> */}
            </div>

            <div className="row">
              <div className="col-md-3 mb-3">
                <label className="form-label">Monthly Salary</label>

                <input
                  type="number"
                  className="form-control"
                  name="salary"
                  value={employee.salary}
                  onChange={handleChange}
                />
              </div>
            </div>

            <hr />

            <h5 className="mb-3">Employee Details</h5>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Aadhaar Number</label>

                <input
                  type="text"
                  className="form-control"
                  name="aadhaar"
                  maxLength="12"
                  value={employee.aadhaar}
                  onChange={handleChange}
                  placeholder="123456789012"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">PAN Number</label>

                <input
                  type="text"
                  className="form-control"
                  name="pan"
                  value={employee.pan}
                  onChange={handleChange}
                  placeholder="ABCDE1234F"
                  style={{ textTransform: "uppercase" }}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Bank Name</label>

                <input
                  type="text"
                  className="form-control"
                  name="bankName"
                  value={employee.bankName}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Branch</label>

                <input
                  type="text"
                  className="form-control"
                  name="branch"
                  value={employee.branch}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Account Number</label>

                <input
                  type="text"
                  className="form-control"
                  name="accountNo"
                  value={employee.accountNo}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">IFSC Code</label>

                <input
                  type="text"
                  className="form-control"
                  name="ifsc"
                  value={employee.ifsc}
                  onChange={handleChange}
                  style={{ textTransform: "uppercase" }}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Upload Photo</label>

              <input
                type="file"
                className="form-control"
                name="photo"
                accept="image/*"
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Upload Documents</label>

              <input
                type="file"
                className="form-control"
                name="documents"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={handleChange}
              />

              <small className="text-muted">
                You can upload Aadhaar, PAN, Resume, Certificates, Appointment
                Letter, Experience Letter, etc.
              </small>
            </div>

            {employee.photo && (
              <div className="mb-3">
                <strong>Selected Photo:</strong>
                <br />
                {employee.photo.name}
              </div>
            )}

            {employee.documents.length > 0 && (
              <div className="mb-3">
                <strong>Uploaded Documents</strong>

                <ul className="mt-2">
                  {employee.documents.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}

            <hr />

            {/* Address */}

            <h5 className="mb-3">Address</h5>

            <div className="mb-3">
              <label className="form-label">Address</label>

              <textarea
                rows="3"
                className="form-control"
                name="address"
                value={employee.address}
                onChange={handleChange}
              />
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">City</label>

                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={employee.city}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">State</label>

                <input
                  type="text"
                  className="form-control"
                  name="state"
                  value={employee.state}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Pincode</label>

                <input
                  type="text"
                  className="form-control"
                  name="pincode"
                  value={employee.pincode}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row mb-5 me-5 justify-content-end gap-2">
              <button type="submit" className="btn btn-primary col-auto">
                Save Employee
              </button>

              <button
                type="button"
                className="btn btn-secondary col-auto me-5"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      
    </div>
  );
}
