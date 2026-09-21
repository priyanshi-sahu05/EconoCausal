import Plot from "react-plotly.js";

function UpliftChart() {
  const xValues = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  const modelValues = [0, 42, 36, 31, 27, 23, 19, 15, 11, 7, 3];

  const randomValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  return (
    <div className="chart-card">
      <h2>Uplift Curve</h2>

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
          title: "Uplift Curve",
          xaxis: {
            title: "Targeted Customers (%)"
          },
          yaxis: {
            title: "Uplift Score"
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

export default UpliftChart;