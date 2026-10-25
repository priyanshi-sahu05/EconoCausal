# EconoCausal - Double Machine Learning Documentation

## 1. Objective

The objective is to estimate the causal effect of customer discount on
revenue while controlling for observed confounding variables.

## 2. Treatment

- Treatment: `discount`
- The discount offered to the customer is the treatment variable.

## 3. Outcome

- Outcome: `revenue`
- Revenue generated from the customer transaction is the outcome variable.

## 4. Features / Confounders

The DML model uses the following observed features:

- `age`
- `income`
- `past_purchase`
- `product_price`

These variables are used to account for observed confounding.

## 5. Double Machine Learning

The project uses Microsoft's EconML library to estimate causal treatment
effects.

The DML model estimates:

- Individual Treatment Effect (ITE)
- Average Treatment Effect (ATE)

## 6. Model Result

The DML model was trained successfully on the mock retail dataset.

Individual treatment effects were successfully generated for the dataset,
and the average treatment effect was also calculated.

## 7. Dataset

The dataset contains 1000 synthetic retail customer records.

The data is synthetic and created for project development and testing.

## 8. Status

The treatment, outcome, features and first Double Machine Learning model
have been successfully prepared and executed.