import pandas as pd

def test_ite_results_file():
    df = pd.read_csv("data/ite_results.csv")
    assert not df.empty
    assert "customer_id" in df.columns
    assert "estimated_treatment_effect" in df.columns

def test_optimization_results_file():
    df = pd.read_csv("data/optimization_results.csv")
    assert not df.empty
    assert {"discount", "estimated_revenue", "total_cost"}.issubset(df.columns)
    assert (df["total_cost"] >= 0).all()
