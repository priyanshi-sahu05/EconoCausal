# EconoCausal – Causal Graph Documentation

## 1. Project Overview

EconoCausal is a causal machine learning project for studying the effect of customer discounts on revenue.

The project uses Double Machine Learning (DML) to estimate causal effects while accounting for observed confounding variables.

## 2. Causal Question

What is the causal effect of giving a discount to a customer on the resulting revenue?

## 3. Treatment

- discount – discount offered to the customer.

## 4. Outcome

- revenue – revenue generated from the customer transaction.

## 5. Confounders

- age – customer age.
- income – customer income.
- past_purchase – customer's previous purchasing behavior.
- product_price – original price of the product.

These variables may influence both discount assignment and revenue.

## 6. Causal Assumptions

1. Discount assignment may depend on customer characteristics and previous purchasing behavior.
2. Revenue may depend on customer characteristics, previous purchasing behavior, product price, and discount.
3. Discount is assumed to have a causal effect on revenue.
4. Age, income, past purchase history, and product price are treated as observed confounders.
5. The mock dataset assumes that important common causes of discount and revenue are represented by the observed confounders.
6. The dataset is synthetic and created for project development.

## 7. Causal Relationships

- Age → Discount
- Income → Discount
- Past Purchase → Discount
- Product Price → Discount
- Age → Revenue
- Income → Revenue
- Past Purchase → Revenue
- Product Price → Revenue
- Discount → Revenue

## 8. Model Inputs

Treatment: discount

Outcome: revenue

Confounders:
- age
- income
- past_purchase
- product_price

## 9. Validation

The causal model input validation confirms that the required treatment, outcome, and confounder variables are available in the dataset.