import Plot from "react-plotly.js";

function UpliftChart() {
  const targetedCustomers = [
    0, 10, 20, 30, 40, 50,
    60, 70, 80, 90, 100
  ];

  const causalModel = [
    0, 44, 39, 34, 30, 26,
    22, 18, 14, 9, 4
  ];

  const randomBaseline = [
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0
  ];

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h2>Uplift Curve</h2>
        <p>
          Shows the estimated incremental response from
          targeting customers with the marketing treatment.
        </p>
      </div>

      <Plot
        data={[
          {
            x: targetedCustomers,
            y: causalModel,
            type: "scatter",
            mode: "lines+markers",
            name: "Causal Model"
          },
          {
            x: targetedCustomers,
            y: randomBaseline,
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
            title: "Uplift Score"
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