import { useEffect, useMemo, useState } from "react";
import allocationResults from "../data/allocationResults";
import PrescriptionSummary from "../components/PrescriptionSummary";
import { fetchAllocationResults } from "../utils/api";

function AllocationMatrix() {
  const [searchTerm, setSearchTerm] = useState("");
  const [eligibilityFilter, setEligibilityFilter] = useState("all");

  const [prescriptions, setPrescriptions] = useState(
    allocationResults
  );

  const [dataSource, setDataSource] = useState("mock");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadAllocationResults = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetchAllocationResults();

        if (!active) {
          return;
        }

        const results = Array.isArray(response)
          ? response
          : response.results;

        if (!Array.isArray(results) || results.length === 0) {
          throw new Error("Backend returned no allocation results");
        }

        const formattedResults = results.map((customer, index) => {
          const customerId =
            customer.customerId ||
            customer.customer_id ||
            `C${String(index + 1).padStart(5, "0")}`;

          const ite = Number(
            customer.ite ??
              customer.ite_score ??
              customer.treatment_effect ??
              0
          );

          const recommendedDiscount = Number(
            customer.recommendedDiscount ??
              customer.recommended_discount ??
              customer.discount ??
              0
          );

          const estimatedCost = Number(
            customer.estimatedCost ??
              customer.estimated_cost ??
              recommendedDiscount * 10
          );

          const eligible =
            customer.eligible !== undefined
              ? Boolean(customer.eligible)
              : ite > 0;

          return {
            customerId,
            ite,
            recommendedDiscount,
            estimatedCost,
            eligible,
            selected:
              customer.selected !== undefined
                ? Boolean(customer.selected)
                : eligible,
          };
        });

        setPrescriptions(formattedResults);
        setDataSource("backend");
      } catch {
        if (!active) {
          return;
        }

        setError(
          "Backend data is unavailable. Showing sample data instead."
        );

        setPrescriptions(allocationResults);
        setDataSource("mock");
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadAllocationResults();

    return () => {
      active = false;
    };
  }, []);

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
          ? {
              ...customer,
              selected: !customer.selected,
            }
          : customer
      )
    );
  };

  const updateDiscount = (customerId, discountValue) => {
    if (discountValue === "") {
      return;
    }

    const discount = Number(discountValue);

    if (
      !Number.isFinite(discount) ||
      discount < 0 ||
      discount > 100
    ) {
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

  const exportToCSV = () => {
    const headers = [
      "Customer ID",
      "ITE",
      "Recommended Discount",
      "Estimated Cost",
      "Eligible",
      "Selected",
    ];

    const escapeCSVValue = (value) => {
      const stringValue = String(value);

      if (
        stringValue.includes(",") ||
        stringValue.includes('"') ||
        stringValue.includes("\n")
      ) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }

      return stringValue;
    };

    const rows = prescriptions.map((customer) => [
      customer.customerId,
      customer.ite,
      customer.recommendedDiscount,
      customer.estimatedCost,
      customer.eligible ? "Yes" : "No",
      customer.selected ? "Yes" : "No",
    ]);

    const csvContent = [
      headers.map(escapeCSVValue).join(","),
      ...rows.map((row) =>
        row.map(escapeCSVValue).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "econocausal_allocation_results.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
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

      <div className="integration-status">
        <span
          className={
            dataSource === "backend"
              ? "integration-badge backend"
              : "integration-badge mock"
          }
        >
          {dataSource === "backend"
            ? "Backend Data"
            : "Sample Data"}
        </span>

        {loading && (
          <span className="integration-message">
            Loading allocation results...
          </span>
        )}

        {!loading && error && (
          <span className="integration-message">
            {error}
          </span>
        )}
      </div>

      <div className="allocation-summary">
        <div className="allocation-summary-card">
          <span>Total Customers</span>

          <strong>
            {summary.totalCustomers.toLocaleString("en-IN")}
          </strong>
        </div>

        <div className="allocation-summary-card">
          <span>Selected Customers</span>

          <strong>
            {summary.selectedCustomers.toLocaleString("en-IN")}
          </strong>
        </div>

        <div className="allocation-summary-card">
          <span>Estimated Spend</span>

          <strong>
            {formatAmount(summary.totalEstimatedCost)}
          </strong>
        </div>

        <div className="allocation-summary-card">
          <span>Unselected Customers</span>

          <strong>
            {(
              summary.totalCustomers -
              summary.selectedCustomers
            ).toLocaleString("en-IN")}
          </strong>
        </div>
      </div>

      <PrescriptionSummary
        prescriptions={prescriptions}
      />

      <div className="allocation-table-card">
        <div className="allocation-table-header">
          <div>
            <h2>Prescription Details</h2>

            <p>
              Select customers and adjust discount values for
              testing.
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
              aria-label="Filter eligibility"
            >
              <option value="all">
                All Customers
              </option>

              <option value="eligible">
                Eligible
              </option>

              <option value="ineligible">
                Ineligible
              </option>
            </select>
          </div>
        </div>

        <div className="prescription-actions">
          <button
            type="button"
            onClick={selectEligibleCustomers}
          >
            Select Eligible Customers
          </button>

          <button
            type="button"
            onClick={clearSelection}
          >
            Clear Selection
          </button>

          <button
            type="button"
            className="export-button"
            onClick={exportToCSV}
          >
            Export CSV
          </button>
        </div>

        <div className="allocation-result-count">
          Showing{" "}
          {filteredResults.length.toLocaleString("en-IN")}{" "}
          of{" "}
          {summary.totalCustomers.toLocaleString("en-IN")}{" "}
          customers
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
                          toggleSelection(
                            customer.customerId
                          )
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

                    <td>
                      {formatAmount(
                        customer.estimatedCost
                      )}
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
                  <td
                    colSpan={6}
                    className="allocation-empty"
                  >
                    No customers match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="allocation-note">
        <strong>Development note:</strong>{" "}
        Backend results are used when the API is available.
        Sample data is displayed as a fallback during
        development. Discount editing currently changes the
        frontend estimate only.
      </div>
    </div>
  );
}

export default AllocationMatrix;