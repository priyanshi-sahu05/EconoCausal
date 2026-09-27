# Causal Validity Analysis

## Objective

The objective of this analysis is to review the DoWhy refutation
tests performed on the estimated causal effect of discount on revenue.

## Refutation Tests Reviewed

- **Random Common Cause:** Completed
- **Placebo Treatment:** Completed
- **Data Subset:** Completed

## Test Coverage

Refutation tests documented: 3/3

## Interpretation

The Random Common Cause test checks whether adding a random variable
substantially changes the estimated causal effect.

The Placebo Treatment test checks whether a causal effect is obtained
when the real treatment is replaced with a placebo treatment.

The Data Subset test checks whether the estimated causal effect is
reasonably stable when the analysis is performed on a subset of the
available observations.

## Causal Validity Assessment

The three refutation tests provide complementary checks of causal
robustness. The results should be reviewed together with the original
causal graph, identified estimand, and treatment/outcome definitions.

Successful execution of the refutation procedures provides supporting
evidence for the causal analysis, but does not by itself prove that
the causal assumptions are universally correct.

## Conclusion

The DoWhy refutation analysis was completed successfully for the
EconoCausal project. The results have been documented for the causal
audit and can be used as supporting evidence when reviewing the
estimated effect of discount on revenue.
