import QiniChart from "../components/charts/QiniChart";
import UpliftChart from "../components/charts/UpliftChart";

function Visualizations() {
  return (
    <div className="page">
      <div className="page-header">
        <h1>Marketing Visualizations</h1>

        <p>
          Analyze causal marketing performance using Qini
          and uplift analysis.
        </p>
      </div>

      <div className="chart-container">
        <QiniChart />
        <UpliftChart />
      </div>
    </div>
  );
}

export default Visualizations;