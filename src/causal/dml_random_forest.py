import pandas as pd
from econml.dml import CausalForestDML
from sklearn.ensemble import RandomForestRegressor


# Load dataset
df = pd.read_csv("data/retail_data.csv")

# Treatment
T = df["discount"].values

# Outcome
Y = df["revenue"].values

# Features / confounders
X = df[["age", "income", "past_purchase", "product_price"]].values


# Random Forest based causal model
model = CausalForestDML(
    model_y=RandomForestRegressor(
        n_estimators=100,
        min_samples_leaf=10,
        random_state=42
    ),
    model_t=RandomForestRegressor(
        n_estimators=100,
        min_samples_leaf=10,
        random_state=42
    ),
    n_estimators=100,
    min_samples_leaf=10,
    random_state=42
)


# Train model
model.fit(Y, T, X=X)


# Estimate Individual Treatment Effects
ite = model.effect(X)


print("=== RANDOM FOREST DML MODEL ===")
print("Model trained successfully!")

print("\nNumber of ITE estimates:")
print(len(ite))

print("\nFirst 10 Individual Treatment Effects:")
print(ite[:10])

print("\nAverage Treatment Effect:")
print(ite.mean())

print("\nITE estimation completed successfully!")