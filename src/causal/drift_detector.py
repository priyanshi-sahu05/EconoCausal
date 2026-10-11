from pathlib import Path
import pandas as pd
from scipy.stats import ks_2samp

PROJECT_ROOT = Path(__file__).resolve().parents[2]
DATA_PATH = PROJECT_ROOT / "data" / "retail_data.csv"

# Reference data used as the baseline
REFERENCE_PATH = DATA_PATH

# Demo only: compare two portions of the available dataset.
# Replace this with genuinely new incoming data when available.
def detect_data_drift(reference_df, current_df, threshold=0.05):
    results = {}

    common_columns = reference_df.select_dtypes(
        include="number"
    ).columns.intersection(
        current_df.select_dtypes(include="number").columns
    )

    for column in common_columns:
        reference_values = reference_df[column].dropna()
        current_values = current_df[column].dropna()

        if len(reference_values) == 0 or len(current_values) == 0:
            results[column] = {
                "drift_detected": None,
                "p_value": None,
                "message": "Insufficient data"
            }
            continue

        statistic, p_value = ks_2samp(
            reference_values,
            current_values
        )

        results[column] = {
            "drift_detected": bool(p_value < threshold),
            "p_value": round(float(p_value), 5)
        }

    return results


if __name__ == "__main__":
    if not DATA_PATH.exists():
        raise FileNotFoundError(
            f"Dataset not found: {DATA_PATH}"
        )

    df = pd.read_csv(DATA_PATH)

    # Split the mock dataset into reference and current samples.
    reference_df = df.iloc[:500].copy()
    current_df = df.iloc[500:].copy()

    drift_results = detect_data_drift(
        reference_df,
        current_df
    )

    print("EconoCausal - Data Drift Report")
    print("Reference rows:", len(reference_df))
    print("Current rows:", len(current_df))

    for column, result in drift_results.items():
        print(f"{column}: {result}")