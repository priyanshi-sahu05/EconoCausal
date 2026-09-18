function Dashboard() {
  return (
    <div className="page">
      <div className="page-header">
        <h1>Marketing Optimization Dashboard</h1>

        <p>
          Analyze historical campaign data and define budget
          constraints for causal marketing optimization.
        </p>
      </div>

    
      <div className="card-container">
        <div className="card">
          <div className="card-icon">📊</div>

          <h2>Historical Campaign Data</h2>

          <p>
            Upload historical campaign data that will later
            be used for causal analysis and treatment effect
            estimation.
          </p>

          <a href="/upload" className="card-link">
            Open Data Upload →
          </a>
        </div>

        <div className="card">
          <div className="card-icon">💰</div>

          <h2>Budget Constraints</h2>

          <p>
            Define the total marketing budget and campaign
            allocation limits for the optimization process.
          </p>

          <a href="/budget" className="card-link">
            Open Budget Input →
          </a>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;