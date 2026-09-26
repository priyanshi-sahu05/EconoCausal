import pandas as pd


# Load retail dataset
df = pd.read_csv("data/retail_data.csv")

# Treatment variable
T = df["discount"]

# Outcome variable
Y = df["revenue"]

# Feature variables / observed confounders
X = df[["age", "income", "past_purchase", "product_price"]]

print("=== DML DATA PREPARATION ===")

print("\nTreatment:")
print("discount")

print("\nOutcome:")
print("revenue")

print("\nFeatures:")
for feature in X.columns:
    print("-", feature)

print("\nDataset shape:")
print(df.shape)

print("\nPrepared feature matrix shape:")
print(X.shape)

print("\nTreatment shape:")
print(T.shape)

print("\nOutcome shape:")
print(Y.shape)

print("\nDML data preparation completed successfully!")