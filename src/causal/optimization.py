import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from scipy.optimize import minimize_scalar

# Load mock retail data
data = pd.read_csv("data/retail_data.csv")

print("Data loaded successfully!")
print("Dataset shape:", data.shape)

# Features used by the revenue model
features = [
    "age",
    "income",
    "past_purchase",
    "product_price"
]

X = data[features]
y = data["revenue"]

# Train revenue prediction model
model = RandomForestRegressor(
    n_estimators=100,
    random_state=42,
    n_jobs=-1
)

model.fit(X, y)

print("Revenue prediction model trained successfully!")


# Predict revenue for a given customer and discount
def predict_revenue(customer_features, discount):
    customer = customer_features.copy()

    # Discount affects the effective price
    customer["product_price"] = max(
        0,
        customer["product_price"] - discount
    )

    input_data = pd.DataFrame([customer])[features]

    return float(model.predict(input_data)[0])


# Optimize discount for one customer
def optimize_discount(customer_features, max_discount=20):

    def objective(discount):
        revenue = predict_revenue(customer_features, discount)

        # We maximize revenue
        return -revenue

    result = minimize_scalar(
        objective,
        bounds=(0, max_discount),
        method="bounded",
        options={"xatol": 0.5}
    )

    return round(float(result.x), 2), round(float(-result.fun), 2)


# Run optimization for a small sample
# This keeps the demonstration fast.
sample = data.head(20).copy()

results = []

for _, row in sample.iterrows():

    customer_features = row[features].to_dict()

    optimal_discount, predicted_revenue = optimize_discount(
        customer_features
    )

    results.append({
        "customer_id": row.get("customer_id", len(results) + 1),
        "optimal_discount": optimal_discount,
        "predicted_revenue": predicted_revenue
    })


results_df = pd.DataFrame(results)

print("\nOptimization completed successfully!")

print("\nOptimal Discount Results:")
print(results_df)

print("\nAverage Optimal Discount:")
print(round(results_df["optimal_discount"].mean(), 2))

print("\nTotal Predicted Revenue:")
print(round(results_df["predicted_revenue"].sum(), 2))

# Save optimization results
results_df.to_csv(
    "data/optimization_results.csv",
    index=False
)

print("\nResults saved to data/optimization_results.csv")