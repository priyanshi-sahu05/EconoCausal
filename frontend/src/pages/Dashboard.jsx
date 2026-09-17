function Dashboard() {
  return (
    <div className="page">
      <div className="page-header">
        <h1>Marketing Optimization Dashboard</h1>

        <p>
          Upload historical campaign data and define your
          marketing budget constraints.
        </p>
      </div>

      <div className="card-container">
        <div className="card">
          <h2>📊 Historical Campaign Data</h2>

          <p>
            Upload historical marketing campaign data that
            will be used for causal analysis.
          </p>

          <a href="/upload" className="card-link">
            Go to Data Upload →
          </a>
        </div>

        <div className="card">
          <h2>💰 Marketing Budget</h2>

          <p>
            Define the total marketing budget and campaign
            constraints for future optimization.
          </p>

          <a href="/budget" className="card-link">
            Go to Budget Input →
          </a>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;