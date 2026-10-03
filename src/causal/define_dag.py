import pandas as pd
from dowhy import CausalModel

# Load mock retail dataset
df = pd.read_csv("data/retail_data.csv")

print("Dataset loaded successfully")
print("Shape:", df.shape)
print("Columns:", list(df.columns))

# Causal DAG
graph = """
digraph {
    age -> discount;
    age -> revenue;

    income -> discount;
    income -> revenue;

    past_purchase -> discount;
    past_purchase -> revenue;

    product_price -> discount;
    product_price -> revenue;

    discount -> revenue;
}
"""

# Create DoWhy causal model
model = CausalModel(
    data=df,
    treatment="discount",
    outcome="revenue",
    graph=graph
)

print("\nCausal model created successfully!")
print("Treatment: discount")
print("Outcome: revenue")
print("Confounders: age, income, past_purchase, product_price")