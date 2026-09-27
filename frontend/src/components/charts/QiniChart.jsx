import Plot from "react-plotly.js";
import { prepareQiniData } from "../../utils/causalMetrics";
import { sampleResults } from "../../utils/chartData";

function QiniChart({ results }) {
  const chartResults = sampleResults(results, 1000);

  const {
    targetedCustomers,
    qiniValues,
    randomBaseline
  } = prepareQiniData(chartResults);

  if (!results || results.length === 0) {
    return (
      <div className="chart-card">
        <div className="chart-header">
          <h2>Qini Curve</h2>
          <p>No data available for the selected filters.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h2>Qini Curve</h2>

        <p>
          Compares cumulative incremental gain from
          targeted marketing against a random rollout.
        </p>

        {results.length > 1000 && (
          <span className="chart-performance-note">
            Showing a representative sample of{" "}
            {chartResults.length.toLocaleString()}{" "}
            points from{" "}
            {results.length.toLocaleString()}{" "}
            customers.
          </span>
        )}
      </div>

      <Plot
        data={[
          {
            x: targetedCustomers,
            y: qiniValues,
            type: "scatter",
            mode: "lines",
            name: "Causal Model"
          },
          {
            x: targetedCustomers,
            y: randomBaseline,
            type: "scatter",
            mode: "lines",
            name: "Random Rollout"
          }
        ]}
        layout={{
          title: "Causal Model vs Random Rollout",
          xaxis: {
            title: "Targeted Customers (%)",
            range: [0, 100]
          },
          yaxis: {
            title: "Cumulative Incremental Gain"
          },
          hovermode: "x unified",
          margin: {
            l: 70,
            r: 30,
            t: 70,
            b: 70
          },
          legend: {
            orientation: "h"
          }
        }}
        style={{
          width: "100%",
          height: "450px"
        }}
        useResizeHandler={true}
        config={{
          responsive: true,
          displaylogo: false
        }}
      />
    </div>
  );
}

export default QiniChart;