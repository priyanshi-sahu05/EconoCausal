
import { useEffect, useState } from "react";
import "../index.css";

const STORAGE_KEY = "econocausal-budget-constraints";

const initialValues = {
  totalBudget: "100000",
  campaignCount: "3",
  minBudget: "5000",
  maxBudget: "50000",
};

function BudgetConstraints() {
  const [values, setValues] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved
        ? { ...initialValues, ...JSON.parse(saved) }
        : initialValues;
    } catch {
      return initialValues;
    }
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage("");
  }, [values]);

  const totalBudget = Number(values.totalBudget);
  const campaignCount = Number(values.campaignCount);
  const minBudget = Number(values.minBudget);
  const maxBudget = Number(values.maxBudget);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Number.isFinite(amount) ? amount : 0);

  const averageBudget =
    campaignCount > 0 ? totalBudget / campaignCount : 0;

  const updateField = (event) => {
    const { name, value } = event.target;

    setValues((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!Number.isFinite(totalBudget) || totalBudget <= 0) {
      nextErrors.totalBudget =
        "Enter a budget greater than zero.";
    }

    if (
      !Number.isInteger(campaignCount) ||
      campaignCount < 1 ||
      campaignCount > 100
    ) {
      nextErrors.campaignCount =
        "Enter a whole number between 1 and 100.";
    }

    if (!Number.isFinite(minBudget) || minBudget < 0) {
      nextErrors.minBudget =
        "Minimum budget cannot be negative.";
    }

    if (!Number.isFinite(maxBudget) || maxBudget <= 0) {
      nextErrors.maxBudget =
        "Maximum budget must be greater than zero.";
    }

    if (
      Number.isFinite(minBudget) &&
      Number.isFinite(maxBudget) &&
      minBudget > maxBudget
    ) {
      nextErrors.minBudget =
        "Minimum cannot exceed maximum.";
    }

    if (
      Number.isInteger(campaignCount) &&
      campaignCount > 0 &&
      minBudget >= 0 &&
      maxBudget > 0 &&
      minBudget <= maxBudget &&
      totalBudget < campaignCount * minBudget
    ) {
      nextErrors.totalBudget =
        "Total budget is below the minimum campaign budget.";
    }

    if (
      Number.isInteger(campaignCount) &&
      campaignCount > 0 &&
      minBudget >= 0 &&
      maxBudget > 0 &&
      minBudget <= maxBudget &&
      totalBudget > campaignCount * maxBudget
    ) {
      nextErrors.totalBudget =
        "Total budget exceeds the combined campaign maximum.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const saveConstraints = (event) => {
    event.preventDefault();

    if (!validate()) {
      setMessage("Please correct the highlighted fields.");
      return;
    }

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          totalBudget,
          campaignCount,
          minBudget,
          maxBudget,
          savedAt: new Date().toISOString(),
        })
      );

      setMessage("Budget constraints saved successfully.");
    } catch {
      setMessage("Unable to save settings in this browser.");
    }
  };

  const resetConstraints = () => {
    setValues({ ...initialValues });
    setErrors({});

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // The form can still be reset if storage is unavailable.
    }

    setMessage("Values reset. Save to store the default settings.");
  };

  return (
    <main className="budget-page">
      <header className="budget-header">
        <div>
          <p className="budget-eyebrow">
            ECONOCAUSAL / CAMPAIGN PLANNING
          </p>
          <h1>Budget Constraints</h1>
          <p>
            Configure the spending limits for your marketing campaigns.
          </p>
        </div>
      </header>

      <section className="budget-summary">
        <article className="budget-card">
          <span>Total Marketing Budget</span>
          <strong>{formatCurrency(totalBudget)}</strong>
        </article>

        <article className="budget-card">
          <span>Number of Campaigns</span>
          <strong>
            {Number.isFinite(campaignCount) ? campaignCount : 0}
          </strong>
        </article>

        <article className="budget-card">
          <span>Average Budget per Campaign</span>
          <strong>{formatCurrency(averageBudget)}</strong>
        </article>
      </section>

      <section className="budget-panel">
        <h2>Campaign Settings</h2>
        <p className="budget-description">
          Enter the total budget and the allowed spending range
          for each campaign.
        </p>

        <form onSubmit={saveConstraints} noValidate>
          <div className="budget-form-grid">
            <div className="budget-field">
              <label htmlFor="totalBudget">
                Total Marketing Budget (₹)
              </label>
              <input
                id="totalBudget"
                name="totalBudget"
                type="number"
                min="1"
                step="1"
                value={values.totalBudget}
                onChange={updateField}
                aria-invalid={Boolean(errors.totalBudget)}
              />
              {errors.totalBudget && (
                <p className="budget-error">
                  {errors.totalBudget}
                </p>
              )}
            </div>

            <div className="budget-field">
              <label htmlFor="campaignCount">
                Number of Campaigns
              </label>
              <input
                id="campaignCount"
                name="campaignCount"
                type="number"
                min="1"
                max="100"
                step="1"
                value={values.campaignCount}
                onChange={updateField}
                aria-invalid={Boolean(errors.campaignCount)}
              />
              {errors.campaignCount && (
                <p className="budget-error">
                  {errors.campaignCount}
                </p>
              )}
            </div>

            <div className="budget-field">
              <label htmlFor="minBudget">
                Minimum Budget per Campaign (₹)
              </label>
              <input
                id="minBudget"
                name="minBudget"
                type="number"
                min="0"
                step="1"
                value={values.minBudget}
                onChange={updateField}
                aria-invalid={Boolean(errors.minBudget)}
              />
              {errors.minBudget && (
                <p className="budget-error">
                  {errors.minBudget}
                </p>
              )}
            </div>

            <div className="budget-field">
              <label htmlFor="maxBudget">
                Maximum Budget per Campaign (₹)
              </label>
              <input
                id="maxBudget"
                name="maxBudget"
                type="number"
                min="1"
                step="1"
                value={values.maxBudget}
                onChange={updateField}
                aria-invalid={Boolean(errors.maxBudget)}
              />
              {errors.maxBudget && (
                <p className="budget-error">
                  {errors.maxBudget}
                </p>
              )}
            </div>
          </div>

          <div className="budget-range">
            <span>Minimum combined budget</span>
            <strong>
              {formatCurrency(campaignCount * minBudget)}
            </strong>
            <span>Maximum combined budget</span>
            <strong>
              {formatCurrency(campaignCount * maxBudget)}
            </strong>
          </div>

          <div className="budget-actions">
            <button type="submit" className="budget-save">
              Save Constraints
            </button>

            <button
              type="button"
              className="budget-reset"
              onClick={resetConstraints}
            >
              Reset
            </button>
          </div>

          {message && (
            <p className="budget-message" role="status">
              {message}
            </p>
          )}
        </form>
      </section>

      <p className="budget-note">
        Settings are saved in this browser only. Backend optimization
        integration is a separate step.
      </p>
    </main>
  );
}

export default BudgetConstraints;
