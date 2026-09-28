import { useMemo, useState } from "react";
import allocationResults from "../data/allocationResults";

function AllocationMatrix() {
  const [searchTerm, setSearchTerm] = useState("");
  const [eligibilityFilter, setEligibilityFilter] = useState("all");

  const filteredResults = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return allocationResults.filter((customer) => {
      const matchesSearch = customer.customerId
        .toLowerCase()
        .includes(normalizedSearch);

      let matchesEligibility = true;

      if (eligibilityFilter === "eligible") {
        matchesEligibility = customer.eligible;
      }

      if (eligibilityFilter === "ineligible") {
        matchesEligibility = !customer.eligible;
      }

      return matchesSearch && matchesEligibility;
    });
  }, [searchTerm, eligibilityFilter]);

  const summary = useMemo(() => {
    const eligibleCustomers = allocationResults.filter(
      (customer) => customer.eligible
    );

    const totalEstimatedCost = eligibleCustomers.reduce(
      (total, customer) => total + customer.estimatedCost,
      0
    );

    const totalDiscount = eligibleCustomers.reduce(
      (total, customer) => total + customer.recommendedDiscount,
      0
    );

    return {
      totalCustomers: allocationResults.length,
      eligibleCustomers: eligibleCustomers.length,
      totalEstimatedCost,
      totalDiscount
    };
  }, []);

  const formatAmount = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2
    }).format(value);

  return (
    <div className="allocation-page">
      <div className="page-header">
        <h1>Allocation Matrix</h1>
        <p>
          Review customer eligibility and illustrative
          marketing allocation recommendations.
        </p>
      </div>

      <div className="allocation-summary">
        <div className="allocation-summary-card">
          <span>Total Customers</span>
          <strong>
            {summary.totalCustomers.toLocaleString()}
          </strong>
        </div>

        <div className="allocation-summary-card">
          <span>Eligible Customers</span>
          <strong>
            {summary.eligibleCustomers.toLocaleString()}
          </strong>
        </div>

        <div className="allocation-summary-card">
          <span>Estimated Allocation Cost</span>
          <strong>
            {formatAmount(summary.totalEstimatedCost)}
          </strong>
        </div>

        <div className="allocation-summary-card">
          <span>Total Discount Units</span>
          <strong>
            {summary.totalDiscount.toLocaleString()}
          </strong>
        </div>
      </div>

      <div className="allocation-table-card">
        <div className="allocation-table-header">
          <div>
            <h2>Customer Allocation Details</h2>
            <p>
              Search customers and filter by eligibility.
            </p>
          </div>

          <div className="allocation-filters">
            <input
              type="search"
              placeholder="Search customer ID..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              aria-label="Search customer ID"
            />

            <select
              value={eligibilityFilter}
              onChange={(event) =>
                setEligibilityFilter(event.target.value)
              }
              aria-label="Filter customer eligibility"
            >
              <option value="all">All Customers</option>
              <option value="eligible">Eligible</option>
              <option value="ineligible">Ineligible</option>
            </select>
          </div>
        </div>

        <div className="allocation-result-count">
          Showing {filteredResults.length.toLocaleString()} of{" "}
          {summary.totalCustomers.toLocaleString()} customers
        </div>

        <div className="allocation-table-wrapper">
          <table className="allocation-table">
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>ITE Score</th>
                <th>Treatment Status</th>
                <th>Recommended Discount</th>
                <th>Estimated Cost</th>
                <th>Eligibility</th>
              </tr>
            </thead>

            <tbody>
              {filteredResults.length > 0 ? (
                filteredResults.map((customer) => (
                  <tr key={customer.customerId}>
                    <td className="customer-id">
                      {customer.customerId}
                    </td>

                    <td>
                      <span
                        className={
                          customer.ite > 0
                            ? "ite-positive"
                            : customer.ite < 0
                              ? "ite-negative"
                              : "ite-neutral"
                        }
                      >
                        {customer.ite.toFixed(3)}
                      </span>
                    </td>

                    <td>
                      {customer.treatment === 1
                        ? "Treated"
                        : "Control"}
                    </td>

                    <td>
                      {customer.recommendedDiscount}%
                    </td>

                    <td>
                      {formatAmount(customer.estimatedCost)}
                    </td>

                    <td>
                      <span
                        className={
                          customer.eligible
                            ? "eligibility-badge eligible"
                            : "eligibility-badge ineligible"
                        }
                      >
                        {customer.eligible
                          ? "Eligible"
                          : "Ineligible"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="allocation-empty">
                    No customers match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="allocation-note">
        <strong>Note:</strong> The current allocation values
        are generated for UI testing. They are not produced
        by the causal optimization backend. The cost calculation
        is illustrative and should be replaced with the actual
        campaign budget and discount-cost formula.
      </div>
    </div>
  );
}

export default AllocationMatrix;