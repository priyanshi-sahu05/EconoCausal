import Plot from "react-plotly.js";
import { prepareQiniData } from "../../utils/causalMetrics";

function QiniChart({ results }) {
  const {
    targetedCustomers,
    qiniValues,
    randomBaseline
  } = prepareQiniData(results);

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h2>Qini Curve</h2>

        <p>
          Compares cumulative incremental gain from
          targeted marketing against a random rollout.
        </p>
      </div>

      <Plot
        data={[
          {
            x: targetedCustomers,
            y: qiniValues,
            type: "scatter",
            mode: "lines+markers",
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