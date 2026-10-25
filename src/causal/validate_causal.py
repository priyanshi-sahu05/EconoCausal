import pandas as pd
from dowhy import CausalModel

#Load retail dataset

df = pd.read_csv("data/retail_data.csv")

#Define causal graph

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

#Create causal model

model = CausalModel(
data=df,
treatment="discount",
outcome="revenue",
graph=graph
)

#Identify causal effect

identified_estimand = model.identify_effect()

print("Causal effect identified successfully!")

#Estimate causal effect

estimate = model.estimate_effect(
identified_estimand,
method_name="backdoor.linear_regression"
)

print("\nEstimated Causal Effect:")
print(estimate)

#Run refutation test

refutation = model.refute_estimate(
identified_estimand,
estimate,
method_name="random_common_cause"
)

print("\nCausal Refutation Test Results:")
print(refutation)