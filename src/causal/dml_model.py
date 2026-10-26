import pandas as pd
from econml.dml import LinearDML
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split

# Load retail dataset
data = pd.read_csv("data/retail_data.csv")

# Treatment
T = data["discount"]

# Outcome
Y = data["revenue"]

# Confounders
X = data[["age", "income", "past_purchase", "product_price"]]

# Split data into training and testing sets
X_train, X_test, T_train, T_test, Y_train, Y_test = train_test_split(
    X, T, Y, test_size=0.2, random_state=42
)

# Create DML model
dml = LinearDML(
    model_y=RandomForestRegressor(
        n_estimators=100,
        random_state=42
    ),
    model_t=RandomForestRegressor(
        n_estimators=100,
        random_state=42
    ),
    discrete_treatment=False,
    random_state=42
)

# Train DML model
dml.fit(
    Y_train,
    T_train,
    X=X_train
)

print("EconML DML model trained successfully!")

# Estimate treatment effect
treatment_effect = dml.effect(X_test)

print("\nEstimated Individual Treatment Effects:")
print(treatment_effect[:10])

print("\nAverage Treatment Effect:")
print(treatment_effect.mean())

# Save Individual Treatment Effects
results = pd.DataFrame({
    "customer_id": X_test.index + 1,
    "estimated_treatment_effect": treatment_effect
})

results.to_csv("data/ite_results.csv", index=False)

print("\nITE results saved to data/ite_results.csv")