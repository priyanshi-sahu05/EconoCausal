from pathlib import Path
import pandas as pd

BASE_DIR = Path(__file__).resolve().parents[2]
DATA_DIR = BASE_DIR / "data"


def main():
    print("=" * 55)
    print("ECONOCAUSAL - CAUSAL + OPTIMIZATION INTEGRATION")
    print("=" * 55)

    # Load customer-level treatment effects
    ite_file = DATA_DIR / "ite_results.csv"
    if not ite_file.exists():
        raise FileNotFoundError(f"File not found: {ite_file}")

    ite = pd.read_csv(ite_file)

    required_ite = {"customer_id", "estimated_treatment_effect"}
    if not required_ite.issubset(ite.columns):
        raise ValueError("ITE file is missing required columns.")

    ite["customer_id"] = pd.to_numeric(
        ite["customer_id"], errors="coerce"
    )
    ite["estimated_treatment_effect"] = pd.to_numeric(
        ite["estimated_treatment_effect"], errors="coerce"
    )
    ite = ite.dropna(
        subset=["customer_id", "estimated_treatment_effect"]
    )
    ite["customer_id"] = ite["customer_id"].astype(int)

    # Load discount-option optimization results
    opt_file = DATA_DIR / "optimization_results.csv"
    if not opt_file.exists():
        raise FileNotFoundError(f"File not found: {opt_file}")

    opt = pd.read_csv(opt_file)

    print(f"\nCustomer treatment effects: {len(ite)}")
    print(f"Discount options: {len(opt)}")

    # Save the customer-level causal results separately
    customer_output = DATA_DIR / "causal_customer_results.csv"
    ite.to_csv(customer_output, index=False)

    # Save discount options separately
    options_output = DATA_DIR / "causal_optimization_integrated.csv"
    opt.to_csv(options_output, index=False)

    # Summary: distinguish customers from discount options
    summary_file = DATA_DIR / "causal_optimization_summary.txt"
    with open(summary_file, "w", encoding="utf-8") as f:
        f.write("EconoCausal Integration Summary\n")
        f.write("=" * 40 + "\n")
        f.write(f"Customers with ITE estimates: {len(ite)}\n")
        f.write(f"Discount options evaluated: {len(opt)}\n")
        f.write(
            "Average estimated treatment effect: "
            f"{ite['estimated_treatment_effect'].mean():.2f}\n"
        )
        f.write(
            "Note: Discount revenue estimates are illustrative, "
            "not validated causal counterfactual predictions.\n"
        )

    print(f"\nSaved customer results: {customer_output}")
    print(f"Saved discount options: {options_output}")
    print(f"Saved summary: {summary_file}")
    print("\nIntegration completed successfully.")


if __name__ == "__main__":
    main()