from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health_check():
    return {"status": "healthy"}


@app.get("/allocation")
def get_allocation():
    return {
        "results": [
            {
                "customerId": "C00001",
                "ite": 0.72,
                "recommendedDiscount": 20,
                "estimatedCost": 200,
                "eligible": True,
                "selected": True
            },
            {
                "customerId": "C00002",
                "ite": 0.41,
                "recommendedDiscount": 15,
                "estimatedCost": 150,
                "eligible": True,
                "selected": True
            },
            {
                "customerId": "C00003",
                "ite": -0.12,
                "recommendedDiscount": 0,
                "estimatedCost": 0,
                "eligible": False,
                "selected": False
            }
        ]
    }