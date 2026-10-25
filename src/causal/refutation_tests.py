import pandas as pd
from dowhy import CausalModel


# Load retail dataset
DATA_PATH = "data/retail_data.csv"
df = pd.read_csv(DATA_PATH)

print("Data loaded successfully!")
print("Dataset shape:", df.shape)


# Variables
treatment = "discount"
outcome = "revenue"

confounders = [
    "age",
    "income",
    "past_purchase",
    "product_price"
]


# Create DoWhy causal model
model = CausalModel(
    data=df,
    treatment=treatment,
    outcome=outcome,
    common_causes=confounders
)

print("\nCausal model created successfully!")


# Identify causal effect
identified_estimand = model.identify_effect(
    proceed_when_unidentifiable=True
)

print("\nCausal effect identified successfully!")


# Estimate causal effect
estimate = model.estimate_effect(
    identified_estimand,
    method_name="backdoor.linear_regression"
)

print("\nEstimated Causal Effect:")
print(estimate.value)


# -------------------------------------------------
# REFUTATION TEST 1: Random Common Cause
# -------------------------------------------------

print("\n" + "=" * 60)
print("REFUTATION TEST 1: RANDOM COMMON CAUSE")
print("=" * 60)

refute_random = model.refute_estimate(
    identified_estimand,
    estimate,
    method_name="random_common_cause"
)

print(refute_random)


# -------------------------------------------------
# REFUTATION TEST 2: Placebo Treatment
# -------------------------------------------------

print("\n" + "=" * 60)
print("REFUTATION TEST 2: PLACEBO TREATMENT")
print("=" * 60)

refute_placebo = model.refute_estimate(
    identified_estimand,
    estimate,
    method_name="placebo_treatment_refuter"
)

print(refute_placebo)


# -------------------------------------------------
# REFUTATION TEST 3: Data Subset
# -------------------------------------------------

print("\n" + "=" * 60)
print("REFUTATION TEST 3: DATA SUBSET")
print("=" * 60)

refute_subset = model.refute_estimate(
    identified_estimand,
    estimate,
    method_name="data_subset_refuter",
    subset_fraction=0.8
)

print(refute_subset)


print("\n" + "=" * 60)
print("DoWhy refutation tests completed successfully!")
print("=" * 60)