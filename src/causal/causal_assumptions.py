"""
Causal assumptions for the EconoCausal retail pricing model.

Treatment:
    discount

Outcome:
    revenue

Confounders:
    age
    income
    past_purchase
    product_price
"""

# Variables used in the causal model
TREATMENT = "discount"
OUTCOME = "revenue"

CONFOUNDERS = [
    "age",
    "income",
    "past_purchase",
    "product_price",
]

# Domain assumptions
ASSUMPTIONS = {
    "discount_assignment": (
        "The discount offered to a customer may depend on "
        "customer characteristics and previous purchasing behavior."
    ),

    "revenue_generation": (
        "Revenue may depend on customer characteristics, "
        "previous purchasing behavior, product price, and the discount offered."
    ),

    "treatment_effect": (
        "The discount is assumed to have a causal effect on revenue."
    ),

    "confounding_control": (
        "Age, income, past purchase history, and product price "
        "are treated as observed confounders in this mock dataset."
    ),

    "no_unmeasured_confounding": (
        "For this mock dataset, we assume that the important common causes "
        "of discount and revenue have been observed."
    ),

    "data_quality": (
        "The dataset is synthetic and generated for project development; "
        "therefore, these assumptions are methodological assumptions "
        "rather than claims about real customer behavior."
    ),
}


def print_assumptions():
    """Display the causal variables and domain assumptions."""
    print("EconoCausal - Causal Domain Assumptions")
    print("=" * 50)

    print(f"Treatment: {TREATMENT}")
    print(f"Outcome: {OUTCOME}")

    print("\nConfounders:")
    for variable in CONFOUNDERS:
        print(f"- {variable}")

    print("\nDomain Assumptions:")
    for name, description in ASSUMPTIONS.items():
        print(f"- {name}: {description}")


if __name__ == "__main__":
    print_assumptions()