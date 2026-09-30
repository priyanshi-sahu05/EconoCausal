
function PrescriptionSummary({ prescriptions }) {
  const selectedCustomers = prescriptions.filter(
    (customer) => customer.selected
  );

  const selectedCount = selectedCustomers.length;

  const totalSpend = selectedCustomers.reduce(
    (total, customer) => total + customer.estimatedCost,
    0
  );

  const averageITE =
    selectedCount > 0
      ? selectedCustomers.reduce(
          (total, customer) => total + customer.ite,
          0
        ) / selectedCount
      : 0;

  const averageDiscount =
    selectedCount > 0
      ? selectedCustomers.reduce(
          (total, customer) => total + customer.recommendedDiscount,
          0
        ) / selectedCount
      : 0;

  const discountBreakdown = [0, 10, 15, 20].map((discount) => ({
    discount,
    count: selectedCustomers.filter(
      (customer) => customer.recommendedDiscount === discount
    ).length,
  }));

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <section className="prescription-summary">
      <div className="summary-heading">
        <div>
          <h2>Allocation Result Summary</h2>
          <p>Overview of the currently selected customer prescriptions.</p>
        </div>
        <span className="summary-status">Updated automatically</span>
      </div>

      <div className="result-summary-grid">
        <div className="result-summary-card">
          <span>Selected Customers</span>
          <strong>{selectedCount.toLocaleString("en-IN")}</strong>
        </div>

        <div className="result-summary-card">
          <span>Estimated Spend</span>
          <strong>{formatCurrency(totalSpend)}</strong>
        </div>

        <div className="result-summary-card">
          <span>Average Discount</span>
          <strong>{averageDiscount.toFixed(1)}%</strong>
        </div>

        <div className="result-summary-card">
          <span>Average ITE Score</span>
          <strong>{averageITE.toFixed(3)}</strong>
        </div>
      </div>

      <div className="discount-breakdown">
        <h3>Discount Distribution</h3>

        {discountBreakdown.map((item) => {
          const percentage =
            selectedCount > 0
              ? (item.count / selectedCount) * 100
              : 0;

          return (
            <div className="discount-row" key={item.discount}>
              <div className="discount-label">
                <span>{item.discount}% Discount</span>
                <span>{item.count} customers</span>
              </div>

              <div className="discount-track">
                <div
                  className="discount-fill"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="allocation-insight">
        <h3>Result Summary</h3>

        {selectedCount === 0 ? (
          <p>
            No customers are currently selected. Select customers or update
            their discount percentages to generate an allocation summary.
          </p>
        ) : (
          <p>
            Currently, <strong>{selectedCount.toLocaleString("en-IN")}</strong>{" "}
            customers are selected, with an estimated total spend of{" "}
            <strong>{formatCurrency(totalSpend)}</strong>. The average
            recommended discount is{" "}
            <strong>{averageDiscount.toFixed(1)}%</strong>, and the average
            ITE score is <strong>{averageITE.toFixed(3)}</strong>.
          </p>
        )}

        <p className="summary-disclaimer">
          These figures are based on sample data and illustrative discount
          costs. They do not represent verified causal model results or
          guarantee that a marketing budget constraint is satisfied.
        </p>
      </div>
    </section>
  );
}

export default PrescriptionSummary;