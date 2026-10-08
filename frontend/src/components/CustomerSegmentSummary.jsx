import { useMemo } from "react";
import modelResults from "../data/modelResults";

function CustomerSegmentSummary() {
  const segments = useMemo(() => {
    const high = modelResults.filter(
      (customer) => customer.ite >= 0.5
    ).length;

    const medium = modelResults.filter(
      (customer) => customer.ite >= 0.2 && customer.ite < 0.5
    ).length;

    const low = modelResults.filter(
      (customer) => customer.ite > 0 && customer.ite < 0.2
    ).length;

    const negative = modelResults.filter(
      (customer) => customer.ite <= 0
    ).length;

    return {
      high,
      medium,
      low,
      negative,
    };
  }, []);

  const total = modelResults.length;

  return (
    <div className="segment-card">
      <div className="segment-header">
        <div>
          <h2>Customer Segments</h2>
          <p>
            Customers grouped according to their estimated treatment effect.
          </p>
        </div>
      </div>

      <div className="segment-list">
        <div className="segment-item">
          <div>
            <strong>High Potential</strong>
            <span>ITE ≥ 0.50</span>
          </div>
          <strong>
            {segments.high.toLocaleString()}
          </strong>
        </div>

        <div className="segment-item">
          <div>
            <strong>Medium Potential</strong>
            <span>ITE 0.20 – 0.49</span>
          </div>
          <strong>
            {segments.medium.toLocaleString()}
          </strong>
        </div>

        <div className="segment-item">
          <div>
            <strong>Low Potential</strong>
            <span>ITE 0.01 – 0.19</span>
          </div>
          <strong>
            {segments.low.toLocaleString()}
          </strong>
        </div>

        <div className="segment-item">
          <div>
            <strong>Negative / No Effect</strong>
            <span>ITE ≤ 0</span>
          </div>
          <strong>
            {segments.negative.toLocaleString()}
          </strong>
        </div>
      </div>

      <div className="segment-total">
        Total analyzed customers: {total.toLocaleString()}
      </div>
    </div>
  );
}

export default CustomerSegmentSummary;