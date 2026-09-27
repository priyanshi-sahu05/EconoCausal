import Plot from "react-plotly.js";
import { prepareUpliftData } from "../../utils/causalMetrics";
import { sampleResults } from "../../utils/chartData";

function UpliftChart({ results }) {
  const chartResults = sampleResults(results, 1000);

  const {
    targetedCustomers,
    upliftValues
  } = prepareUpliftData(chartResults);

  if (!results || results.length === 0) {
    return (
      <div className="chart-card">
        <div className="chart-header">
          <h2>Uplift Curve</h2>
          <p>No data available for the selected filters.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h2>Uplift Curve</h2>

        <p>
          Shows cumulative uplift when customers are
          prioritized using their estimated treatment effect.
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
            y: upliftValues,
            type: "scatter",
            mode: "lines",
            name: "Causal Model"
          }
        ]}
        layout={{
          title: "Cumulative Uplift",
          xaxis: {
            title: "Targeted Customers (%)",
            range: [0, 100]
          },
          yaxis: {
            title: "Cumulative Uplift"
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

export default UpliftChart;