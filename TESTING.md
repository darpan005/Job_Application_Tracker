# Job Application Tracker - Testing Documentation

## Purpose

This document records the main tests performed on the Job Application
Tracker to verify that the frontend, backend, database, and deployed
application work correctly together.

## Test Environment

-   Frontend: React with Vite
-   Backend: Node.js and Express
-   Database: PostgreSQL
-   Backend and Database Hosting: Render
-   Frontend Hosting: Vercel
-   Version Control and Collaboration: GitHub

## CRUD Testing

### 1. Create Application

**Test:** Enter valid job application details and click the Add
Application button.

**Expected Result:** The new application should be saved in PostgreSQL
and displayed in the application list.

**Status:** Passed

### 2. Read Applications

**Test:** Open or refresh the application.

**Expected Result:** Saved job applications should be fetched from the
backend API and displayed correctly.

**Status:** Passed

### 3. Update Application

**Test:** Select an existing application, change its details, and save
the changes.

**Expected Result:** The updated information should be saved in the
database and reflected in the interface.

**Status:** Passed

### 4. Delete Application

**Test:** Delete an existing job application and confirm the deletion.

**Expected Result:** The application should be removed from the database
and interface.

**Status:** Passed

## Additional Feature Testing

-   **Search:** Verified that application records can be searched.
-   **Status Filter:** Verified filtering according to application
    status.
-   **Sorting:** Verified the available sorting options.
-   **Dashboard Statistics:** Verified that application counts update
    correctly.
-   **Application Deadline:** Verified that deadline information can be
    stored and displayed.
-   **Dark Mode:** Verified switching between display modes.
-   **Delete Confirmation:** Verified confirmation before permanent
    deletion.

## API and Database Testing

The frontend was tested with the Node.js/Express REST API. CRUD
operations were checked to confirm that data was correctly created,
retrieved, updated, and deleted in PostgreSQL.

**Application flow:**

User -\> React Frontend -\> Express REST API -\> PostgreSQL Database

## Deployment Testing

After local testing, the backend and PostgreSQL database were connected
through Render, and the React frontend was deployed on Vercel.

**Production flow:**

User -\> Vercel Frontend -\> Render Backend -\> Render PostgreSQL
Database

The deployed application was tested to confirm that it could fetch and
modify database records without requiring the local backend server to be
running.

## Cross-Device Testing

The live application was opened on different devices to check
accessibility and basic responsive behavior.

## Final Result

The main CRUD operations, additional features, backend API connection,
PostgreSQL database connection, and deployed application were tested
successfully.

## Future Testing Improvements

-   Add automated API tests.
-   Add React component tests.
-   Test more invalid form inputs and edge cases.
-   Improve accessibility testing.
-   Perform broader browser compatibility testing.
