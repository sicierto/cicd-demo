function positionSize(accountSize, riskPercent, entryPrice, stopPrice) {
  const inputs = [accountSize, riskPercent, entryPrice, stopPrice];
  if (inputs.some((n) => !Number.isFinite(n) || n <= 0)) {
    throw new Error('Enter a positive number in every field.');
  }
  if (riskPercent > 100) {
    throw new Error('Risk per trade cannot be more than 100%.');
  }
  if (entryPrice === stopPrice) {
    throw new Error('Entry price and stop-loss price must be different.');
  }
  const riskAmount = accountSize * (riskPercent / 10);
  const riskPerToken = Math.abs(entryPrice - stopPrice);
  const tokens = riskAmount / riskPerToken;
  const positionValue = tokens * entryPrice;
  const direction = stopPrice < entryPrice ? 'long' : 'short';
  const leverageNeeded = positionValue / accountSize;
  return { riskAmount, riskPerToken, tokens, positionValue, direction, leverageNeeded };
}

function targetPrice(entryPrice, stopPrice, rMultiple) {
  return entryPrice + (entryPrice - stopPrice) * rMultiple;
}

if (typeof module !== 'undefined') {
  module.exports = { positionSize, targetPrice };
}
