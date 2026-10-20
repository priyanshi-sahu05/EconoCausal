
import { useCallback, useEffect, useMemo, useState } from "react";
import allocationResults from "../data/allocationResults";
import PrescriptionSummary from "../components/PrescriptionSummary";
import { fetchAllocationResults } from "../utils/api";

function AllocationMatrix() {
  const [searchTerm, setSearchTerm] = useState("");
  const [eligibilityFilter, setEligibilityFilter] = useState("all");
  const [sortOption, setSortOption] = useState("customer-asc");

  const [prescriptions, setPrescriptions] = useState(
    Array.isArray(allocationResults) ? allocationResults : []
  );

  const [dataSource, setDataSource] = useState("mock");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [apiMessage, setApiMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [discountErrors, setDiscountErrors] = useState({});
  const [discountDrafts, setDiscountDrafts] = useState({});

  const itemsPerPage = 10;

  // Load and normalize allocation data from the backend.
  const loadAllocationResults = useCallback(async () => {
    setLoading(true);
    setError("");
    setApiMessage("");

    try {
      const response = await fetchAllocationResults();

      const results = Array.isArray(response)
        ? response
        : Array.isArray(response?.results)
          ? response.results
          : Array.isArray(response?.data)
            ? response.data
            : Array.isArray(response?.data?.results)
              ? response.data.results
              : null;

      if (!results || results.length === 0) {
        throw new Error("No allocation results returned.");
      }

      const normalizedResults = results.map((customer, index) => {
        const discount = Number(customer.recommendedDiscount ?? 0);
        const ite = Number(customer.ite ?? 0);
        const estimatedCost = Number(customer.estimatedCost ?? discount * 10);

        const eligible =
          customer.eligible === true ||
          customer.eligible === 1 ||
          String(customer.eligible).toLowerCase() === "true" ||
          String(customer.eligible) === "1";

        return {
          ...customer,
          customerId: String(
            customer.customerId ?? customer.customer_id ?? `CUSTOMER_${index + 1}`
          ),
          ite: Number.isFinite(ite) ? ite : 0,
          recommendedDiscount:
            Number.isFinite(discount) && discount >= 0 && discount <= 100
              ? discount
              : 0,
          estimatedCost:
            Number.isFinite(estimatedCost) && estimatedCost >= 0
              ? estimatedCost
              : 0,
          eligible,
          selected:
            eligible &&
            discount > 0 &&
            (customer.selected === true ||
              customer.selected === 1 ||
              String(customer.selected).toLowerCase() === "true"),
        };
      });

      setPrescriptions(normalizedResults);
      setDataSource("backend");
      setApiMessage("Allocation results loaded successfully.");
      setCurrentPage(1);
      setDiscountErrors({});
      setDiscountDrafts({});
    } catch (err) {
      setPrescriptions(
        Array.isArray(allocationResults) ? allocationResults : []
      );
      setDataSource("mock");
      setError("Backend data is unavailable. Showing sample data instead.");
      setApiMessage("Backend unavailable. Showing sample data instead.");
      setCurrentPage(1);
      setDiscountErrors({});
      setDiscountDrafts({});
    } finally {
      setLoading(false);
    }
  }, []);

  // Automatically load backend data when the component mounts.
  useEffect(() => {
    loadAllocationResults();
  }, [loadAllocationResults]);

  // Reset pagination when search, filter, or sorting changes.
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, eligibilityFilter, sortOption]);

  // Search, filter, and sort customers.
  const filteredResults = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const filtered = prescriptions.filter((customer) => {
      const matchesSearch = String(customer.customerId ?? "")
        .toLowerCase()
        .includes(normalizedSearch);

      const matchesEligibility =
        eligibilityFilter === "all" ||
        (eligibilityFilter === "eligible" && customer.eligible) ||
        (eligibilityFilter === "ineligible" && !customer.eligible);

      return matchesSearch && matchesEligibility;
    });

    const compareText = (a, b) =>
      String(a ?? "").localeCompare(String(b ?? ""), undefined, {
        numeric: true,
        sensitivity: "base",
      });

    filtered.sort((a, b) => {
      switch (sortOption) {
        case "customer-desc":
          return compareText(b.customerId, a.customerId);

        case "ite-high":
          return Number(b.ite) - Number(a.ite);

        case "ite-low":
          return Number(a.ite) - Number(b.ite);

        case "discount-high":
          return (
            Number(b.recommendedDiscount) -
            Number(a.recommendedDiscount)
          );

        case "cost-high":
          return Number(b.estimatedCost) - Number(a.estimatedCost);

        case "customer-asc":
        default:
          return compareText(a.customerId, b.customerId);
      }
    });

    return filtered;
  }, [prescriptions, searchTerm, eligibilityFilter, sortOption]);

  // Calculate pagination.
  const totalPages = Math.max(
    1,
    Math.ceil(filteredResults.length / itemsPerPage)
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * itemsPerPage;

  const paginatedResults = filteredResults.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const firstItem =
    filteredResults.length === 0 ? 0 : startIndex + 1;

  const lastItem = Math.min(
    startIndex + itemsPerPage,
    filteredResults.length
  );

  // Calculate dashboard summary values.
  const summary = useMemo(() => {
    const selectedCustomers = prescriptions.filter(
      (customer) => customer.selected
    );

    const customersWithDiscount = prescriptions.filter(
      (customer) => Number(customer.recommendedDiscount) > 0
    );

    const totalEstimatedCost = selectedCustomers.reduce(
      (total, customer) =>
        total + (Number(customer.estimatedCost) || 0),
      0
    );

    return {
      totalCustomers: prescriptions.length,
      selectedCustomers: selectedCustomers.length,
      customersWithDiscount: customersWithDiscount.length,
      totalEstimatedCost,
    };
  }, [prescriptions]);

  // Format amounts in Indian currency.
  const formatAmount = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(Number(value) || 0);

  // Toggle selection for a customer.
  const toggleSelection = (customerId) => {
    setPrescriptions((previous) =>
      previous.map((customer) => {
        if (customer.customerId !== customerId) {
          return customer;
        }

        if (
          !customer.eligible ||
          Number(customer.recommendedDiscount) <= 0
        ) {
          return { ...customer, selected: false };
        }

        return {
          ...customer,
          selected: !customer.selected,
        };
      })
    );
  };

  // Validate and update the recommended discount.
  const updateDiscount = (customerId, rawValue) => {
    setDiscountDrafts((previous) => ({
      ...previous,
      [customerId]: rawValue,
    }));

    const value = String(rawValue).trim();

    if (value === "") {
      setDiscountErrors((previous) => ({
        ...previous,
        [customerId]: "Discount is required.",
      }));
      return;
    }

    const discount = Number(value);

    if (
      !Number.isFinite(discount) ||
      discount < 0 ||
      discount > 100
    ) {
      setDiscountErrors((previous) => ({
        ...previous,
        [customerId]: "Enter a discount between 0 and 100.",
      }));
      return;
    }

    setDiscountErrors((previous) => {
      const updated = { ...previous };
      delete updated[customerId];
      return updated;
    });

    setPrescriptions((previous) =>
      previous.map((customer) => {
        if (customer.customerId !== customerId) {
          return customer;
        }

        return {
          ...customer,
          recommendedDiscount: discount,
          estimatedCost: discount * 10,
          selected:
            discount === 0 || !customer.eligible
              ? false
              : customer.selected,
        };
      })
    );
  };

  // Select all eligible customers with a positive discount.
  const selectEligibleCustomers = () => {
    setPrescriptions((previous) =>
      previous.map((customer) => ({
        ...customer,
        selected:
          Boolean(customer.eligible) &&
          Number(customer.recommendedDiscount) > 0 &&
          !discountErrors[customer.customerId],
      }))
    );
  };

  // Clear all selections.
  const clearSelection = () => {
    setPrescriptions((previous) =>
      previous.map((customer) => ({
        ...customer,
        selected: false,
      }))
    );
  };

  // Export filtered results to CSV.
  const exportToCSV = () => {
    if (filteredResults.length === 0) {
      window.alert("No allocation results available to export.");
      return;
    }

    const headers = [
      "Customer ID",
      "ITE",
      "Recommended Discount",
      "Estimated Cost",
      "Eligible",
      "Selected",
    ];

    const escapeCSV = (value) => {
      const text = String(value ?? "");
      return `"${text.replace(/"/g, '""')}"`;
    };

    const rows = filteredResults.map((customer) => [
      customer.customerId,
      customer.ite,
      customer.recommendedDiscount,
      customer.estimatedCost,
      customer.eligible ? "Yes" : "No",
      customer.selected ? "Yes" : "No",
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map(escapeCSV).join(","))
      .join("\r\n");

    const blob = new Blob(["\uFEFF", csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "econocausal_allocation_results.csv";

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
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
          {dataSource === "backend" ? "Backend Data" : "Sample Data"}
        </span>

        <span className="integration-message" role="status">
          {loading ? "Loading allocation results..." : apiMessage}
        </span>

        {error && (
          <span className="integration-error" role="alert">
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
          <span>Customers with Discount</span>
          <strong>
            {summary.customersWithDiscount.toLocaleString("en-IN")}
          </strong>
        </div>

        <div className="allocation-summary-card">
          <span>Estimated Selected Spend</span>
          <strong>{formatAmount(summary.totalEstimatedCost)}</strong>
        </div>

        <div className="allocation-summary-card">
          <span>Unselected Customers</span>
          <strong>
            {(
              summary.totalCustomers - summary.selectedCustomers
            ).toLocaleString("en-IN")}
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

            <select
              value={sortOption}
              onChange={(event) => setSortOption(event.target.value)}
              aria-label="Sort allocation results"
            >
              <option value="customer-asc">Customer ID (A–Z)</option>
              <option value="customer-desc">Customer ID (Z–A)</option>
              <option value="ite-high">ITE Score (Highest)</option>
              <option value="ite-low">ITE Score (Lowest)</option>
              <option value="discount-high">Discount (Highest)</option>
              <option value="cost-high">Estimated Cost (Highest)</option>
            </select>
          </div>
        </div>

        <div className="prescription-actions">
          <button
            type="button"
            onClick={selectEligibleCustomers}
            disabled={loading}
          >
            Select Eligible Customers
          </button>

          <button
            type="button"
            onClick={clearSelection}
            disabled={loading}
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
          Showing {firstItem}–{lastItem} of{" "}
          {filteredResults.length.toLocaleString("en-IN")} filtered
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
              {paginatedResults.length === 0 ? (
                <tr>
                  <td colSpan={6} className="allocation-empty">
                    <div className="empty-state">
                      <h3>No customers found</h3>
                      <p>
                        Try changing your search term or eligibility
                        filter.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedResults.map((customer) => (
                  <tr key={customer.customerId}>
                    <td>
                      <input
                        type="checkbox"
                        checked={Boolean(customer.selected)}
                        onChange={() =>
                          toggleSelection(customer.customerId)
                        }
                        disabled={
                          !customer.eligible ||
                          Number(customer.recommendedDiscount) <= 0 ||
                          Boolean(discountErrors[customer.customerId])
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
                          Number(customer.ite) > 0
                            ? "ite-positive"
                            : Number(customer.ite) < 0
                              ? "ite-negative"
                              : "ite-neutral"
                        }
                      >
                        {Number(customer.ite).toFixed(3)}
                      </span>
                    </td>

                    <td>
                      <div className="discount-input-wrapper">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          step="1"
                          value={
                            discountDrafts[customer.customerId] ??
                            String(customer.recommendedDiscount)
                          }
                          onChange={(event) =>
                            updateDiscount(
                              customer.customerId,
                              event.target.value
                            )
                          }
                          aria-label={`Discount for ${customer.customerId}`}
                          aria-invalid={Boolean(
                            discountErrors[customer.customerId]
                          )}
                          aria-describedby={
                            discountErrors[customer.customerId]
                              ? `discount-error-${customer.customerId}`
                              : undefined
                          }
                        />

                        {discountErrors[customer.customerId] && (
                          <p
                            id={`discount-error-${customer.customerId}`}
                            className="discount-error"
                            role="alert"
                          >
                            {discountErrors[customer.customerId]}
                          </p>
                        )}
                      </div>
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
              )}
            </tbody>
          </table>
        </div>

        <div className="pagination-controls">
          <button
            type="button"
            onClick={() =>
              setCurrentPage((page) => Math.max(1, page - 1))
            }
            disabled={safeCurrentPage === 1}
          >
            Previous
          </button>

          <span>
            Page {safeCurrentPage} of {totalPages}
          </span>

          <button
            type="button"
            onClick={() =>
              setCurrentPage((page) =>
                Math.min(totalPages, page + 1)
              )
            }
            disabled={safeCurrentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      <div className="allocation-refresh">
        <button
          type="button"
          onClick={loadAllocationResults}
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? "Refreshing..." : "Refresh Data"}
        </button>
      </div>

      <div className="allocation-note">
        <strong>Development note:</strong>{" "}
        {error ||
          "Backend results are used when the API is available. Sample data is used as a fallback. Discount editing changes the frontend estimate only."}
        {" "}The estimated cost uses a sample formula of discount × 10.
      </div>
    </div>
  );
}

export default AllocationMatrix;
