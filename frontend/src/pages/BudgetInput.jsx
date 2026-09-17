import { useState } from "react";

function BudgetInput() {
  const [budget, setBudget] = useState("");
  const [campaigns, setCampaigns] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!budget || !campaigns) {
      alert("Please enter all required values.");
      return;
    }

    alert(
      `Budget: ₹${budget}\nNumber of campaigns: ${campaigns}`
    );
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Budget Input</h1>

        <p>
          Provide the marketing budget constraints for the
          optimization process.
        </p>
      </div>

      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="budget">
            Total Marketing Budget
          </label>

          <input
            id="budget"
            type="number"
            placeholder="Example: 100000"
            value={budget}
            onChange={(event) => setBudget(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="campaigns">
            Number of Campaigns
          </label>

          <input
            id="campaigns"
            type="number"
            placeholder="Example: 5"
            value={campaigns}
            onChange={(event) =>
              setCampaigns(event.target.value)
            }
          />
        </div>

        <button type="submit">
          Save Budget Constraints
        </button>
      </form>
    </div>
  );
}

export default BudgetInput;