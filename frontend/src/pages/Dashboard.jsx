import BackendStatus from "../components/BackendStatus";

function Dashboard() {
  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1>EconoCausal Dashboard</h1>
        <p>
          Causal marketing analysis and customer allocation dashboard.
        </p>
      </div>

      <BackendStatus />

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>Customer Analysis</h2>
          <p>
            Analyze individual treatment effects and identify customers who
            may respond positively to marketing campaigns.
          </p>
        </div>

        <div className="dashboard-card">
          <h2>Marketing Optimization</h2>
          <p>
            Review customer-level recommendations and estimated marketing
            costs.
          </p>
        </div>

        <div className="dashboard-card">
          <h2>Causal Visualizations</h2>
          <p>
            View Qini and uplift curves to understand causal model
            performance.
          </p>
        </div>

        <div className="dashboard-card">
          <h2>Budget Planning</h2>
          <p>
            Define marketing budget constraints and review the resulting
            customer allocation.
          </p>
        </div>
      </div>

      <div className="dashboard-info">
        <h2>How the Dashboard Works</h2>

        <div className="dashboard-flow">
          <div>
            <span>1</span>
            <strong>Upload Data</strong>
            <p>Provide customer and marketing data.</p>
          </div>

          <div>
            <span>2</span>
            <strong>Set Budget</strong>
            <p>Define the available marketing budget.</p>
          </div>

          <div>
            <span>3</span>
            <strong>Analyze Effects</strong>
            <p>Review ITE, Qini and uplift results.</p>
          </div>

          <div>
            <span>4</span>
            <strong>Review Allocation</strong>
            <p>View customer-level recommendations.</p>
          </div>
        </div>
      </div>

      <div className="final-review-card">
        <h2>Project Status</h2>

        <div className="final-status-list">
          <div>
            <span>Frontend Dashboard</span>
            <strong>Ready</strong>
          </div>

          <div>
            <span>Causal Visualizations</span>
            <strong>Ready</strong>
          </div>

          <div>
            <span>ITE Filtering</span>
            <strong>Ready</strong>
          </div>

          <div>
            <span>Allocation Interface</span>
            <strong>Ready</strong>
          </div>

          <div>
            <span>Documentation</span>
            <strong>Ready</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;