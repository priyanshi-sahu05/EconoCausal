import pandas as pd
import numpy as np

from econml.dml import CausalForestDML
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score


# Load dataset
df = pd.read_csv("data/retail_data.csv")

# Treatment
T = df["discount"].values

# Outcome
Y = df["revenue"].values

# Features / confounders
feature_columns = [
    "age",
    "income",
    "past_purchase",
    "product_price"
]

X = df[feature_columns].values


# Train Causal Forest DML
model = CausalForestDML(
    model_y=RandomForestRegressor(
        n_estimators=100,
        random_state=42
    ),
    model_t=RandomForestRegressor(
        n_estimators=100,
        random_state=42
    ),
    n_estimators=100,
    min_samples_leaf=10,
    random_state=42
)

model.fit(Y, T, X=X)


# Estimate Individual Treatment Effects
ite = model.effect(X)

# Average Treatment Effect
ate = np.mean(ite)


# Separate models for validation metrics
outcome_model = RandomForestRegressor(
    n_estimators=100,
    random_state=42
)

treatment_model = RandomForestRegressor(
    n_estimators=100,
    random_state=42
)

outcome_model.fit(X, Y)
treatment_model.fit(X, T)

Y_pred = outcome_model.predict(X)
T_pred = treatment_model.predict(X)


# Model metrics
y_mse = mean_squared_error(Y, Y_pred)
y_r2 = r2_score(Y, Y_pred)

t_mse = mean_squared_error(T, T_pred)
t_r2 = r2_score(T, T_pred)


# Feature importance
feature_importance = model.feature_importances_


# Display results
print("\n===== ITE VALIDATION & MODEL ANALYSIS =====")

print("\nOutcome Model Metrics:")
print(f"MSE: {y_mse:.4f}")
print(f"R2 Score: {y_r2:.4f}")

print("\nTreatment Model Metrics:")
print(f"MSE: {t_mse:.4f}")
print(f"R2 Score: {t_r2:.4f}")

print("\nAverage Treatment Effect (ATE):")
print(f"{ate:.4f}")

print("\nFirst 10 Individual Treatment Effects (ITE):")
print(ite[:10])

print("\nITE Statistics:")
print(f"Minimum ITE: {np.min(ite):.4f}")
print(f"Maximum ITE: {np.max(ite):.4f}")
print(f"Mean ITE: {np.mean(ite):.4f}")
print(f"Std ITE: {np.std(ite):.4f}")

print("\nFeature Importance:")
for feature, importance in zip(feature_columns, feature_importance):
    print(f"{feature}: {importance:.4f}")

print("\nValidation and analysis completed successfully!")