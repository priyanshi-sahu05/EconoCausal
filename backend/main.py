
from pathlib import Path

import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parent
ITE_RESULTS_PATH = BASE_DIR / "data" / "ite_results.csv"


@app.get("/health")
def health_check():
    return {"status": "healthy"}


@app.get("/allocation")
def get_allocation_results():
    if not ITE_RESULTS_PATH.exists():
        raise HTTPException(
            status_code=404,
            detail=f"ITE results file not found: {ITE_RESULTS_PATH}",
        )

    try:
        df = pd.read_csv(ITE_RESULTS_PATH)

        if df.empty:
            return {"results": []}

        df = df.astype(object).where(pd.notna(df), None)

        return {"results": df.to_dict(orient="records")}

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to read ITE results: {exc}",
        )
