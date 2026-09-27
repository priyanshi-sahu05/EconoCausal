export function sampleResults(results, maxPoints = 1000) {
  if (!results || results.length <= maxPoints) {
    return results || [];
  }

  const step = results.length / maxPoints;
  const sampledResults = [];

  for (let index = 0; index < maxPoints; index++) {
    const sourceIndex = Math.floor(index * step);
    sampledResults.push(results[sourceIndex]);
  }

  return sampledResults;
}