# EconoCausal – Week 2 Model Summary

## 1. Project Overview

EconoCausal is a causal machine learning system designed to estimate the effect of customer discounts on revenue.

The main objective is to move beyond simple correlation and estimate how a discount changes the expected revenue for individual customers.

The Week 2 work focuses on Double Machine Learning (DML), Individual Treatment Effect (ITE), model validation, feature importance and comparison with random rollout.

---

## 2. Treatment, Outcome and Features

### Treatment

The treatment variable is:

- `discount`

It represents the discount offered to a customer.

### Outcome

The outcome variable is:

- `revenue`

It represents the resulting customer revenue.

### Features / Confounders

The model uses the following customer and product characteristics:

- `age`
- `income`
- `past_purchase`
- `product_price`

These variables are used as input features for causal estimation.

---

## 3. Week 2 Model Development

The following work was completed during Week 2:

### 21 Sep – Initial DML Setup

Prepared:

- Treatment data
- Outcome data
- Feature matrix
- Initial EconML DML model

The data preparation was successfully completed.

### 22 Sep – DML and ITE Estimation

A Double Machine Learning model was trained using Random Forest models.

The model estimated Individual Treatment Effects (ITE) for individual customers.

The model execution was successful and ITE values were generated.

### 23 Sep – ITE Validation

ITE results were validated using:

- Outcome model metrics
- Treatment model metrics
- Average Treatment Effect (ATE)
- Individual Treatment Effects
- ITE statistics
- Feature importance

The validation and analysis completed successfully.

### 24 Sep – Uplift Comparison and Model Fine-Tuning

The causal uplift strategy was compared with a random rollout strategy.

A tuned causal forest model was also evaluated against the baseline model.

The comparison focused on predicted uplift