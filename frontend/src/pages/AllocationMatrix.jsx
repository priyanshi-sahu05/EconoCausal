
import { useMemo, useState } from "react";
import allocationResults from "../data/allocationResults";
import PrescriptionSummary from "../components/PrescriptionSummary";

function AllocationMatrix() {
  const [searchTerm, setSearchTerm] = useState("");
  const [eligibilityFilter, setEligibilityFilter] = useState("all");
  const [prescriptions, setPrescriptions] = useState(allocationResults);

  const filteredResults = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return prescriptions.filter((customer) => {
      const matchesSearch = customer.customerId
        .toLowerCase()
        .includes(normalizedSearch);

      const matchesEligibility =
        eligibilityFilter === "all" ||
        (eligibilityFilter === "eligible" && customer.eligible) ||
        (eligibilityFilter === "ineligible" && !customer.eligible);

      return matchesSearch && matchesEligibility;
    });
  }, [prescriptions, searchTerm, eligibilityFilter]);

  const summary = useMemo(() => {
    const selectedCustomers = prescriptions.filter(
      (customer) => customer.selected
    );

    const totalEstimatedCost = selectedCustomers.reduce(
      (total, customer) => total + customer.estimatedCost,
      0
    );

    return {
      totalCustomers: prescriptions.length,
      selectedCustomers: selectedCustomers.length,
      totalEstimatedCost,
    };
  }, [prescriptions]);

  const formatAmount = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(value);

  const toggleSelection = (customerId) => {
    setPrescriptions((previous) =>
      previous.map((customer) =>
        customer.customerId === customerId
          ? { ...customer, selected: !customer.selected }
          : customer
      )
    );
  };

  const updateDiscount = (customerId, discountValue) => {
    if (discountValue === "") {
      return;
    }

    const discount = Number(discountValue);

    if (!Number.isFinite(discount) || discount < 0 || discount > 100) {
      return;
    }

    setPrescriptions((previous) =>
      previous.map((customer) =>
        customer.customerId === customerId
          ? {
              ...customer,
              recommendedDiscount: discount,
              estimatedCost: discount * 10,
              selected: discount > 0,
            }
          : customer
      )
    );
  };

  const selectEligibleCustomers = () => {
    setPrescriptions((previous) =>
      previous.map((customer) => ({
        ...customer,
        selected: customer.eligible,
      }))
    );
  };

  const clearSelection = () => {
    setPrescriptions((previous) =>
      previous.map((customer) => ({
        ...customer,
        selected: false,
      }))
    );
  };

  return (
    <div className="allocation-page">
      <div className="page-header">
        <h1>Customer Prescriptions</h1>
        <p>
          Review recommended discounts and select customers
          for the marketing campaign.
        </p>
      </div>

      <div className="allocation-summary">
        <div className="allocation-summary-card">
          <span>Total Customers</span>
          <strong>{summary.totalCustomers.toLocaleString("en-IN")}</strong>
        </div>

        <div className="allocation-summary-card">
          <span>Selected Customers</span>
          <strong>{summary.selectedCustomers.toLocaleString("en-IN")}</strong>
        </div>

        <div className="allocation-summary-card">
          <span>Estimated Spend</span>
          <strong>{formatAmount(summary.totalEstimatedCost)}</strong>
        </div>

        <div className="allocation-summary-card">
          <span>Unselected Customers</span>
          <strong>
            {(summary.totalCustomers - summary.selectedCustomers)
              .toLocaleString("en-IN")}
          </strong>
        </div>
      </div>

      <PrescriptionSummary prescriptions={prescriptions} />

      <div className="allocation-table-card">
        <div className="allocation-table-header">
          <div>
            <h2>Prescription Details</h2>
            <p>
              Select customers and adjust discount values for testing.
            </p>
          </div>

          <div className="allocation-filters">
            <input
              type="search"
              placeholder="Search customer ID..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              aria-label="Search customer ID"
            />

            <select
              value={eligibilityFilter}
              onChange={(event) =>
                setEligibilityFilter(event.target.value)
              }
              aria-label="Filter eligibility"
            >
              <option value="all">All Customers</option>
              <option value="eligible">Eligible</option>
              <option value="ineligible">Ineligible</option>
            </select>
          </div>
        </div>

        <div className="prescription-actions">
          <button type="button" onClick={selectEligibleCustomers}>
            Select Eligible Customers
          </button>

          <button type="button" onClick={clearSelection}>
            Clear Selection
          </button>
        </div>

        <div className="allocation-result-count">
          Showing {filteredResults.length.toLocaleString("en-IN")} of{" "}
          {summary.totalCustomers.toLocaleString("en-IN")} customers
        </div>

        <div className="allocation-table-wrapper">
          <table className="allocation-table">
            <thead>
              <tr>
                <th>Select</th>
                <th>Customer ID</th>
                <th>ITE Score</th>
                <th>Optimal Discount (%)</th>
                <th>Estimated Cost</th>
                <th>Eligibility</th>
              </tr>
            </thead>

            <tbody>
              {filteredResults.length > 0 ? (
                filteredResults.map((customer) => (
                  <tr key={customer.customerId}>
                    <td>
                      <input
                        type="checkbox"
                        checked={customer.selected}
                        onChange={() =>
                          toggleSelection(customer.customerId)
                        }
                        aria-label={`Select ${customer.customerId}`}
                      />
                    </td>

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
                      <input
                        className="discount-input"
                        type="number"
                        min="0"
                        max="100"
                        step="5"
                        value={customer.recommendedDiscount}
                        onChange={(event) =>
                          updateDiscount(
                            customer.customerId,
                            event.target.value
                          )
                        }
                        aria-label={`Discount for ${customer.customerId}`}
                      />
                    </td>

                    <td>{formatAmount(customer.estimatedCost)}</td>

                    <td>
                      <span
                        className={
                          customer.eligible
                            ? "eligibility-badge eligible"
                            : "eligibility-badge ineligible"
                        }
                      >
                        {customer.eligible ? "Eligible" : "Ineligible"}
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
        <strong>Development note:</strong> Discount values and costs are
        illustrative. This page does not yet enforce a campaign budget
        constraint or calculate optimal discounts using the causal
        optimization backend.
      </div>
    </div>
  );
}

export default AllocationMatrix;