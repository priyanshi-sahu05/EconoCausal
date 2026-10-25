from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
from pathlib import Path
import sys

app = Flask(__name__)
CORS(app)

PROJECT_ROOT = Path(__file__).resolve().parents[2]
DATA_PATH = PROJECT_ROOT / "data" / "retail_data.csv"

# Allow importing the drift detector from src/causal
sys.path.insert(0, str(PROJECT_ROOT / "src"))
from causal.drift_detector import detect_data_drift


@app.route("/")
def home():
    return jsonify({
        "project": "EconoCausal",
        "status": "API is running"
    })


@app.route("/health")
def health():
    return jsonify({
        "status": "healthy",
        "project": "EconoCausal"
    })


@app.route("/data-summary")
def data_summary():
    if not DATA_PATH.exists():
        return jsonify({"error": "Retail dataset not found"}), 404

    df = pd.read_csv(DATA_PATH)

    return jsonify({
        "rows": int(df.shape[0]),
        "columns": list(df.columns),
        "missing_values": {
            str(k): int(v)
            for k, v in df.isnull().sum().items()
        }
    })


@app.route("/drift-check")
def drift_check():
    if not DATA_PATH.exists():
        return jsonify({"error": "Retail dataset not found"}), 404

    df = pd.read_csv(DATA_PATH)

    if len(df) < 2:
        return jsonify({"error": "Not enough rows to compare"}), 400

    reference_df = df.iloc[:len(df) // 2].copy()
    current_df = df.iloc[len(df) // 2:].copy()

    results = detect_data_drift(reference_df, current_df)

    return jsonify({
        "project": "EconoCausal",
        "reference_rows": len(reference_df),
        "current_rows": len(current_df),
        "note": "Demo comparison of two dataset portions, not live production drift.",
        "drift_results": results
    })

@app.route("/allocation-results", methods=["GET"])
def allocation_results():
    results_path = PROJECT_ROOT / "data" / "optimization_results.csv"

    if not results_path.exists():
        return jsonify({"error": "Allocation results not found"}), 404

    df = pd.read_csv(results_path)

    return jsonify({
        "count": len(df),
        "results": df.to_dict(orient="records")
    })


if __name__ == "__main__":
    app.run(debug=True)