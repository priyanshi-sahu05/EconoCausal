import Plot from "react-plotly.js";

function QiniChart() {
  const xValues = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  const modelValues = [0, 8, 17, 27, 38, 50, 61, 71, 80, 88, 95];

  const randomValues = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

  return (
    <div className="chart-card">
      <h2>Qini Curve</h2>

      <Plot
        data={[
          {
            x: xValues,
            y: modelValues,
            type: "scatter",
            mode: "lines",
            name: "Causal Model"
          },
          {
            x: xValues,
            y: randomValues,
            type: "scatter",
            mode: "lines",
            name: "Random Baseline"
          }
        ]}
        layout={{
          title: "Qini Curve",
          xaxis: {
            title: "Targeted Customers (%)"
          },
          yaxis: {
            title: "Cumulative Gain"
          },
          autosize: true
        }}
        style={{
          width: "100%",
          height: "450px"
        }}
        useResizeHandler={true}
      />
    </div>
  );
}

export default QiniChart;