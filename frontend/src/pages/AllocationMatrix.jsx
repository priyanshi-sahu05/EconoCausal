
import { useCallback, useEffect, useMemo, useState } from "react";
import allocationResults from "../data/allocationResults";
import PrescriptionSummary from "../components/PrescriptionSummary";
import { fetchAllocationResults } from "../utils/api";

const ITEMS_PER_PAGE = 10;

function normalizeCustomer(customer, index) {
  const customerId =
    customer.customerId ??
    customer.customer_id ??
    customer.id ??
    `CUST-${index + 1}`;

  const rawEligibility = customer.eligible ?? customer.is_eligible ?? false;
  const eligible =
    rawEligibility === true ||
    rawEligibility === 1 ||
    String(rawEligibility).toLowerCase() === "true" ||
    String(rawEligibility) === "1";

  const discount = Number(
    customer.recommendedDiscount ??
      customer.recommended_discount ??
      0
  );

  return {
    ...customer,
    customerId: String(customerId),
    ite: Number(customer.ite ?? customer.ite_score ?? 0),
    recommendedDiscount: Number.isFinite(discount) ? discount : 0,
    estimatedCost: Number(
      customer.estimatedCost ?? customer.estimated_cost ?? 0
    ),
    eligible,
    selected: Boolean(customer.selected),
  };
}

function AllocationMatrix() {
  const [searchTerm, setSearchTerm] = useState("");
  const [eligibilityFilter, setEligibilityFilter] = useState("all");
  const [sortOption, setSortOption] = useState("customer-asc");
  const [prescriptions, setPrescriptions] = useState(
    () => allocationResults.map(normalizeCustomer)
  );
  const [dataSource, setDataSource] = useState("mock");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [apiMessage, setApiMessage] = useState(
    "Sample data is currently displayed."
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [discountErrors, setDiscountErrors] = useState({});
  const [discountDrafts, setDiscountDrafts] = useState({});

  const loadAllocationResults = useCallback(async () => {
    setLoading(true);
    setError("");
    setApiMessage("Loading allocation results...");

    try {
      const response = await fetchAllocationResults();

      const results = Array.isArray(response)
        ? response
        : response?.results ??
          response?.data?.results ??
          response?.data;

      if (!Array.isArray(results) || results.length === 0) {
        throw new Error("No allocation results returned by the API.");
      }

      const normalizedResults = results.map(normalizeCustomer);

      setPrescriptions(normalizedResults);
      setDataSource("backend");
      setCurrentPage(1);
      setDiscountErrors({});
      setDiscountDrafts({});
      setApiMessage(
        `${normalizedResults.length.toLocaleString("en-IN")} records loaded from the backend.`
      );
    } catch (requestError) {
      const fallbackResults = Array.isArray(allocationResults)
        ? allocationResults.map(normalizeCustomer)
        : [];

      setPrescriptions(fallbackResults);
      setDataSource("mock");
      setCurrentPage(1);
      setDiscountErrors({});
      setDiscountDrafts({});
      setError(
        requestError?.message || "Unable to load backend data."
      );
      setApiMessage("Backend unavailable. Showing sample data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAllocationResults();
  }, [loadAllocationResults]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, eligibilityFilter, sortOption]);

  const formatAmount = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(Number(value) || 0);

  const filteredResults = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const filtered = prescriptions.filter((customer) => {
      const matchesSearch = customer.customerId
        .toLowerCase()
        .includes(normalizedSearch);

      const matchesEligibility =
        eligibilityFilter === "all" ||
        (eligibilityFilter === "eligible" && customer.eligible) ||
        (eligibilityFilter === "ineligible" && !customer.eligible);

      return matchesSearch && matchesEligibility;
    });

    const compareText = (a, b) =>
      String(a).localeCompare(String(b), undefined, {
        numeric: true,
        sensitivity: "base",
      });

    filtered.sort((a, b) => {
      switch (sortOption) {
        case "customer-desc":
          return compareText(b.customerId, a.customerId);
        case "ite-high":
          return b.ite - a.ite;
        case "ite-low":
          return a.ite - b.ite;
        case "discount-high":
          return b.recommendedDiscount - a.recommendedDiscount;
        case "cost-high":
          return b.estimatedCost - a.estimatedCost;
        case "customer-asc":
        default:
          return compareText(a.customerId, b.customerId);
      }
    });

    return filtered;
  }, [prescriptions, searchTerm, eligibilityFilter, sortOption]);

  const summary = useMemo(() => {
    const selectedCustomers = prescriptions.filter(
      (customer) => customer.selected
    );

    const customersWithDiscount = prescriptions.filter(
      (customer) => customer.recommendedDiscount > 0
    );

    const totalEstimatedCost = selectedCustomers.reduce(
      (total, customer) => total + customer.estimatedCost,
      0
    );

    return {
      totalCustomers: prescriptions.length,
      selectedCustomers: selectedCustomers.length,
      customersWithDiscount: customersWithDiscount.length,
      totalEstimatedCost,
    };
  }, [prescriptions]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredResults.length / ITEMS_PER_PAGE)
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;

  const paginatedResults = filteredResults.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const firstItem =
    filteredResults.length === 0 ? 0 : startIndex + 1;

  const lastItem = Math.min(
    startIndex + ITEMS_PER_PAGE,
    filteredResults.length
  );

  const toggleSelection = (customerId) => {
    setPrescriptions((previous) =>
      previous.map((customer) => {
        if (customer.customerId !== customerId) {
          return customer;
        }

        if (
          !customer.eligible ||
          customer.recommendedDiscount <= 0
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
      previous.map((customer) =>
        customer.customerId === customerId
          ? {
              ...customer,
              recommendedDiscount: discount,
              estimatedCost: discount * 10,
              selected:
                discount === 0 ? false : customer.selected,
            }
          : customer
      )
    );
  };

  const selectEligibleCustomers = () => {
    setPrescriptions((previous) =>
      previous.map((customer) => ({
        ...customer,
        selected:
          customer.eligible &&
          customer.recommendedDiscount > 0,
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
    if (filteredResults.length === 0) {
      window.alert("No allocation results available to export.");
      return;
    }

    const headers = [
      "Customer ID",
      "ITE Score",
      "Recommended Discount",
      "Estimated Cost",
      "Eligible",
      "Selected",
    ];

    const escapeCSV = (value) =>
      `"${String(value ?? "").replace(/"/g, '""')}"`;

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
    <main className="allocation-page">
      <header className="page-header">
        <h1>Customer Prescriptions</h1>
        <p>
          Review recommended discounts and select customers
          for the marketing campaign.
        </p>
      </header>

      <section className="integration-status">
        <span
          className={`integration-badge ${
            dataSource === "backend" ? "backend" : "mock"
          }`}
        >
          {dataSource === "backend" ? "Backend Data" : "Sample Data"}
        </span>

        <span className="integration-message" role="status">
          {apiMessage}
        </span>

        <button
          type="button"
          onClick={loadAllocationResults}
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? "Refreshing..." : "Refresh Data"}
        </button>
      </section>

      {error && (
        <p className="allocation-error" role="alert">
          {error}
        </p>
      )}

      <section className="allocation-summary">
        <article className="allocation-summary-card">
          <span>Total Customers</span>
          <strong>
            {summary.totalCustomers.toLocaleString("en-IN")}
          </strong>
        </article>

        <article className="allocation-summary-card">
          <span>Selected Customers</span>
          <strong>
            {summary.selectedCustomers.toLocaleString("en-IN")}
          </strong>
        </article>

        <article className="allocation-summary-card">
          <span>Customers with Discount</span>
          <strong>
            {summary.customersWithDiscount.toLocaleString("en-IN")}
          </strong>
        </article>

        <article className="allocation-summary-card">
          <span>Estimated Selected Spend</span>
          <strong>{formatAmount(summary.totalEstimatedCost)}</strong>
        </article>

        <article className="allocation-summary-card">
          <span>Unselected Customers</span>
          <strong>
            {(
              summary.totalCustomers - summary.selectedCustomers
            ).toLocaleString("en-IN")}
          </strong>
        </article>
      </section>

      <PrescriptionSummary prescriptions={prescriptions} />

      <section className="allocation-table-card">
        <header className="allocation-table-header">
          <div>
            <h2>Prescription Details</h2>
            <p>
              Search customers, adjust discount values, and manage
              campaign selection.
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
        </header>

        <div className="prescription-actions">
          <button
            type="button"
            onClick={selectEligibleCustomers}
          >
            Select Eligible Customers
          </button>

          <button type="button" onClick={clearSelection}>
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

        <p className="allocation-result-count" aria-live="polite">
          Showing {firstItem}–{lastItem} of{" "}
          {filteredResults.length.toLocaleString("en-IN")} filtered
          customers
        </p>

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
                          customer.recommendedDiscount <= 0
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

        <nav className="pagination-controls" aria-label="Table pagination">
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
        </nav>
      </section>

      <aside className="allocation-note">
        <strong>Development note:</strong>{" "}
        API data is used when available; otherwise, sample data is
        displayed. Discount editing updates the frontend estimate only.
        The example estimated-cost formula is discount × 10 and must
        be replaced with your actual optimization calculation.
      </aside>
    </main>
  );
}

export default AllocationMatrix;
