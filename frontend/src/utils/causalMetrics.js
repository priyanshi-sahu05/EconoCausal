export function prepareUpliftData(results) {
  const sortedResults = [...results].sort(
    (a, b) => b.ite - a.ite
  );

  let cumulativeUplift = 0;

  const targetedCustomers = [0];
  const upliftValues = [0];

  sortedResults.forEach((customer, index) => {
    cumulativeUplift += customer.ite;

    const percentage =
      ((index + 1) / sortedResults.length) * 100;

    targetedCustomers.push(Number(percentage.toFixed(2)));
    upliftValues.push(
      Number(cumulativeUplift.toFixed(4))
    );
  });

  return {
    targetedCustomers,
    upliftValues
  };
}

export function prepareQiniData(results) {
  const sortedResults = [...results].sort(
    (a, b) => b.ite - a.ite
  );

  let cumulativeGain = 0;

  const targetedCustomers = [0];
  const qiniValues = [0];

  sortedResults.forEach((customer, index) => {
    cumulativeGain += customer.ite;

    const percentage =
      ((index + 1) / sortedResults.length) * 100;

    targetedCustomers.push(Number(percentage.toFixed(2)));
    qiniValues.push(
      Number(cumulativeGain.toFixed(4))
    );
  });

  const totalGain = qiniValues[qiniValues.length - 1];

  const randomBaseline = targetedCustomers.map(
    (percentage) =>
      Number(
        (
          (percentage / 100) *
          totalGain
        ).toFixed(4)
      )
  );

  return {
    targetedCustomers,
    qiniValues,
    randomBaseline
  };
}

export function calculateMetrics(results) {
  const iteValues = results.map(
    (customer) => customer.ite
  );

  const averageITE =
    iteValues.reduce(
      (sum, value) => sum + value,
      0
    ) / iteValues.length;

  const positiveITECount = iteValues.filter(
    (value) => value > 0
  ).length;

  const negativeITECount = iteValues.filter(
    (value) => value < 0
  ).length;

  const maximumITE = Math.max(...iteValues);
  const minimumITE = Math.min(...iteValues);

  return {
    averageITE: Number(averageITE.toFixed(3)),
    positiveITECount,
    negativeITECount,
    maximumITE: Number(maximumITE.toFixed(3)),
    minimumITE: Number(minimumITE.toFixed(3))
  };
}