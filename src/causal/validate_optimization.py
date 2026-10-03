import pandas as pd
from pathlib import Path

input_file = Path("data/optimization_results.csv")
output_file = Path("data/optimization_validation.csv")

df = pd.read_csv(input_file)

print("\n=== OPTIMIZATION VALIDATION ===")
print("Rows:", len(df))
print("Columns:", list(df.columns))

# Find important columns automatically
discount_col = next(
    (c for c in df.columns if "discount" in c.lower()),
    None
)

revenue_col = next(
    (c for c in df.columns if "revenue" in c.lower()),
    None
)

if discount_col is None or revenue_col is None:
    raise ValueError(
        f"Required columns not found. Available columns: {list(df.columns)}"
    )

# Basic validation
df["validation_flag"] = (
    df[discount_col].notna()
    & df[revenue_col].notna()
    & (df[discount_col] >= 0)
    & (df[revenue_col] >= 0)
)

print("\nDiscount column:", discount_col)
print("Revenue column:", revenue_col)

print("\nValid allocations:",
      int(df["validation_flag"].sum()),
      "of", len(df))

print("Invalid allocations:",
      int((~df["validation_flag"]).sum()))

print("\nAverage optimal discount:",
      round(df[discount_col].mean(), 2))

print("Maximum discount:",
      round(df[discount_col].max(), 2))

print("Minimum discount:",
      round(df[discount_col].min(), 2))

print("Total predicted revenue:",
      round(df[revenue_col].sum(), 2))

print("Average predicted revenue:",
      round(df[revenue_col].mean(), 2))

# Save validation result
df.to_csv(output_file, index=False)

print("\nValidation results saved to:")
print(output_file)
