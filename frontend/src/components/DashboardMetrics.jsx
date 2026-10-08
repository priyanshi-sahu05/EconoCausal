import { useMemo } from "react";
import modelResults from "../data/modelResults";
import allocationResults from "../data/allocationResults";

function DashboardMetrics() {
  const metrics = useMemo(() => {
    const totalCustomers = modelResults.length;

    const positiveCustomers = modelResults.filter(
      (customer) => customer.ite > 0
    ).length;

    const selectedCustomers = allocationResults.filter(
      (customer) => customer.selected
    ).length;

    const estimatedSpend = allocationResults
      .filter((customer) => customer.selected)
      .reduce(
        (total, customer) => total + customer.estimatedCost,
        0
      );

    return {
      totalCustomers,
      positiveCustomers,
      selectedCustomers,
      estimatedSpend,
    };
  }, []);

  return (
    <div className="dashboard-metrics">
      <div className="metric-card">
        <span>Total Customers</span>
        <strong>{metrics.totalCustomers.toLocaleString()}</strong>
        <small>Available for analysis</small>
      </div>

      <div className="metric-card">
        <span>Positive ITE</span>
        <strong>{metrics.positiveCustomers.toLocaleString()}</strong>
        <small>Customers with positive treatment effect</small>
      </div>

      <div className="metric-card">
        <span>Selected Customers</span>
        <strong>{metrics.selectedCustomers.toLocaleString()}</strong>
        <small>Current allocation</small>
      </div>

      <div className="metric-card">
        <span>Estimated Spend</span>
        <strong>₹{metrics.estimatedSpend.toLocaleString()}</strong>
        <small>Current allocation cost</small>
      </div>
    </div>
  );
}

export default DashboardMetrics;