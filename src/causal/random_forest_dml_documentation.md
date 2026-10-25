# Random Forest DML Model

## Objective

Estimate Individual Treatment Effects (ITE) for the effect of customer
discount on revenue using a Random Forest based Double Machine Learning model.

## Treatment

- `discount`

## Outcome

- `revenue`

## Features

- `age`
- `income`
- `past_purchase`
- `product_price`

## Model

The model uses EconML's CausalForestDML with Random Forest based nuisance
models for treatment and outcome estimation.

## Results

The model was successfully trained on the synthetic retail dataset.

Individual Treatment Effects (ITE) were successfully estimated for the
customer records, and the Average Treatment Effect (ATE) was calculated.

## Dataset

The model uses 1000 synthetic retail records created for project development.

## Status

Random Forest based DML training and ITE estimation completed successfully.