# Causal Marketing Optimizer - Dashboard Architecture

## 1. Project Overview

The Causal Marketing Optimizer is a web-based dashboard designed to support causal marketing analysis and budget optimization.

The frontend provides the user interface for:

* Uploading historical campaign data
* Entering marketing budget constraints
* Viewing the current optimization workflow
* Navigating between different sections of the application

The frontend is developed using React and Vite. Backend integration with the causal ML model will be added in the later stages of the project.

---

## 2. Frontend Technology

The dashboard uses the following technologies:

* React
* Vite
* JavaScript
* React Router
* CSS
* HTML

---

## 3. Project Structure

```text
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── Sidebar.jsx
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── DataUpload.jsx
│   │   └── BudgetInput.jsx
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── package.json
├── package-lock.json
├── vite.config.js
├── index.html
└── DASHBOARD_ARCHITECTURE.md
```

---

## 4. Application Architecture

The frontend follows a component-based React architecture.

```text
                    Causal Marketing Optimizer
                              |
                    ----------------------
                    |                    |
                 Navbar                Sidebar
                                         |
                              ----------------------
                              |         |            |
                          Dashboard   Data Upload   Budget Input
                              |
                     Future Backend Integration
                              |
                    Causal ML + Optimization
```

The interface is divided into reusable components and separate pages.

---

## 5. Navbar Component

**File:**

```text
src/components/Navbar.jsx
```

The Navbar provides the main application heading and identifies the current frontend module.

It displays:

* Causal Marketing Optimizer
* Causal ML + Budget Optimization
* Member 2 - Frontend

---

## 6. Sidebar Component

**File:**

```text
src/components/Sidebar.jsx
```

The Sidebar provides navigation between the main dashboard pages.

Available navigation options:

* Dashboard
* Data Upload
* Budget Input

React Router is used to navigate between these pages.

---

## 7. Dashboard Page

**File:**

```text
src/pages/Dashboard.jsx
```

The Dashboard provides an overview of the application.

It contains:

### Dashboard Status

Displays the current frontend development status.

Current status:

```text
Ready
```

### Historical Campaign Data

Provides access to the historical campaign data upload interface.

### Budget Constraints

Provides access to the marketing budget input interface.

The Dashboard acts as the main entry point of the application.

---

## 8. Data Upload Page

**File:**

```text
src/pages/DataUpload.jsx
```

The Data Upload page provides an interface for selecting historical campaign data.

Current functionality includes:

* CSV file selection
* File validation
* Display of selected file information
* File removal
* Upload-ready status
* Dataset field information

The selected data will later be connected to the backend causal ML pipeline.

---

## 9. Budget Input Page

**File:**

```text
src/pages/BudgetInput.jsx
```

The Budget Input page allows users to define marketing budget constraints.

The interface includes:

* Total marketing budget
* Minimum campaign budget
* Maximum campaign budget

Validation is applied to ensure that:

* Required fields are entered
* Budget values are greater than zero where required
* Minimum budget does not exceed maximum budget
* Maximum campaign budget does not exceed the total budget

These constraints will later be passed to the optimization engine.

---

## 10. Routing

The application uses React Router for page navigation.

The main routes are:

```text
/          → Dashboard
/upload    → Data Upload
/budget    → Budget Input
```

The routing structure allows additional pages and visualization components to be added in future development stages.

---

## 11. Styling

**File:**

```text
src/index.css
```

The application uses a centralized CSS file for styling.

The stylesheet provides:

* Dashboard layout
* Navbar styling
* Sidebar styling
* Cards
* Forms
* Buttons
* Input fields
* Status indicators
* Upload interface
* Responsive layout elements

---

## 12. Current Frontend Workflow

The current workflow is:

```text
User
 |
 v
Dashboard
 |
 +--------------------+
 |                    |
 v                    v
Data Upload       Budget Input
 |                    |
 v                    v
Historical         Budget
Campaign Data      Constraints
 |
 +--------------------+
          |
          v
 Future Backend Integration
          |
          v
 Causal ML + Optimization
```

---

## 13. Current Features

The frontend currently provides:

* React dashboard
* Application navigation
* Dashboard overview
* Historical campaign data upload interface
* CSV file validation
* Budget constraint form
* Budget validation
* Responsive UI structure
* Production build verification

---

## 14. Future Integration

The frontend will be extended in the upcoming development stages.

Planned functionality includes:

### Causal ML Results

The dashboard will display results generated by the causal ML model.

### Uplift Visualization

Plotly.js will be integrated to display:

* Qini curves
* Uplift curves
* Random rollout baseline

### ITE Visualization

Individual Treatment Effect scores will be loaded and displayed using interactive visualizations.

### Optimization Results

The frontend will display optimized marketing allocations based on:

* Predicted treatment effects
* Marketing budget constraints
* Campaign information

### Prescription Table

A final prescription table will display the recommended allocation and personalized discount information generated by the optimization engine.

### Backend Integration

The React frontend will communicate with the backend API to receive:

* Uploaded dataset results
* Causal model results
* ITE scores
* Uplift metrics
* Optimization results
* Prescription data

---

## 15. Current Development Status

As of 19 September 2026, the initial dashboard scaffold is complete.

Completed:

* React application initialization
* Frontend project structure
* Dashboard page
* Data Upload page
* Budget Input page
* Navbar
* Sidebar
* React Router navigation
* Upload validation
* Budget validation
* Dashboard testing
* Production build verification

The frontend is ready for the next stage of development and backend integration.

---

