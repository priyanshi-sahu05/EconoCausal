import Plot from "react-plotly.js";

function QiniChart() {
  const targetedCustomers = [
    0, 10, 20, 30, 40, 50,
    60, 70, 80, 90, 100
  ];

  const causalModel = [
    0, 8, 18, 30, 43, 57,
    70, 82, 92, 99, 104
  ];

  const randomBaseline = [
    0, 5, 10, 15, 20, 25,
    30, 35, 40, 45, 50
  ];

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h2>Qini Curve</h2>
        <p>
          Measures the cumulative incremental gain from
          targeting customers using the causal model.
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
          title: "Qini Curve",
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