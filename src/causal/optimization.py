from pathlib import Path
import pandas as pd

BASE_DIR = Path(__file__).resolve().parents[2]
DATA_DIR = BASE_DIR / "data"

results = pd.read_csv(DATA_DIR / "optimization_results.csv")

required_columns = {"discount", "estimated_revenue", "total_cost"}
if not required_columns.issubset(results.columns):
    raise ValueError(
        f"Missing required columns: {required_columns - set(results.columns)}"
    )

BUDGET = 10000

results = results.dropna(subset=list(required_columns))
feasible = results[results["total_cost"] <= BUDGET].copy()

if feasible.empty:
    raise ValueError("No discount options fit within the budget.")

best_option = feasible.loc[feasible["estimated_revenue"].idxmax()]

feasible["selected"] = feasible.index == best_option.name
output_file = DATA_DIR / "pricing_option_summary.csv"
feasible.to_csv(output_file, index=False)

print("Pricing option analysis completed.")
print("Available budget:", BUDGET)
print("Options evaluated:", len(feasible))
print("Selected discount:", best_option["discount"])
print("Illustrative revenue per customer:", round(best_option["estimated_revenue"], 2))
print("Estimated marketing cost:", round(best_option["total_cost"], 2))
print("Saved:", output_file)
print("Note: Revenue values are illustrative, not validated causal predictions.")