import pandas as pd
from dowhy import CausalModel

# Load mock retail dataset
data = pd.read_csv("data/retail_data.csv")

# Define causal variables
treatment = "discount"
outcome = "revenue"

# Confounders:
# These variables can influence both the discount offered
# and the customer's revenue.
confounders = [
    "age",
    "income",
    "past_purchase",
    "product_price"
]

# Causal DAG
causal_graph = """
digraph {
    age -> discount;
    income -> discount;
    past_purchase -> discount;
    product_price -> discount;

    age -> revenue;
    income -> revenue;
    past_purchase -> revenue;
    product_price -> revenue;

    discount -> revenue;
}
"""

# Create DoWhy causal model
model = CausalModel(
    data=data,
    treatment=treatment,
    outcome=outcome,
    graph=causal_graph
)

print("Causal model created successfully!")
print()
print("Treatment:", treatment)
print("Outcome:", outcome)
print("Confounders:", confounders)
print()
print("Causal DAG:")
print(causal_graph)

# Identify the causal effect
identified_estimand = model.identify_effect()

print("Identified causal estimand:")
print(identified_estimand)