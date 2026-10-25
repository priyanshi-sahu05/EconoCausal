# DoWhy Refutation Tests

## Objective

The purpose of the refutation tests is to validate the robustness
of the estimated causal effect of discount on revenue.

## Treatment

Discount

## Outcome

Revenue

## Confounders

- Age
- Income
- Past Purchase
- Product Price

## Refutation Tests

### 1. Random Common Cause

A random common cause is added to the model to check whether the
estimated causal effect remains stable.

### 2. Placebo Treatment

A placebo treatment is used to check whether a causal effect appears
when the actual treatment is replaced by a randomly generated placebo.

### 3. Data Subset

The model is re-estimated using a subset of the data to check whether
the estimated causal effect remains reasonably stable.

## Conclusion

The DoWhy refutation tests were executed successfully. These tests
provide additional validation of the causal effect estimate and help
assess whether the estimated effect is sensitive to random variables,
placebo treatment, or changes in the data sample.