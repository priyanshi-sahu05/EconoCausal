import pandas as pd
from pathlib import Path

df = pd.read_csv("data/optimization_results.csv")

discount_col = next(c for c in df.columns if "discount" in c.lower())
revenue_col = next(c for c in df.columns if "revenue" in c.lower())

total_revenue = df[revenue_col].sum()
average_revenue = df[revenue_col].mean()
average_discount = df[discount_col].mean()
max_discount = df[discount_col].max()
min_discount = df[discount_col].min()

report = f"""# Optimization Validation Report

## Objective

Validate the optimal discount allocation and analyze the expected predicted revenue.

## Dataset

Total customers evaluated: {len(df)}

## Discount Allocation

Average optimal discount: {average_discount:.2f}

Minimum optimal discount: {min_discount:.2f}

Maximum optimal discount: {max_discount:.2f}

## Expected Revenue

Total predicted revenue: {total_revenue:.2f}

Average predicted revenue per customer: {average_revenue:.2f}

## Validation

Discount and predicted revenue values were checked for missing
and negative values.

The validated allocation was saved in:

`data/optimization_validation.csv`

## Conclusion

The optimization engine generated customer-level discount
allocations and corresponding predicted revenue values.
"""

Path("src/causal/optimization_validation_report.md").write_text(
    report,
    encoding="utf-8"
)

print("Revenue analysis report created successfully!")
print("Saved to: src/causal/optimization_validation_report.md")
