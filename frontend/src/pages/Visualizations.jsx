import { useMemo, useState } from "react";
import QiniChart from "../components/charts/QiniChart";
import UpliftChart from "../components/charts/UpliftChart";
import ITEFilter from "../components/ITEFilter";
import modelResults from "../data/modelResults";
import {
  calculateMetrics,
  calculateComparison
} from "../utils/causalMetrics";

function Visualizations() {
  const [minITE, setMinITE] = useState("");
  const [customerType, setCustomerType] = useState("all");

  const filteredResults = useMemo(() => {
    const minimumITE =
      minITE === "" ? -Infinity : Number(minITE);

    return modelResults.filter((customer) => {
      const matchesITE =
        customer.ite >= minimumITE;

      let matchesType = true;

      if (customerType === "positive") {
        matchesType = customer.ite > 0;
      }

      if (customerType === "negative") {
        matchesType = customer.ite < 0;
      }

      return matchesITE && matchesType;
    });
  }, [minITE, customerType]);

  const metrics = useMemo(
    () => calculateMetrics(filteredResults),
    [filteredResults]
  );

  const comparison = useMemo(
    () => calculateComparison(filteredResults),
    [filteredResults]
  );

  return (
    <div className="visualizations-page">
      <div className="page-header">
        <h1>Causal Visualizations</h1>

        <p>
          Analyze individual treatment effects and
          compare causal targeting with a random rollout.
        </p>
      </div>

      <ITEFilter
        minITE={minITE}
        customerType={customerType}
        onMinITEChange={setMinITE}
        onCustomerTypeChange={setCustomerType}
        totalCustomers={modelResults.length}
        filteredCustomers={filteredResults.length}
      />

      <div className="metrics-container">
        <div className="metric-card">
          <h3>Average ITE</h3>
          <strong>{metrics.averageITE}</strong>
        </div>

        <div className="metric-card">
          <h3>Positive ITE Customers</h3>
          <strong>{metrics.positiveITECount}</strong>
        </div>

        <div className="metric-card">
          <h3>Maximum ITE</h3>
          <strong>{metrics.maximumITE}</strong>
        </div>

        <div className="metric-card">
          <h3>Minimum ITE</h3>
          <strong>{metrics.minimumITE}</strong>
        </div>
      </div>

      <div className="charts-container">
        <QiniChart results={filteredResults} />

        <UpliftChart results={filteredResults} />
      </div>

      <div className="comparison-card">
        <div className="comparison-header">
          <h2>Targeting Comparison</h2>

          <p>
            Summary of customers selected using
            positive individual treatment effects.
          </p>
        </div>

        <div className="comparison-grid">
          <div>
            <span>Targeted Customers</span>
            <strong>
              {comparison.targetedPercentage}%
            </strong>
          </div>

          <div>
            <span>Total Positive ITE</span>
            <strong>
              {comparison.totalPositiveITE}
            </strong>
          </div>

          <div>
            <span>Average Positive ITE</span>
            <strong>
              {comparison.averagePositiveITE}
            </strong>
          </div>
        </div>
      </div>

      <div className="visualization-info">
        <h2>Understanding the Metrics</h2>

        <div className="info-grid">
          <div>
            <h3>ITE</h3>
            <p>
              Individual Treatment Effect estimates
              the expected impact of a treatment for
              an individual customer.
            </p>
          </div>

          <div>
            <h3>Qini Curve</h3>
            <p>
              Shows cumulative incremental gain when
              customers are targeted according to their
              estimated treatment effect.
            </p>
          </div>

          <div>
            <h3>Uplift Curve</h3>
            <p>
              Shows the cumulative uplift obtained by
              prioritizing customers based on their ITE.
            </p>
          </div>

          <div>
            <h3>Random Rollout</h3>
            <p>
              Provides a baseline representing customer
              targeting without causal prioritization.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Visualizations;