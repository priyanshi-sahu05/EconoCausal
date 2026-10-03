from pathlib import Path
import pandas as pd


BASE_DIR = Path(__file__).resolve().parents[2]
DATA_DIR = BASE_DIR / "data"


def load_optimization_results():
    file_path = DATA_DIR / "optimization_results.csv"

    if not file_path.exists():
        raise FileNotFoundError(
            f"Optimization results not found: {file_path}"
        )

    df = pd.read_csv(file_path)

    if df.empty:
        raise ValueError("optimization_results.csv is empty.")

    return df


def integrate_causal_predictions(df):
    """
    Integrates causal/optimization prediction results
    with the customer-level optimization output.
    """

    result = df.copy()

    # Standardize common column names if present
    rename_map = {}

    for column in result.columns:
        lower = column.lower().strip()

        if lower == "optimal discount":
            rename_map[column] = "optimal_discount"

        elif lower == "predicted revenue":
            rename_map[column] = "predicted_revenue"

        elif lower == "customer id":
            rename_map[column] = "customer_id"

    result = result.rename(columns=rename_map)

    # Make sure important numeric columns are numeric
    for column in ["optimal_discount", "predicted_revenue"]:
        if column in result.columns:
            result[column] = pd.to_numeric(
                result[column],
                errors="coerce"
            )

    # Remove invalid prediction rows
    numeric_columns = [
        column
        for column in ["optimal_discount", "predicted_revenue"]
        if column in result.columns
    ]

    if numeric_columns:
        result = result.dropna(subset=numeric_columns)

    # Add integration status
    result["causal_optimization_status"] = "integrated"

    return result


def create_summary(df):
    summary = {
        "total_customers": len(df),
        "average_optimal_discount": None,
        "total_predicted_revenue": None,
    }

    if "optimal_discount" in df.columns:
        summary["average_optimal_discount"] = round(
            df["optimal_discount"].mean(), 2
        )

    if "predicted_revenue" in df.columns:
        summary["total_predicted_revenue"] = round(
            df["predicted_revenue"].sum(), 2
        )

    return summary


def main():
    print("=" * 60)
    print("ECONOCAUSAL - CAUSAL + OPTIMIZATION INTEGRATION")
    print("=" * 60)

    print("\n[1] Loading optimization results...")
    df = load_optimization_results()

    print(f"Loaded {len(df)} customer records.")
    print(f"Columns: {list(df.columns)}")

    print("\n[2] Integrating causal predictions...")
    integrated_df = integrate_causal_predictions(df)

    print(
        f"Integrated records: {len(integrated_df)}"
    )

    print("\n[3] Creating summary...")
    summary = create_summary(integrated_df)

    print(f"Total customers: {summary['total_customers']}")

    if summary["average_optimal_discount"] is not None:
        print(
            f"Average optimal discount: "
            f"{summary['average_optimal_discount']}"
        )

    if summary["total_predicted_revenue"] is not None:
        print(
            f"Total predicted revenue: "
            f"{summary['total_predicted_revenue']}"
        )

    # Save integrated result
    output_file = DATA_DIR / "causal_optimization_integrated.csv"
    integrated_df.to_csv(output_file, index=False)

    # Save summary
    summary_file = DATA_DIR / "causal_optimization_summary.txt"

    with open(summary_file, "w", encoding="utf-8") as file:
        file.write("EconoCausal Integration Summary\n")
        file.write("=" * 40 + "\n")
        file.write(
            f"Total customers: {summary['total_customers']}\n"
        )

        if summary["average_optimal_discount"] is not None:
            file.write(
                f"Average optimal discount: "
                f"{summary['average_optimal_discount']}\n"
            )

        if summary["total_predicted_revenue"] is not None:
            file.write(
                f"Total predicted revenue: "
                f"{summary['total_predicted_revenue']}\n"
            )

    print("\n[4] Integration completed successfully!")
    print(f"Saved: {output_file}")
    print(f"Saved: {summary_file}")


if __name__ == "__main__":
    main()