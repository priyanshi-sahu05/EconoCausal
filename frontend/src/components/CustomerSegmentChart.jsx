
import { useMemo } from "react";
import modelResults from "../data/modelResults";

function CustomerSegmentChart() {
  const segments = useMemo(() => {
    const definitions = [
      {
        label: "High Potential",
        min: 0.5,
        max: Infinity,
      },
      {
        label: "Medium Potential",
        min: 0.2,
        max: 0.5,
      },
      {
        label: "Low Potential",
        min: 0,
        max: 0.2,
      },
      {
        label: "Negative / No Effect",
        min: -Infinity,
        max: 0,
      },
    ];

    return definitions.map((segment) => {
      const count = modelResults.filter((customer) => {
        if (segment.label === "Negative / No Effect") {
          return customer.ite <= 0;
        }

        return (
          customer.ite >= segment.min &&
          customer.ite < segment.max
        );
      }).length;

      const percentage =
        modelResults.length > 0
          ? (count / modelResults.length) * 100
          : 0;

      return {
        ...segment,
        count,
        percentage,
      };
    });
  }, []);

  return (
    <section className="segment-chart-card">
      <h2>Customer Segment Analysis</h2>

      <p>
        Customer distribution based on estimated treatment effects.
      </p>

      <div className="segment-chart-list">
        {segments.map((segment) => (
          <div
            className="segment-chart-item"
            key={segment.label}
          >
            <div className="segment-chart-label">
              <span>{segment.label}</span>

              <strong>
                {segment.count.toLocaleString("en-IN")} (
                {segment.percentage.toFixed(1)}%)
              </strong>
            </div>

            <div
              className="segment-chart-track"
              role="progressbar"
              aria-label={segment.label}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Number(
                segment.percentage.toFixed(1)
              )}
            >
              <div
                className="segment-chart-fill"
                style={{
                  width: `${segment.percentage}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="segment-chart-note">
        Counts are calculated from the available sample dataset.
      </p>
    </section>
  );
}

export default CustomerSegmentChart;
