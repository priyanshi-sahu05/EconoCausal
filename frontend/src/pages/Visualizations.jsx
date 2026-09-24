import QiniChart from "../components/charts/QiniChart";
import UpliftChart from "../components/charts/UpliftChart";
import modelResults from "../data/modelResults";
import {
  calculateMetrics,
  calculateComparison
} from "../utils/causalMetrics";

function Visualizations() {
  const metrics = calculateMetrics(modelResults);

  const comparison =
    calculateComparison(modelResults);

  return (
    <div className="page">
      <div className="page-header">
        <h1>Marketing Visualizations</h1>

        <p>
          Analyze causal marketing performance and compare
          targeted treatment against random rollout.
        </p>
      </div>

      <div className="metrics-container">
        <div className="metric-card">
          <span>Total Customers</span>
          <strong>{modelResults.length}</strong>
        </div>

        <div className="metric-card">
          <span>Average ITE</span>
          <strong>{metrics.averageITE}</strong>
        </div>

        <div className="metric-card">
          <span>Positive ITE</span>
          <strong>{metrics.positiveITECount}</strong>
        </div>

        <div className="metric-card">
          <span>Negative ITE</span>
          <strong>{metrics.negativeITECount}</strong>
        </div>
      </div>

      <div className="chart-container">
        <QiniChart results={modelResults} />

        <UpliftChart results={modelResults} />
      </div>

      <div className="comparison-card">
        <div className="comparison-header">
          <h2>Campaign Comparison</h2>

          <p>
            Summary of customers with positive estimated
            treatment effects.
          </p>
        </div>

        <div className="comparison-grid">
          <div>
            <span>Customers with Positive ITE</span>
            <strong>
              {metrics.positiveITECount}
            </strong>
          </div>

          <div>
            <span>Targetable Customer Share</span>
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
    </div>
  );
}

export default Visualizations;