import pandas as pd

# Load retail data and DML treatment effects
df = pd.read_csv("data/retail_data.csv")
ite = pd.read_csv("data/ite_results.csv")

# Budget and discount options
budget = 10000
discount_levels = [5, 10, 15, 20, 25, 30]
customers = 100

# Average estimated treatment effect from DML
avg_effect = ite["estimated_treatment_effect"].mean()

# Evaluate discount options
results = []

for discount in discount_levels:
    estimated_revenue = df["revenue"].mean() + (avg_effect * discount / 10)
    total_cost = discount * customers

    results.append({
        "discount": discount,
        "estimated_revenue": estimated_revenue,
        "total_cost": total_cost
    })

# Select the best option within budget
result_df = pd.DataFrame(results)
result_df = result_df[result_df["total_cost"] <= budget]

best_option = result_df.loc[
    result_df["estimated_revenue"].idxmax()
]

print("Marketing Budget Optimization")
print("Available Budget:", budget)
print("Average DML Treatment Effect:", round(avg_effect, 2))
print("Selected Discount:", best_option["discount"])
print("Estimated Revenue per Customer:", round(best_option["estimated_revenue"], 2))
print("Total Marketing Cost:", best_option["total_cost"])

result_df.to_csv("data/optimization_results.csv", index=False)
print("Results saved to data/optimization_results.csv")