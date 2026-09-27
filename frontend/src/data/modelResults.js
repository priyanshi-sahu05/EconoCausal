const modelResults = Array.from({ length: 5000 }, (_, index) => {
  const customerNumber = index + 1;

  const ite = Number(
    (
      Math.sin(customerNumber * 0.37) * 0.45 +
      Math.cos(customerNumber * 0.13) * 0.15 +
      0.1
    ).toFixed(3)
  );

  const treatment = customerNumber % 2 === 0 ? 1 : 0;

  const outcome = Math.round(
    50 +
      ite * 30 +
      (customerNumber % 20)
  );

  return {
    customerId: `C${String(customerNumber).padStart(5, "0")}`,
    treatment,
    outcome,
    ite
  };
});

export default modelResults;