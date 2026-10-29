// Verification test for deterministic real estate math
function calculateUKStampDuty(params) {
  const { price, buyerType, isNonUKResident = false } = params;
  if (price <= 0) return { totalTax: 0, effectiveRate: 0, bands: [] };

  const surchargeRate = (buyerType === 'additionalHome' ? 3 : 0) + (isNonUKResident ? 2 : 0);

  const rawBands = [
    { name: "Up to £250,000", threshold: 250000, baseRate: 0 },
    { name: "£250,001 to £925,000", threshold: 925000, baseRate: 5 },
    { name: "£925,001 to £1,500,000", threshold: 1500000, baseRate: 10 },
    { name: "Over £1,500,000", threshold: Infinity, baseRate: 12 },
  ];

  let previousThreshold = 0;
  let totalTax = 0;
  const bands = [];

  for (const b of rawBands) {
    if (price > previousThreshold) {
      const bandCapacity = b.threshold - previousThreshold;
      const taxableInThisBand = Math.min(Math.max(0, price - previousThreshold), bandCapacity);
      const effectiveBandRate = b.baseRate + surchargeRate;
      const tax = (taxableInThisBand * effectiveBandRate) / 100;

      if (taxableInThisBand > 0) {
        bands.push({
          band: b.name,
          rate: effectiveBandRate,
          taxableAmount: taxableInThisBand,
          tax: Math.round(tax),
        });
        totalTax += tax;
      }
      previousThreshold = b.threshold;
    }
  }

  const roundedTax = Math.round(totalTax);
  const effectiveRate = price > 0 ? Number(((roundedTax / price) * 100).toFixed(2)) : 0;
  return { totalTax: roundedTax, effectiveRate, bands };
}

// Test case 1: £1,000,000 residential primary home purchase
// Band 1: 0 - 250k: £0
// Band 2: 250k - 925k (675k @ 5%): £33,750
// Band 3: 925k - 1,000k (75k @ 10%): £7,500
// Total expected: £41,250
const r1 = calculateUKStampDuty({ price: 1000000, buyerType: 'nextHome' });
console.log("£1M Primary SDLT:", r1.totalTax, "Expected: 41250", r1.totalTax === 41250 ? "PASS" : "FAIL");

// Test case 2: £10,000,000 prime London mansion purchase (Next Home)
// Band 1: £0
// Band 2: 675k @ 5% = £33,750
// Band 3: 575k @ 10% = £57,500
// Band 4: (10M - 1.5M = 8.5M) @ 12% = £1,020,000
// Total expected: 33750 + 57500 + 1020000 = £1,111,250
const r2 = calculateUKStampDuty({ price: 10000000, buyerType: 'nextHome' });
console.log("£10M Primary SDLT:", r2.totalTax, "Expected: 1111250", r2.totalTax === 1111250 ? "PASS" : "FAIL");
