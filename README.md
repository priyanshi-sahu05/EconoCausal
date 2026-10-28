EconoCausal

Dynamic Pricing Using Data Science and Machine Learning

1. Project Overview

EconoCausal is a causal machine learning project designed to estimate the effect of customer discounts on revenue and support data-driven pricing and marketing decisions.

The project uses Double Machine Learning (DML), causal inference, and budget-constrained discount optimization.

Note: The current implementation uses a mock retail dataset for demonstration.

2. Objectives

- Estimate the causal effect of discounts on revenue.
- Estimate Individual Treatment Effects (ITE) using DML.
- Validate causal estimates using refutation tests.
- Evaluate discount options under a marketing budget.
- Integrate pricing optimization results into a consolidated output.

3. Technologies Used

- Python
- Pandas and NumPy
- Scikit-learn
- EconML
- DoWhy
- Flask
- SciPy
- Git and GitHub

4. Dataset

The project uses "data/retail_data.csv".

The dataset includes customer characteristics and retail variables such as:

- Age
- Income
- Past purchase history
- Product price
- Discount
- Revenue

5. Main Modules

- "src/causal/define_dag.py" — defines the causal graph.
- "src/causal/dml_model.py" — estimates individual treatment effects.
- "src/causal/validate_causal.py" — performs causal validation and refutation.
- "src/causal/optimize_pricing.py" — evaluates discount options against a budget.
- "src/causal/integrated_pipeline.py" — combines optimization results and generates a summary.
- "src/api/app.py" — provides API endpoints.
- "src/causal/drift_detector.py" — demonstrates data drift detection.

6. Setup

Create and activate a Python virtual environment:

python -m venv .venv
.\.venv\Scripts\Activate.ps1

Install the required packages:

python -m pip install pandas numpy scikit-learn econml dowhy flask scipy

7. Run the Project

Run the DML model:

python src/causal/dml_model.py

Run pricing optimization:

python src/causal/optimize_pricing.py

Run the integration pipeline:

python src/causal/integrated_pipeline.py

8. Output Files

The project generates or uses the following result files:

- "data/ite_results.csv" — estimated individual treatment effects.
- "data/optimization_results.csv" — discount optimization results.
- "data/causal_optimization_integrated.csv" — integrated optimization output.
- "data/causal_optimization_summary.txt" — integration summary.

- "data/pricing_option_summary.csv" — budget-feasible discount options and selected option.
- "src/causal/optimization.py" — analyzes discount options within the marketing budget.

9. Current Integration Result

The integration pipeline ran successfully and processed six discount-option records in the current output. These records demonstrate the integration workflow; they do not represent six real customers.

10. Limitations

- Results depend on the quality and assumptions of the mock dataset.
- Estimated causal effects are not guaranteed to generalize to real retail customers.
- Optimization outputs should be validated before real business use.

11. Future Improvements

- Use real retail transaction data.
- Improve causal model validation.
- Connect optimization directly to validated customer-level treatment effects.
- Add visualizations and a pricing dashboard.
- Expand automated testing and evaluation.

12. Team and Contributions

This project is developed as part of an AI/ML project. Individual contributions should be documented according to the tasks completed by each team member.