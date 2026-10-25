import pandas as pd
from dowhy import CausalModel

# Load mock retail dataset
data = pd.read_csv("data/retail_data.csv")

# Define causal model
model = CausalModel(
    data=data,
    treatment="discount",
    outcome="revenue",
    common_causes=[
        "age",
        "income",
        "past_purchase",
        "product_price"
    ]
)

# Check data schema
print("=== DATA SCHEMA VALIDATION ===")
print(data.dtypes)

# Check missing values
print("\n=== MISSING VALUES ===")
print(data.isnull().sum())

# Check required columns
required_columns = [
    "age",
    "income",
    "past_purchase",
    "product_price",
    "discount",
    "revenue"
]

print("\n=== REQUIRED COLUMNS ===")
for column in required_columns:
    if column in data.columns:
        print(f"{column}: OK")
    else:
        print(f"{column}: MISSING")

# Validate treatment and outcome
print("\n=== MODEL INPUT VALIDATION ===")
print(f"Treatment: {model._treatment}")
print(f"Outcome: {model._outcome}")
print(f"Confounders: {model._common_causes}")

print("\nCausal model validation completed successfully!")