import QiniChart from "../components/charts/QiniChart";
import UpliftChart from "../components/charts/UpliftChart";
import modelResults from "../data/modelResults";
import { calculateMetrics } from "../utils/causalMetrics";

function Visualizations() {
  const metrics = calculateMetrics(modelResults);

  return (
    <div className="page">
      <div className="page-header">
        <h1>Marketing Visualizations</h1>

        <p>
          Analyze causal marketing performance using
          treatment effect and uplift analysis.
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
    </div>
  );
}

export default Visualizations;