# EconoCausal – Causal ML Documentation

## 1. Project Overview

EconoCausal is a causal machine learning project for dynamic pricing.
The objective is to estimate the causal effect of discounts on customer
revenue and use these estimates for better pricing and marketing decisions.

The project uses causal inference techniques, Double Machine Learning (DML),
and optimization methods.

---

## 2. Causal Graph (DAG)

### Treatment

The treatment variable is:

- `discount`

It represents the discount offered to a customer.

### Outcome

The outcome variable is:

- `revenue`

It represents the revenue generated from the customer.

### Confounding Variables

The following variables are treated as confounders in the project:

- `age`
- `income`
- `past_purchase`
- `product_price`

These variables can influence both the discount offered and the resulting
revenue.

### Causal Relationships

The causal graph contains the following relationships:

- `age → discount`
- `age → revenue`
- `income → discount`
- `income → revenue`
- `past_purchase → discount`
- `past_purchase → revenue`
- `product_price → discount`
- `product_price → revenue`
- `discount → revenue`

The main causal relationship of interest is:

**discount → revenue**

The objective is to estimate how changing the discount affects revenue
while accounting for the identified confounding variables.
---

## 3. Double Machine Learning (DML) Model

Double Machine Learning (DML) is used to estimate the causal effect of
the discount on revenue while accounting for confounding variables.

### Treatment Variable

- `discount`

### Outcome Variable

- `revenue`

### Confounders

- `age`
- `income`
- `past_purchase`
- `product_price`

### DML Objective

The main objective of the DML model is to estimate the Individual
Treatment Effect (ITE) for customers.

ITE represents the estimated change in revenue for an individual
customer when the discount treatment changes.

### Model Approach

The DML implementation uses machine learning models to estimate the
relationship between the treatment, outcome, and observed customer
characteristics.

The project uses the EconML library for Double Machine Learning.

The estimated treatment effects can later be used by the optimization
module to determine personalized discounts under a marketing budget
constraint.
---

## 4. Causal Refutation Tests

Causal refutation tests are used to check the robustness and reliability
of the estimated causal effect.

The project uses DoWhy for causal validation and refutation.

### Purpose

The refutation tests help determine whether the estimated causal effect
is sensitive to changes in the data or model assumptions.

### Planned Refutation Methods

The following tests are considered for validating the causal estimate:

1. Random Common Cause Test
2. Placebo Treatment Refuter
3. Data Subset Refuter

### Interpretation

A stable causal estimate after refutation provides additional evidence
that the estimated treatment effect is not driven only by random noise
or the specific structure of the dataset.

The results of the refutation tests will be recorded and analyzed as
part of the causal model validation process.
---

## 5. Optimization

The optimization module will use the estimated causal treatment effects
to support dynamic pricing and marketing decisions.

### Objective

The objective is to select appropriate discount levels while considering
the available marketing budget.

The causal treatment effects estimated by the DML model will be used as
inputs for the optimization process.

### Optimization Process

The planned workflow is:

1. Estimate individual treatment effects using DML.
2. Identify customers who are likely to respond positively to discounts.
3. Consider the available marketing budget.
4. Select suitable discount allocations.
5. Estimate the expected revenue impact.
6. Compare the optimized strategy with the baseline strategy.

### Optimization Tool

The project plans to use **SciPy** for solving the optimization problem.

The optimization module will connect the causal ML results with the
business objective of maximizing the expected benefit from the available
marketing budget.