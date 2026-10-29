/**
 * Pure Deterministic UK Real Estate Financial Mathematics
 * Follows official HMRC residential Stamp Duty Land Tax (SDLT) progressive threshold bands
 * for England and Northern Ireland.
 */

export interface SDLTCalculationParams {
  price: number;
  buyerType: 'nextHome' | 'additionalHome' | 'firstTimeBuyer';
  isNonUKResident?: boolean;
}

export interface SDLTBandBreakdown {
  band: string;
  rate: number;
  taxableAmount: number;
  tax: number;
}

export interface SDLTResult {
  totalTax: number;
  effectiveRate: number;
  bands: SDLTBandBreakdown[];
}

export function calculateUKStampDuty(params: SDLTCalculationParams): SDLTResult {
  const { price, buyerType, isNonUKResident = false } = params;

  if (price <= 0) {
    return { totalTax: 0, effectiveRate: 0, bands: [] };
  }

  // Base surcharge: +3% across all bands for additional property / company purchases
  const surchargeRate = (buyerType === 'additionalHome' ? 3 : 0) + (isNonUKResident ? 2 : 0);

  // Progressive tax bands:
  // Band 1: 0 to 250,000 (0% base)
  // Band 2: 250,001 to 925,000 (5% base)
  // Band 3: 925,001 to 1,500,000 (10% base)
  // Band 4: Over 1,500,000 (12% base)

  const rawBands = [
    { name: "Up to £250,000", threshold: 250000, baseRate: 0 },
    { name: "£250,001 to £925,000", threshold: 925000, baseRate: 5 },
    { name: "£925,001 to £1,500,000", threshold: 1500000, baseRate: 10 },
    { name: "Over £1,500,000", threshold: Infinity, baseRate: 12 },
  ];

  let remaining = price;
  let previousThreshold = 0;
  let totalTax = 0;
  const bands: SDLTBandBreakdown[] = [];

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

  return {
    totalTax: roundedTax,
    effectiveRate,
    bands,
  };
}

export interface MortgageParams {
  propertyPrice: number;
  depositPercentage: number;
  annualInterestRate: number;
  loanTermYears: number;
}

export interface MortgageResult {
  loanAmount: number;
  depositAmount: number;
  monthlyPayment: number;
  totalRepayment: number;
  totalInterest: number;
}

export function calculateUKMortgage(params: MortgageParams): MortgageResult {
  const { propertyPrice, depositPercentage, annualInterestRate, loanTermYears } = params;

  const depositAmount = (propertyPrice * depositPercentage) / 100;
  const loanAmount = propertyPrice - depositAmount;

  if (loanAmount <= 0) {
    return {
      loanAmount: 0,
      depositAmount: propertyPrice,
      monthlyPayment: 0,
      totalRepayment: 0,
      totalInterest: 0,
    };
  }

  const totalPayments = loanTermYears * 12;
  const monthlyRate = annualInterestRate / 100 / 12;

  let monthlyPayment = 0;
  if (monthlyRate === 0) {
    monthlyPayment = loanAmount / totalPayments;
  } else {
    // Deterministic amortization formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
    const factor = Math.pow(1 + monthlyRate, totalPayments);
    monthlyPayment = (loanAmount * monthlyRate * factor) / (factor - 1);
  }

  const totalRepayment = monthlyPayment * totalPayments;
  const totalInterest = totalRepayment - loanAmount;

  return {
    loanAmount: Math.round(loanAmount),
    depositAmount: Math.round(depositAmount),
    monthlyPayment: Math.round(monthlyPayment),
    totalRepayment: Math.round(totalRepayment),
    totalInterest: Math.round(totalInterest),
  };
}
