import pandas as pd
import numpy as np

from econml.dml import CausalForestDML
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split


# =========================================================
# 1. LOAD DATA
# =========================================================

df = pd.read_csv("data/retail_data.csv")

feature_columns = [
    "age",
    "income",
    "past_purchase",
    "product_price"
]

X = df[feature_columns].values
T = df["discount"].values
Y = df["revenue"].values


# =========================================================
# 2. TRAIN / TEST SPLIT
# =========================================================

X_train, X_test, T_train, T_test, Y_train, Y_test = train_test_split(
    X,
    T,
    Y,
    test_size=0.20,
    random_state=42
)


# =========================================================
# 3. BASELINE CAUSAL FOREST MODEL
# =========================================================

baseline_model = CausalForestDML(
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

baseline_model.fit(Y_train, T_train, X=X_train)

baseline_ite = baseline_model.effect(X_test)


# =========================================================
# 4. TUNED CAUSAL FOREST MODEL
# =========================================================

tuned_model = CausalForestDML(
    model_y=RandomForestRegressor(
        n_estimators=200,
        max_depth=12,
        min_samples_leaf=5,
        random_state=42
    ),
    model_t=RandomForestRegressor(
        n_estimators=200,
        max_depth=12,
        min_samples_leaf=5,
        random_state=42
    ),
    n_estimators=200,
    min_samples_leaf=5,
    random_state=42
)

tuned_model.fit(Y_train, T_train, X=X_train)

tuned_ite = tuned_model.effect(X_test)


# =========================================================
# 5. AVERAGE TREATMENT EFFECT
# =========================================================

baseline_ate = np.mean(baseline_ite)
tuned_ate = np.mean(tuned_ite)


# =========================================================
# 6. RANDOM ROLLOUT VS CAUSAL TARGETING
# =========================================================

target_fraction = 0.20

n_target = max(1, int(len(X_test) * target_fraction))


# ---- Causal targeting ----
top_indices = np.argsort(tuned_ite)[-n_target:]

causal_targeted_uplift = np.sum(tuned_ite[top_indices])

causal_average_uplift = np.mean(tuned_ite[top_indices])


# ---- Random rollout ----
random_results = []

rng = np.random.default_rng(42)

for _ in range(100):

    random_indices = rng.choice(
        len(X_test),
        size=n_target,
        replace=False
    )

    random_uplift = np.sum(tuned_ite[random_indices])

    random_results.append(random_uplift)


random_results = np.array(random_results)

random_average_uplift = np.mean(random_results)


# =========================================================
# 7. UPLIFT IMPROVEMENT
# =========================================================

uplift_gain = (
    causal_targeted_uplift - random_average_uplift
)

uplift_percentage = (
    uplift_gain / abs(random_average_uplift) * 100
    if random_average_uplift != 0
    else 0
)


# =========================================================
# 8. MODEL COMPARISON
# =========================================================

print("\n==========================================")
print("24 SEP - CAUSAL UPLIFT VS RANDOM ROLLOUT")
print("==========================================")

print("\nDataset:")
print(f"Total samples: {len(df)}")
print(f"Training samples: {len(X_train)}")
print(f"Test samples: {len(X_test)}")

print("\nBaseline Model:")
print("Estimators: 100")
print("Minimum samples per leaf: 10")
print(f"Baseline ATE: {baseline_ate:.4f}")

print("\nTuned Model:")
print("Estimators: 200")
print("Minimum samples per leaf: 5")
print("Maximum tree depth: 12")
print(f"Tuned ATE: {tuned_ate:.4f}")

print("\n------------------------------------------")
print("UPLIFT POLICY COMPARISON")
print("------------------------------------------")

print(f"Target fraction: {target_fraction * 100:.0f}%")
print(f"Customers targeted: {n_target}")

print("\nCausal Targeting:")
print(f"Total predicted uplift: {causal_targeted_uplift:.4f}")
print(f"Average uplift per targeted customer: {causal_average_uplift:.4f}")

print("\nRandom Rollout:")
print(f"Average predicted uplift: {random_average_uplift:.4f}")

print("\nCausal targeting uplift over random:")
print(f"{uplift_gain:.4f}")

print("\nRelative improvement over random:")
print(f"{uplift_percentage:.2f}%")

print("\n==========================================")
print("TOP 10 CUSTOMERS BY PREDICTED ITE")
print("==========================================")

sorted_ite = np.sort(tuned_ite)[::-1]

for i, value in enumerate(sorted_ite[:10], start=1):
    print(f"Customer {i}: ITE = {value:.4f}")


print("\n==========================================")
print("24 SEP TASK COMPLETED SUCCESSFULLY!")
print("==========================================")