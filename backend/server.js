const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Job Application Tracker Backend is running!");
});

// CREATE
app.post("/applications", async (req, res) => {
  try {
    const {
      company_name,
      job_role,
      status,
      applied_date,
      application_deadline,
      location,
      notes,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO applications
      (
        company_name,
        job_role,
        status,
        applied_date,
        application_deadline,
        location,
        notes
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [
        company_name,
        job_role,
        status,
        applied_date || null,
        application_deadline || null,
        location,
        notes,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to add application",
    });
  }
});

// READ
app.get("/applications", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM applications ORDER BY id ASC"
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch applications",
    });
  }
});

// UPDATE
app.put("/applications/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      company_name,
      job_role,
      status,
      applied_date,
      application_deadline,
      location,
      notes,
    } = req.body;

    const result = await pool.query(
      `UPDATE applications
       SET company_name = $1,
           job_role = $2,
           status = $3,
           applied_date = $4,
           application_deadline = $5,
           location = $6,
           notes = $7
       WHERE id = $8
       RETURNING *`,
      [
        company_name,
        job_role,
        status,
        applied_date || null,
        application_deadline || null,
        location,
        notes,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Application not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to update application",
    });
  }
});

// DELETE
app.delete("/applications/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM applications WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Application not found",
      });
    }

    res.json({
      message: "Application deleted successfully",
      application: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to delete application",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});