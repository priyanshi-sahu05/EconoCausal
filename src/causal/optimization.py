import pandas as pd

# Load optimization results
results = pd.read_csv("data/optimization_results.csv")

print("Optimization results loaded successfully!")
print("Customers:", len(results))

# Marketing budget
BUDGET = 100

# Maximum discount allowed per customer
MAX_DISCOUNT = 20

# Sort customers by predicted revenue
results = results.sort_values(
    by="predicted_revenue",
    ascending=False
).reset_index(drop=True)

# Assign personalized discounts under budget
remaining_budget = BUDGET
assigned_discounts = []

for _, row in results.iterrows():

    requested_discount = min(
        row["optimal_discount"],
        MAX_DISCOUNT
    )

    if remaining_budget >= requested_discount:
        discount = requested_discount
    else:
        discount = max(0, remaining_budget)

    assigned_discounts.append(round(discount, 2))
    remaining_budget -= discount

results["assigned_discount"] = assigned_discounts

# Save final allocation
results.to_csv(
    "data/personalized_discount_allocation.csv",
    index=False
)

print("\nPersonalized discount allocation completed!")
print("Marketing budget:", BUDGET)
print("Budget used:", round(results["assigned_discount"].sum(), 2))
print("Budget remaining:", round(remaining_budget, 2))

print("\nFinal Discount Allocation:")
print(
    results[
        [
            "customer_id",
            "assigned_discount",
            "predicted_revenue"
        ]
    ]
)

print(
    "\nResults saved to "
    "data/personalized_discount_allocation.csv"
)