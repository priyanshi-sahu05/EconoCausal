import pandas as pd

# Load retail dataset
df = pd.read_csv("data/retail_data.csv")

# Define budget and discount options
discount_levels = [5, 10, 15, 20, 25, 30]
budget = 10000
customers = 100

# Calculate illustrative revenue and marketing cost
results = []

for discount in discount_levels:
    estimated_revenue = df["revenue"].mean() + (discount * 2)
    total_cost = discount * customers

    results.append({
        "discount": discount,
        "estimated_revenue": estimated_revenue,
        "total_cost": total_cost
    })

# Filter options within budget
result_df = pd.DataFrame(results)
result_df = result_df[result_df["total_cost"] <= budget]

# Select option with highest estimated revenue
best_option = result_df.loc[
    result_df["estimated_revenue"].idxmax()
]

print("Marketing Budget Optimization")
print("Available Budget:", budget)
print("Selected Discount:", best_option["discount"])
print(
    "Estimated Revenue per Customer:",
    round(best_option["estimated_revenue"], 2)
)
print("Total Marketing Cost:", best_option["total_cost"])

# Save results
result_df.to_csv("data/optimization_results.csv", index=False)
print("Results saved to data/optimization_results.csv")