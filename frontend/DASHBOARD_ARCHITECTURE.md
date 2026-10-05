# EconoCausal – Dashboard Documentation

## 1. Project Overview

EconoCausal is a causal marketing optimization project. The dashboard helps users understand the effect of marketing campaigns and identify customers who may benefit from different marketing actions.

The frontend is developed using React and Vite. The backend uses FastAPI to provide data and model results.

## 2. Dashboard

The dashboard provides different sections for:

* Data Upload
* Budget Input
* Visualizations
* ITE Filtering
* Allocation Matrix
* Prescription Summary

The sidebar is used to navigate between these sections.

## 3. Frontend Structure

The main frontend folders are:

```text
src/
├── components/
│   ├── charts/
│   │   ├── QiniChart.jsx
│   │   └── UpliftChart.jsx
│   ├── ITEFilter.jsx
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── PrescriptionSummary.jsx
│   └── BackendStatus.jsx
│
├── data/
│   ├── modelResults.js
│   └── allocationResults.js
│
├── pages/
│   ├── Dashboard.jsx
│   ├── DataUpload.jsx
│   ├── BudgetInput.jsx
│   ├── Visualizations.jsx
│   └── AllocationMatrix.jsx
│
└── utils/
    ├── api.js
    ├── causalMetrics.js
    └── chartData.js
```

## 4. Data Upload

The Data Upload page allows the user to upload the required marketing/customer dataset.

The uploaded data can be used as input for further analysis and model processing.

## 5. Budget Input

The Budget Input page allows the user to enter:

* Total marketing budget
* Number of campaigns

These values are used as marketing budget constraints.

## 6. Visualizations

The Visualizations page displays causal marketing results.

It contains:

* Qini Curve
* Uplift Curve
* Model performance information

The charts help the user understand the performance of the causal model.

## 7. ITE Filtering

ITE means Individual Treatment Effect.

The ITE filter allows users to filter customers based on their estimated treatment effect.

The dashboard supports:

* Minimum ITE filtering
* Positive ITE customers
* Negative ITE customers
* All customers

Positive ITE values indicate customers who may have a positive response to the treatment.

## 8. Allocation Matrix

The Allocation Matrix displays customer-level recommendations.

It contains information such as:

* Customer ID
* ITE
* Recommended Discount
* Estimated Cost
* Eligibility
* Selection status

Users can search for customers, filter eligible customers, select customers, and modify the recommended discount.

## 9. Prescription Summary

The Prescription Summary provides a simple overview of the selected customers.

It shows:

* Number of selected customers
* Estimated spending
* Average discount
* Average ITE
* Discount distribution

This helps users understand the current marketing allocation.

## 10. Backend Integration

The React frontend communicates with the FastAPI backend using API functions in:

```text
src/utils/api.js
```

The frontend checks the backend health and requests model or allocation data when available.

The backend URL is configured using:

```text
VITE_API_BASE_URL
```

## 11. Backend Status

The dashboard shows the current backend connection status.

There are three possible states:

* Connecting to backend
* Backend Connected
* Backend Unavailable

If backend data is not available, the dashboard can display sample data instead.

## 12. Error Handling

The frontend has fallback handling for backend failures.

For example, if the allocation API is unavailable, the Allocation Matrix displays sample data instead of leaving the page empty.

This allows the dashboard to remain usable during development and testing.

## 13. Current Limitation

The frontend is ready to receive allocation results from the backend.

During testing, the `/allocation` API endpoint returned:

```text
404 Not Found
```

Therefore, the dashboard currently uses sample allocation data when the backend allocation endpoint is unavailable.

The actual backend allocation endpoint needs to be connected for final integration.

## 14. Technologies Used

### Frontend

* React
* Vite
* JavaScript
* CSS
* Plotly.js

### Backend

* Python
* FastAPI

### Development Tools

* VS Code
* Git
* GitHub

## 15. Conclusion

The EconoCausal dashboard provides a simple interface for viewing causal marketing results, filtering customers using ITE values, and reviewing marketing allocation recommendations.

The frontend structure and backend integration are prepared for final testing and integration with the causal ML backend.
