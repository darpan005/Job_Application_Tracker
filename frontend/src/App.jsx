import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const emptyForm = {
    company_name: "",
    job_role: "",
    status: "Applied",
    applied_date: "",
    application_deadline: "",
    location: "",
    notes: "",
  };

  const [applications, setApplications] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editId, setEditId] = useState(null);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const [deleteId, setDeleteId] = useState(null);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // DARK MODE
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // READ
  const fetchApplications = async () => {
    try {
      const response = await fetch("http://localhost:5000/applications");
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // CREATE OR UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = editId
        ? `http://localhost:5000/applications/${editId}`
        : "http://localhost:5000/applications";

      const method = editId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save application");
      }

      setFormData(emptyForm);
      setEditId(null);

      await fetchApplications();
    } catch (error) {
      console.error("Error saving application:", error);
    }
  };

  // EDIT
  const handleEdit = (application) => {
    setEditId(application.id);

    setFormData({
      company_name: application.company_name,
      job_role: application.job_role,
      status: application.status,

      applied_date: application.applied_date
        ? application.applied_date.split("T")[0]
        : "",

      application_deadline: application.application_deadline
        ? application.application_deadline.split("T")[0]
        : "",

      location: application.location || "",
      notes: application.notes || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // CANCEL EDIT
  const handleCancelEdit = () => {
    setEditId(null);
    setFormData(emptyForm);
  };

  // OPEN DELETE MODAL
  const handleDeleteClick = (id) => {
    setDeleteId(id);
  };

  // CONFIRM DELETE
  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/applications/${deleteId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete application");
      }

      setDeleteId(null);

      await fetchApplications();
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  // STATISTICS
  const totalApplications = applications.length;

  const appliedCount = applications.filter(
    (application) => application.status === "Applied"
  ).length;

  const interviewCount = applications.filter(
    (application) => application.status === "Interview"
  ).length;

  const selectedCount = applications.filter(
    (application) => application.status === "Selected"
  ).length;

  const rejectedCount = applications.filter(
    (application) => application.status === "Rejected"
  ).length;

  // SEARCH + FILTER
  const filteredApplications = applications.filter((application) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      application.company_name.toLowerCase().includes(searchText) ||
      application.job_role.toLowerCase().includes(searchText) ||
      (application.location || "").toLowerCase().includes(searchText);

    const matchesStatus =
      filterStatus === "All" || application.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // SORT
  const sortedApplications = [...filteredApplications].sort((a, b) => {
    if (sortBy === "newest") {
      return b.id - a.id;
    }

    if (sortBy === "oldest") {
      return a.id - b.id;
    }

    if (sortBy === "company") {
      return a.company_name.localeCompare(b.company_name);
    }

    if (sortBy === "deadline") {
      if (!a.application_deadline) return 1;
      if (!b.application_deadline) return -1;

      return (
        new Date(a.application_deadline) -
        new Date(b.application_deadline)
      );
    }

    return 0;
  });

  // FORMAT DATE
  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="app">
      {/* HEADER */}

      <header className="header">
        <div>
          <h1>Job Application Tracker</h1>
          <p>Track and manage your job applications in one place.</p>
        </div>

        <button
          className="theme-toggle"
          type="button"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      {/* DASHBOARD */}

      <section className="stats-grid">
        <div className="stat-card">
          <span>Total Applications</span>
          <h2>{totalApplications}</h2>
        </div>

        <div className="stat-card applied-card">
          <span>Applied</span>
          <h2>{appliedCount}</h2>
        </div>

        <div className="stat-card interview-card">
          <span>Interviews</span>
          <h2>{interviewCount}</h2>
        </div>

        <div className="stat-card selected-card">
          <span>Selected</span>
          <h2>{selectedCount}</h2>
        </div>

        <div className="stat-card rejected-card">
          <span>Rejected</span>
          <h2>{rejectedCount}</h2>
        </div>
      </section>

      {/* APPLICATION FORM */}

      <section className="form-container">
        <div className="section-heading">
          <h2>
            {editId ? "Update Application" : "Add New Application"}
          </h2>

          <p>
            {editId
              ? "Update the details of your job application."
              : "Enter the details of a new job application."}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Company Name</label>

            <input
              type="text"
              name="company_name"
              placeholder="Example: Google"
              value={formData.company_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Job Role</label>

            <input
              type="text"
              name="job_role"
              placeholder="Example: Frontend Developer"
              value={formData.job_role}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Status</label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="form-group">
            <label>Applied Date</label>

            <input
              type="date"
              name="applied_date"
              value={formData.applied_date}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Application Deadline</label>

            <input
              type="date"
              name="application_deadline"
              value={formData.application_deadline}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Location</label>

            <input
              type="text"
              name="location"
              placeholder="Example: Ahmedabad"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className="form-group notes-group">
            <label>Notes</label>

            <textarea
              name="notes"
              placeholder="Add any important notes..."
              value={formData.notes}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button className="primary-button" type="submit">
              {editId ? "Update Application" : "Add Application"}
            </button>

            {editId && (
              <button
                className="cancel-button"
                type="button"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      {/* APPLICATION LIST */}

      <section className="applications-container">
        <div className="applications-header">
          <div>
            <h2>My Applications</h2>
            <p>View and manage all your job applications.</p>
          </div>

          <div className="filters">
            <input
              type="text"
              placeholder="Search company, role or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="company">Company A-Z</option>
              <option value="deadline">Deadline</option>
            </select>
          </div>
        </div>

        {sortedApplications.length === 0 ? (
          <div className="empty-state">
            <h3>No applications found</h3>
            <p>Add a new application or change your search filters.</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Job Role</th>
                  <th>Status</th>
                  <th>Applied Date</th>
                  <th>Deadline</th>
                  <th>Location</th>
                  <th>Notes</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {sortedApplications.map((application) => (
                  <tr key={application.id}>
                    <td className="company-name">
                      {application.company_name}
                    </td>

                    <td>{application.job_role}</td>

                    <td>
                      <span
                        className={`status-badge ${application.status.toLowerCase()}`}
                      >
                        {application.status}
                      </span>
                    </td>

                    <td>{formatDate(application.applied_date)}</td>

                    <td>
                      <span className="deadline">
                        {formatDate(application.application_deadline)}
                      </span>
                    </td>

                    <td>{application.location || "-"}</td>

                    <td className="notes-cell">
                      {application.notes || "-"}
                    </td>

                    <td>
                      <div className="action-buttons">
                        <button
                          className="edit-button"
                          type="button"
                          onClick={() => handleEdit(application)}
                        >
                          Edit
                        </button>

                        <button
                          className="delete-button"
                          type="button"
                          onClick={() =>
                            handleDeleteClick(application.id)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <footer>
        <p>Job Application Tracker</p>
      </footer>

      {/* DELETE CONFIRMATION MODAL */}

      {deleteId !== null && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <div className="modal-icon">⚠️</div>

            <h2>Delete Application?</h2>

            <p>
              Are you sure you want to delete this job application?
              This action cannot be undone.
            </p>

            <div className="modal-actions">
              <button
                className="modal-cancel"
                type="button"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>

              <button
                className="modal-delete"
                type="button"
                onClick={confirmDelete}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;