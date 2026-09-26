import numpy as np
import pandas as pd

# Reproducible results
np.random.seed(42)

# Number of customers
n = 1000

# Customer and product characteristics
age = np.random.randint(18, 70, n)
income = np.random.normal(50000, 15000, n).clip(15000, 120000)
past_purchase = np.random.normal(5, 2, n).clip(0, 15)
product_price = np.random.normal(100, 20, n).clip(40, 180)

# Discount is influenced by customer characteristics
discount = (
    5
    + 0.00003 * income
    + 0.8 * past_purchase
    - 0.03 * age
    + np.random.normal(0, 2, n)
).clip(0, 30)

# Revenue depends on discount and customer characteristics
revenue = (
    20
    + 0.08 * income
    + 8 * past_purchase
    - 0.5 * age
    - 0.3 * product_price
    + 3.0 * discount
    + np.random.normal(0, 20, n)
)

# Create dataset
data = pd.DataFrame({
    "age": age,
    "income": income.round(2),
    "past_purchase": past_purchase.round(2),
    "product_price": product_price.round(2),
    "discount": discount.round(2),
    "revenue": revenue.round(2)
})

# Save dataset
data.to_csv("data/retail_data.csv", index=False)

print("Mock retail dataset created successfully!")
print(f"Rows: {len(data)}")
print("Columns:", list(data.columns))
print("\nFirst 5 rows:")
print(data.head())