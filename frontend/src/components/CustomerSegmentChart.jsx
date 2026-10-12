
import { useMemo, useState } from "react";
import modelResults from "../data/modelResults";

function CustomerSegmentChart() {
  const [selectedSegment, setSelectedSegment] = useState("all");

  const definitions = [
    {
      id: "high",
      label: "High Potential",
      description: "ITE ≥ 0.50",
      matches: (ite) => ite >= 0.5,
    },
    {
      id: "medium",
      label: "Medium Potential",
      description: "ITE ≥ 0.20 and < 0.50",
      matches: (ite) => ite >= 0.2 && ite < 0.5,
    },
    {
      id: "low",
      label: "Low Potential",
      description: "ITE > 0 and < 0.20",
      matches: (ite) => ite > 0 && ite < 0.2,
    },
    {
      id: "negative",
      label: "Negative / No Effect",
      description: "ITE ≤ 0",
      matches: (ite) => ite <= 0,
    },
  ];

  const segments = useMemo(
    () =>
      definitions.map((segment) => {
        const count = modelResults.filter((customer) =>
          segment.matches(Number(customer.ite))
        ).length;

        return {
          ...segment,
          count,
          percentage: modelResults.length
            ? (count / modelResults.length) * 100
            : 0,
        };
      }),
    []
  );

  const filteredCustomers = useMemo(() => {
    if (selectedSegment === "all") {
      return modelResults;
    }

    const segment = definitions.find(
      (item) => item.id === selectedSegment
    );

    return modelResults.filter((customer) =>
      segment.matches(Number(customer.ite))
    );
  }, [selectedSegment]);

  return (
    <section className="segment-chart-card">
      <div className="segment-chart-heading">
        <div>
          <h2>Customer Segment Analysis</h2>
          <p>
            Select a segment to inspect customers by estimated
            individual treatment effect.
          </p>
        </div>

        <button
          type="button"
          className="segment-reset-button"
          onClick={() => setSelectedSegment("all")}
        >
          Show All
        </button>
      </div>

      <div className="segment-chart-list">
        {segments.map((segment) => (
          <button
            type="button"
            key={segment.id}
            className={`segment-chart-item ${
              selectedSegment === segment.id
                ? "active"
                : ""
            }`}
            onClick={() =>
              setSelectedSegment(segment.id)
            }
            aria-pressed={selectedSegment === segment.id}
          >
            <div className="segment-chart-label">
              <span>{segment.label}</span>
              <strong>
                {segment.count.toLocaleString("en-IN")} (
                {segment.percentage.toFixed(1)}%)
              </strong>
            </div>

            <div className="segment-chart-track">
              <div
                className="segment-chart-fill"
                style={{
                  width: `${segment.percentage}%`,
                }}
              />
            </div>

            <small>{segment.description}</small>
          </button>
        ))}
      </div>

      <div className="segment-customer-results">
        <h3>
          {selectedSegment === "all"
            ? "All Customers"
            : segments.find(
                (segment) => segment.id === selectedSegment
              )?.label}
        </h3>

        <p>
          {filteredCustomers.length.toLocaleString("en-IN")}{" "}
          customers found
        </p>

        {filteredCustomers.length > 0 ? (
          <div className="segment-customer-list">
            {filteredCustomers.slice(0, 10).map((customer) => (
              <div key={customer.customerId}>
                <span>{customer.customerId}</span>
                <strong>
                  ITE: {Number(customer.ite).toFixed(3)}
                </strong>
              </div>
            ))}
          </div>
        ) : (
          <p>No customers found in this segment.</p>
        )}

        {filteredCustomers.length > 10 && (
          <small>
            Showing the first 10 of{" "}
            {filteredCustomers.length.toLocaleString("en-IN")}{" "}
            customers.
          </small>
        )}
      </div>

      <p className="segment-chart-note">
        Results use the available sample dataset and are for
        demonstration purposes.
      </p>
    </section>
  );
}

export default CustomerSegmentChart;
