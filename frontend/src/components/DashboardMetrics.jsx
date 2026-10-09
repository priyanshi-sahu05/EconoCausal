
import { useMemo } from "react";
import modelResults from "../data/modelResults";
import allocationResults from "../data/allocationResults";

function DashboardMetrics() {
  const metrics = useMemo(() => {
    const positiveCustomers = modelResults.filter(
      (customer) => customer.ite > 0
    ).length;

    const selected = allocationResults.filter(
      (customer) => customer.selected
    );

    const estimatedSpend = selected.reduce(
      (total, customer) => total + customer.estimatedCost,
      0
    );

    return {
      totalCustomers: modelResults.length,
      positiveCustomers,
      selectedCustomers: selected.length,
      estimatedSpend,
    };
  }, []);

  const cards = [
    {
      title: "Total Customers",
      value: metrics.totalCustomers.toLocaleString("en-IN"),
      description: "Customers available for analysis",
    },
    {
      title: "Positive ITE",
      value: metrics.positiveCustomers.toLocaleString("en-IN"),
      description: "Customers with positive treatment effects",
    },
    {
      title: "Selected Customers",
      value: metrics.selectedCustomers.toLocaleString("en-IN"),
      description: "Selected in the sample allocation data",
    },
    {
      title: "Estimated Spend",
      value: `₹${metrics.estimatedSpend.toLocaleString("en-IN")}`,
      description: "Estimated sample allocation cost",
    },
  ];

  return (
    <div className="dashboard-metrics">
      {cards.map((card) => (
        <div className="metric-card" key={card.title}>
          <span>{card.title}</span>
          <strong>{card.value}</strong>
          <small>{card.description}</small>
        </div>
      ))}
    </div>
  );
}

export default DashboardMetrics;