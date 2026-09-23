import Plot from "react-plotly.js";
import { prepareUpliftData } from "../../utils/causalMetrics";

function UpliftChart({ results }) {
  const {
    targetedCustomers,
    upliftValues
  } = prepareUpliftData(results);

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h2>Uplift Curve</h2>

        <p>
          Cumulative uplift obtained by targeting
          customers with higher predicted treatment effects.
        </p>
      </div>

      <Plot
        data={[
          {
            x: targetedCustomers,
            y: upliftValues,
            type: "scatter",
            mode: "lines+markers",
            name: "Causal Model"
          },
          {
            x: [0, 100],
            y: [0, 0],
            type: "scatter",
            mode: "lines",
            name: "Random Baseline"
          }
        ]}
        layout={{
          title: "Uplift Curve",
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