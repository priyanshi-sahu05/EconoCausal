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
          Shows cumulative uplift from targeted customers
          compared with a random rollout.
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