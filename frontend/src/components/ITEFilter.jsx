function ITEFilter({
  minITE,
  customerType,
  onMinITEChange,
  onCustomerTypeChange,
  totalCustomers,
  filteredCustomers
}) {
  return (
    <div className="filter-card">
      <div className="filter-header">
        <h2>ITE Filters</h2>
        <p>
          Filter customers based on their estimated
          individual treatment effect.
        </p>
      </div>

      <div className="filter-grid">
        <div className="filter-group">
          <label htmlFor="minITE">
            Minimum ITE
          </label>

          <input
            id="minITE"
            type="number"
            min="-1"
            max="1"
            step="0.01"
            value={minITE}
            onChange={(event) =>
              onMinITEChange(event.target.value)
            }
          />
        </div>

        <div className="filter-group">
          <label htmlFor="customerType">
            Customer Type
          </label>

          <select
            id="customerType"
            value={customerType}
            onChange={(event) =>
              onCustomerTypeChange(event.target.value)
            }
          >
            <option value="all">
              All Customers
            </option>

            <option value="positive">
              Positive ITE
            </option>

            <option value="negative">
              Negative ITE
            </option>
          </select>
        </div>
      </div>

      <div className="filter-result">
        Showing{" "}
        <strong>{filteredCustomers}</strong>{" "}
        of{" "}
        <strong>{totalCustomers}</strong>{" "}
        customers
      </div>
    </div>
  );
}

export default ITEFilter;