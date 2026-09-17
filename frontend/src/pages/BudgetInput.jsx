import { useState } from "react";

function BudgetInput() {
  const [budget, setBudget] = useState("");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const total = Number(budget);
    const minimum = Number(minBudget);
    const maximum = Number(maxBudget);

    if (!budget || !minBudget || !maxBudget) {
      setMessage("Please fill in all budget fields.");
      return;
    }

    if (total <= 0) {
      setMessage("Total budget must be greater than 0.");
      return;
    }

    if (minimum < 0 || maximum < 0) {
      setMessage("Budget limits cannot be negative.");
      return;
    }

    if (minimum > maximum) {
      setMessage(
        "Minimum budget cannot be greater than maximum budget."
      );
      return;
    }

    if (maximum > total) {
      setMessage(
        "Maximum campaign budget cannot exceed the total budget."
      );
      return;
    }

    setMessage(
      "Budget constraints saved successfully."
    );
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Budget Constraints</h1>

        <p>
          Define the marketing budget limits that will be
          used later by the optimization engine.
        </p>
      </div>

      <form
        className="form-card"
        onSubmit={handleSubmit}
      >
        <h2>Marketing Budget</h2>

        <p className="form-description">
          Enter the budget constraints for the campaign
          allocation process.
        </p>

        <div className="form-group">
          <label htmlFor="total-budget">
            Total Marketing Budget
          </label>

          <input
            id="total-budget"
            type="number"
            min="0"
            placeholder="Example: 100000"
            value={budget}
            onChange={(event) => {
              setBudget(event.target.value);
              setMessage("");
            }}
          />

          <small>
            Total amount available for marketing activities.
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="minimum-budget">
            Minimum Campaign Budget
          </label>

          <input
            id="minimum-budget"
            type="number"
            min="0"
            placeholder="Example: 5000"
            value={minBudget}
            onChange={(event) => {
              setMinBudget(event.target.value);
              setMessage("");
            }}
          />

          <small>
            Minimum amount that can be allocated to a campaign.
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="maximum-budget">
            Maximum Campaign Budget
          </label>

          <input
            id="maximum-budget"
            type="number"
            min="0"
            placeholder="Example: 30000"
            value={maxBudget}
            onChange={(event) => {
              setMaxBudget(event.target.value);
              setMessage("");
            }}
          />

          <small>
            Maximum amount that can be allocated to a campaign.
          </small>
        </div>

        {message && (
          <div className="budget-message">
            {message}
          </div>
        )}

        <button type="submit">
          Save Budget Constraints
        </button>
      </form>
    </div>
  );
}

export default BudgetInput;