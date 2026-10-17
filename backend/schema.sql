CREATE TABLE IF NOT EXISTS applications (
  id SERIAL PRIMARY KEY,
  company_name TEXT NOT NULL,
  job_role TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Applied',
  applied_date DATE,
  application_deadline DATE,
  location TEXT,
  notes TEXT
);
