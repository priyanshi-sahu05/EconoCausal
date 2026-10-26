
EconoCausal – Causal ML Documentation

1. Project Overview

EconoCausal is a causal machine learning project for dynamic pricing. It estimates the effect of discounts on customer revenue and explores how causal estimates can support marketing and pricing decisions.

The project uses DoWhy for causal analysis, EconML for Double Machine Learning (DML), and Python scripts for optimization, validation, and result integration.

Note: The current results use a demonstration/mock dataset and should not be treated as production business recommendations.

---

2. Causal Graph (DAG)

Treatment Variable

- "discount" — the discount offered to a customer.

Outcome Variable

- "revenue" — the revenue generated from a customer.

Confounding Variables

- "age"
- "income"
- "past_purchase"
- "product_price"

Causal Relationships

The causal graph includes the following relationships:

- "age → discount"
- "age → revenue"
- "income → discount"
- "income → revenue"
- "past_purchase → discount"
- "past_purchase → revenue"
- "product_price → discount"
- "product_price → revenue"
- "discount → revenue"

The main relationship of interest is "discount → revenue". The confounding variables are included to account for factors that may influence both the treatment and the outcome.

---

3. Double Machine Learning (DML)

The DML model estimates the causal effect of discount on revenue while accounting for observed confounding variables.

- Treatment: "discount"
- Outcome: "revenue"
- Confounders: "age", "income", "past_purchase", "product_price"
- Library: EconML

The project also generates individual treatment effect (ITE) estimates, which represent the model-estimated effect for individual customers.

The estimates are saved to a CSV file for further analysis. These estimates depend on the quality of the dataset and the model assumptions.

---

4. Causal Validation and Refutation

The causal validation script uses DoWhy to estimate the effect of discount on revenue and perform a Random Common Cause refutation test.

Recorded Demonstration Result

- Original estimated causal effect: approximately "-30.34"
- Refuted estimate: approximately "-30.35"
- Refutation p-value: "0.86"

The estimate changed only slightly after adding a random common cause. This indicates that the estimate was stable under this particular test; it does not prove that the causal estimate is correct.

Other refutation methods, such as placebo treatment and data subset refuters, should be reported as completed only after their execution has been verified.

---

5. Optimization and Validation

The project includes scripts for pricing optimization, integration, and validation.

Implemented Workflow

1. Load the optimization results.
2. Integrate the available causal prediction results.
3. Generate a combined output and summary.
4. Validate the discount and revenue columns.
5. Check whether the discount allocations satisfy the implemented constraints.

Recorded Validation Output

- Records validated: "6 of 6"
- Invalid allocations: "0"
- Average discount: "17.5"
- Minimum discount: "5"
- Maximum discount: "30"
- Total predicted revenue: "14686.86"
- Average predicted revenue: "2447.81"

These are outputs from the current demonstration scripts, not proof of real-world revenue improvement. The optimization output should be checked to ensure that the revenue estimates genuinely use the DML predictions before describing the optimization as fully causal-model-driven.

Generated Output Files

- "data/causal_optimization_integrated.csv"
- "data/causal_optimization_summary.txt"
- "data/optimization_validation.csv"

---

6. API and Data Drift Detection

The Flask API provides endpoints for health checking, data summary, and a drift check.

- "/health" — checks whether the API is running.
- "/data-summary" — returns a summary of the dataset.
- "/drift-check" — compares reference and current data samples using statistical tests.

The demonstration drift check compares two portions of the available dataset. A detected drift in "product_price" is an experimental result, not evidence of live production drift.

---

7. Limitations and Future Improvements

- Validate the approach on real, representative retail data.
- Verify DML predictions and connect them correctly to the optimization objective.
- Compare optimized decisions against a clearly defined baseline.
- Test additional causal refutation methods.
- Monitor data drift using appropriate reference and live data.
- Evaluate the model using suitable statistical and business metrics.

8. Conclusion

EconoCausal brings together causal analysis, DML estimation, optimization scripts, validation, and a Flask API. The current implementation demonstrates the workflow on sample data. Further testing and real-data validation are required before using its estimates for actual pricing decisions.