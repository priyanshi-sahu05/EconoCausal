# EconoCausal Dashboard

## 1. Project Overview

EconoCausal is a causal marketing optimization project.

The dashboard helps users analyze customer treatment effects, visualize causal model results, set marketing budgets, and review customer-level marketing recommendations.

## 2. Technologies

### Frontend

- React
- Vite
- JavaScript
- CSS
- Plotly.js

### Backend

- Python
- FastAPI

### Tools

- VS Code
- Git
- GitHub

## 3. Dashboard Features

The dashboard contains the following sections:

- Dashboard
- Data Upload
- Budget Input
- Visualizations
- Allocation Matrix

## 4. Customer Analysis

The dashboard uses Individual Treatment Effect (ITE) values to analyze customer responses.

Users can filter customers based on:

- Minimum ITE
- Positive ITE
- Negative ITE
- All customers

## 5. Visualizations

The Visualizations page contains:

- Qini Curve
- Uplift Curve
- Causal model metrics

These visualizations help understand the performance of the causal marketing model.

## 6. Budget Input

Users can enter:

- Total marketing budget
- Number of campaigns

These values represent the marketing constraints used for planning.

## 7. Allocation Matrix

The Allocation Matrix displays customer-level recommendations.

It includes:

- Customer ID
- ITE
- Recommended Discount
- Estimated Cost
- Eligibility
- Selection

Users can search customers, filter eligible customers, select customers, and update discounts.

## 8. Prescription Summary

The Prescription Summary displays:

- Selected customers
- Estimated spending
- Average discount
- Average ITE
- Discount distribution

It provides a simple summary of the current customer allocation.

## 9. Backend Integration

The frontend communicates with the FastAPI backend through:

`src/utils/api.js`

The API base URL is configured using:

`VITE_API_BASE_URL`

The frontend also checks the backend health using the `/health` endpoint.

## 10. Error Handling

If backend data is unavailable, the frontend displays sample data as a fallback.

This allows the dashboard to continue working during development and testing.

## 11. Current Backend Limitation

During integration testing, the frontend requested:

`GET /allocation`

The backend returned:

`404 Not Found`

This means that the allocation endpoint is not currently available in the backend.

The frontend therefore uses sample allocation data when the endpoint is unavailable.

The actual backend allocation endpoint can be connected when it is provided by the backend team.

## 12. Project Status

The following frontend features are completed:

- Dashboard
- Navigation
- Data Upload interface
- Budget Input
- Qini visualization
- Uplift visualization
- ITE filtering
- Allocation Matrix
- Prescription Summary
- Backend status
- Fallback handling
- Dashboard documentation

The frontend is ready for final review and demonstration.

## 13. Future Improvements

Future improvements can include:

- Connect the real allocation API
- Connect real model predictions
- Apply the actual marketing budget optimizer
- Add real customer datasets
- Improve allocation recommendations
- Add additional causal model metrics

## 14. Conclusion

The EconoCausal dashboard provides a simple interface for analyzing causal marketing results and reviewing customer-level marketing recommendations.

The frontend is structured for integration with the FastAPI backend and is ready for final review.