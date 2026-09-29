const allocationResults = Array.from(
  { length: 500 },
  (_, index) => {
    const customerNumber = index + 1;

    const ite = Number(
      (
        Math.sin(customerNumber * 0.37) * 0.45 +
        Math.cos(customerNumber * 0.13) * 0.15 +
        0.1
      ).toFixed(3)
    );

    const recommendedDiscount =
      ite >= 0.5 ? 20 :
      ite >= 0.3 ? 15 :
      ite > 0 ? 10 : 0;

    const estimatedCost = recommendedDiscount * 10;

    return {
      customerId: `C${String(customerNumber).padStart(5, "0")}`,
      ite,
      recommendedDiscount,
      estimatedCost,
      eligible: ite > 0,
      selected: ite > 0
    };
  }
);

export default allocationResults;