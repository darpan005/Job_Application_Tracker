# Job Application Tracker - Project Documentation

## 1. Project Overview

The Job Application Tracker is a full-stack CRUD web application
designed to help users organize and manage their job applications in one
place. Users can add new applications, view saved records, update
application details, and delete applications.

The project was developed as part of an internship project assignment to
demonstrate frontend development, backend development, REST API
integration, database management, testing, version control, and
deployment.

## 2. Project Objective

The main objective of the project is to provide a simple and
user-friendly system for tracking job applications and their current
status.

The application helps users keep information such as company name, job
role, application status, applied date, application deadline, location,
and notes organized in one place.

## 3. Main Features

-   Create a new job application
-   View all saved job applications
-   Update existing application details
-   Delete applications with confirmation
-   Search applications
-   Filter applications by status
-   Sort application records
-   Track application deadlines
-   View dashboard statistics
-   Switch between light mode and dark mode
-   Responsive interface for different screen sizes

## 4. CRUD Operations

### Create

Users can enter job application details through the frontend form. The
information is sent to the backend API and stored in PostgreSQL.

### Read

The frontend requests application records from the backend and displays
them in the application table.

### Update

Users can select an existing application, modify its information, and
save the updated data.

### Delete

Users can delete an application after confirming the delete action.

## 5. Technology Stack

### Frontend

-   React
-   Vite
-   JavaScript
-   HTML
-   CSS

### Backend

-   Node.js
-   Express.js

### Database

-   PostgreSQL

### Version Control and Collaboration

-   Git
-   GitHub

### Deployment

-   Vercel for the frontend
-   Render for the backend
-   Render PostgreSQL for the cloud database

## 6. Application Architecture

The application follows a full-stack client-server architecture.

User -\> React Frontend -\> REST API -\> Node.js/Express Backend -\>
PostgreSQL Database

The frontend is responsible for the user interface and user
interactions. The backend receives HTTP requests, performs database
operations, and returns responses to the frontend.

## 7. Main Data Fields

Each job application can contain the following information:

-   ID
-   Company Name
-   Job Role
-   Status
-   Applied Date
-   Application Deadline
-   Location
-   Notes

## 8. Backend API Operations

The backend provides REST API endpoints for the main CRUD operations.

-   GET /applications - Retrieve all applications
-   POST /applications - Create a new application
-   PUT /applications/:id - Update an existing application
-   DELETE /applications/:id - Delete an application

## 9. Local Development

During local development, the frontend and backend can be run
separately.

### Frontend

Run the React development server using:

    npm run dev

### Backend

Run the Node.js backend using:

    node server.js

During development, the frontend communicates with the backend through
HTTP API requests.

## 10. Database Integration

PostgreSQL is used to store job application records permanently.

The backend uses the PostgreSQL connection to execute database queries
for Create, Read, Update, and Delete operations.

For production deployment, the database was moved to an online
PostgreSQL database hosted on Render.

## 11. GitHub Collaboration

GitHub is used for source code management and team collaboration.

The collaboration workflow is:

1.  Pull or clone the latest project code.
2.  Work on an assigned task.
3.  Test the changes.
4.  Commit the changes with a meaningful commit message.
5.  Push the changes to GitHub.
6.  Review and test the integrated project.

This workflow helps team members work on the same project while
maintaining a history of project changes.

## 12. Deployment

The application is deployed using separate services for the frontend and
backend.

### Frontend Deployment

The React frontend is deployed on Vercel.

### Backend Deployment

The Node.js and Express backend is deployed on Render.

### Database Deployment

The PostgreSQL database is hosted on Render.

The final production architecture is:

User -\> Vercel Frontend -\> Render Backend -\> Render PostgreSQL
Database

This allows the application to work online without requiring the local
development servers to be running.

## 13. Testing

The following areas were tested:

-   Create operation
-   Read operation
-   Update operation
-   Delete operation
-   Search functionality
-   Status filtering
-   Sorting
-   Dashboard statistics
-   Application deadlines
-   Dark mode
-   Delete confirmation
-   Frontend-backend API connection
-   PostgreSQL database connection
-   Live deployed application
-   Basic cross-device responsiveness

More detailed testing information is available in the TESTING.md file.

## 14. Project Workflow

The overall project workflow is:

Planning -\> Task Division -\> Local Development -\> GitHub
Collaboration -\> Integration -\> CRUD Testing -\> Bug Fixing -\> Cloud
Database Setup -\> Backend Deployment -\> Frontend Deployment -\> Final
Testing

## 15. Future Improvements

The project can be improved further by adding:

-   User authentication and individual accounts
-   Email or browser deadline reminders
-   More application status options
-   Resume and document upload support
-   Advanced dashboard charts
-   Automated frontend and backend testing
-   Pagination for large numbers of applications
-   Improved accessibility

## 16. Conclusion

The Job Application Tracker demonstrates the complete development flow
of a full-stack CRUD application. It combines a React frontend, Node.js
and Express backend, PostgreSQL database, REST APIs, GitHub version
control, cloud database hosting, and production deployment.

The final application allows users to manage job applications through a
simple interface while demonstrating practical full-stack development
concepts.
