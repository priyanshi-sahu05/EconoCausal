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

  return (
    <section className="prescription-summary">
      <div className="summary-heading">
        <div>
          <h2>Prescription Summary</h2>
          <p>
            Overview of the current customer selection and marketing
            recommendations.
          </p>
        </div>

        <div className="summary-status">
          {selectedCount > 0 ? "Recommendations Available" : "No Customers Selected"}
        </div>
      </div>

      <div className="result-summary-grid">
        <div className="result-summary-card">
          <span>Selected Customers</span>
          <strong>{selectedCount.toLocaleString()}</strong>
        </div>

        <div className="result-summary-card">
          <span>Estimated Spend</span>
          <strong>₹{totalSpend.toLocaleString()}</strong>
        </div>

        <div className="result-summary-card">
          <span>Average Discount</span>
          <strong>{averageDiscount.toFixed(1)}%</strong>
        </div>

        <div className="result-summary-card">
          <span>Average ITE</span>
          <strong>{averageITE.toFixed(3)}</strong>
        </div>
      </div>

      <div className="discount-breakdown">
        <h3>Discount Distribution</h3>

        {discountBreakdown.map((item) => (
          <div className="discount-row" key={item.discount}>
            <span>{item.discount}% Discount</span>

            <div className="discount-track">
              <div
                className="discount-fill"
                style={{
                  width:
                    selectedCount > 0
                      ? `${(item.count / selectedCount) * 100}%`
                      : "0%",
                }}
              />
            </div>

            <strong>{item.count}</strong>
          </div>
        ))}
      </div>

      <div className="allocation-insight">
        <h3>Result Summary</h3>

        {selectedCount > 0 ? (
          <p>
            The current selection contains {selectedCount.toLocaleString()}{" "}
            customers with an estimated marketing spend of ₹
            {totalSpend.toLocaleString()}. Customers with higher positive ITE
            values are prioritized for higher recommended discounts.
          </p>
        ) : (
          <p>
            Select eligible customers from the allocation table to view the
            marketing recommendation summary.
          </p>
        )}
      </div>

      <div className="summary-disclaimer">
        The displayed allocation and cost values are illustrative and depend
        on the available model results and backend optimization logic.
      </div>
    </section>
  );
}

export default PrescriptionSummary;