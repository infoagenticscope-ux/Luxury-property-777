"use client";

import React, { useState, useMemo } from "react";
import { calculateUKStampDuty, calculateUKMortgage, SDLTCalculationParams } from "@/lib/sdlt";
import { formatGBP } from "@/lib/utils";
import { Calculator, HelpCircle, CheckCircle, Percent, PoundSterling } from "lucide-react";

interface StampDutyCalculatorProps {
  initialPrice: number;
}

export const StampDutyCalculator: React.FC<StampDutyCalculatorProps> = ({ initialPrice }) => {
  const [tab, setTab] = useState<"sdlt" | "mortgage">("sdlt");
  const [price, setPrice] = useState<number>(initialPrice);
  const [buyerType, setBuyerType] = useState<SDLTCalculationParams["buyerType"]>("nextHome");
  const [isNonUKResident, setIsNonUKResident] = useState<boolean>(false);

  // Mortgage inputs
  const [depositPercent, setDepositPercent] = useState<number>(25);
  const [interestRate, setInterestRate] = useState<number>(4.8);
  const [loanTerm, setLoanTerm] = useState<number>(25);

  // Deterministic SDLT Calculation
  const sdltResult = useMemo(() => {
    return calculateUKStampDuty({
      price,
      buyerType,
      isNonUKResident,
    });
  }, [price, buyerType, isNonUKResident]);

  // Deterministic Mortgage Calculation
  const mortgageResult = useMemo(() => {
    return calculateUKMortgage({
      propertyPrice: price,
      depositPercentage: depositPercent,
      annualInterestRate: interestRate,
      loanTermYears: loanTerm,
    });
  }, [price, depositPercent, interestRate, loanTerm]);

  return (
    <div className="w-full rounded-2xl glass-panel border border-gold-400/25 p-5 sm:p-6 shadow-2xl">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-3">
        <div className="flex items-center space-x-2.5">
          <Calculator className="w-5 h-5 text-gold-400" />
          <h4 className="font-cinzel text-base sm:text-lg font-bold text-white">
            UK Financial Advisory Tools
          </h4>
        </div>

        <div className="inline-flex p-1 rounded-xl bg-black/60 border border-gold-400/20 self-start sm:self-auto">
          <button
            onClick={() => setTab("sdlt")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
              tab === "sdlt"
                ? "bg-gradient-to-r from-gold-400 to-gold-500 text-black shadow-md"
                : "text-gray-400 hover:text-white"
            }`}
          >
            HMRC Stamp Duty (SDLT)
          </button>
          <button
            onClick={() => setTab("mortgage")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
              tab === "mortgage"
                ? "bg-gradient-to-r from-gold-400 to-gold-500 text-black shadow-md"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Mortgage Repayment
          </button>
        </div>
      </div>

      {/* Property Purchase Price Field */}
      <div className="pt-4 pb-5">
        <label className="text-[11px] uppercase tracking-wider text-gold-300 font-medium block mb-1.5">
          Property Purchase Price (£ GBP)
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold-400 font-serif font-bold text-lg">
            £
          </span>
          <input
            type="number"
            min="100000"
            max="100000000"
            step="50000"
            value={price}
            onChange={(e) => setPrice(Math.max(0, Number(e.target.value)))}
            className="glass-input w-full pl-9 pr-4 py-2.5 rounded-xl text-base font-semibold text-white"
          />
        </div>
      </div>

      {/* ============================================================== */}
      {/* TAB 1: HMRC STAMP DUTY (SDLT) */}
      {/* ============================================================== */}
      {tab === "sdlt" && (
        <div className="space-y-5 animate-fade-in">
          {/* Buyer Type Toggle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] uppercase tracking-wider text-gray-400 block mb-1">
                Purchaser Status
              </label>
              <select
                value={buyerType}
                onChange={(e) => setBuyerType(e.target.value as any)}
                className="glass-input w-full px-3 py-2 rounded-xl text-xs appearance-none cursor-pointer"
              >
                <option value="nextHome" className="bg-[#0e1017]">Next Home (Main Residence)</option>
                <option value="additionalHome" className="bg-[#0e1017]">Additional Property / Buy-to-Let (+3%)</option>
                <option value="firstTimeBuyer" className="bg-[#0e1017]">First-Time UK Buyer</option>
              </select>
            </div>

            {/* Non-UK Resident Surcharge Checkbox */}
            <div className="flex items-center space-x-3 pt-6">
              <input
                type="checkbox"
                id="nonUkResident"
                checked={isNonUKResident}
                onChange={(e) => setIsNonUKResident(e.target.checked)}
                className="w-4 h-4 accent-[#D4AF37] rounded cursor-pointer"
              />
              <label htmlFor="nonUkResident" className="text-xs text-gray-300 cursor-pointer">
                Non-UK Resident (+2% Surcharge)
              </label>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-black/80 via-black/50 to-black/80 border border-gold-400/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-gray-400 block">
                Total Stamp Duty Payable
              </span>
              <span className="font-cinzel text-2xl sm:text-3xl font-bold gold-text-gradient">
                {formatGBP(sdltResult.totalTax)}
              </span>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-[10px] uppercase tracking-widest text-gray-400 block">
                Effective Tax Rate
              </span>
              <span className="text-lg font-bold text-gold-300">
                {sdltResult.effectiveRate}%
              </span>
            </div>
          </div>

          {/* Progressive Band Breakdown Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-gray-400">
                  <th className="py-2 font-medium">HMRC Tax Band</th>
                  <th className="py-2 font-medium text-center">Rate</th>
                  <th className="py-2 font-medium text-right">Taxable Amount</th>
                  <th className="py-2 font-medium text-right">Tax Payable</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-300">
                {sdltResult.bands.map((band, idx) => (
                  <tr key={idx} className="hover:bg-white/5">
                    <td className="py-2 text-white">{band.band}</td>
                    <td className="py-2 text-center text-gold-300 font-mono">{band.rate}%</td>
                    <td className="py-2 text-right">{formatGBP(band.taxableAmount)}</td>
                    <td className="py-2 text-right font-semibold text-white">{formatGBP(band.tax)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-[10px] text-gray-500 italic">
            * Deterministic calculation based on statutory HMRC rates for England and Northern Ireland residential properties.
          </p>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: MORTGAGE ESTIMATOR */}
      {/* ============================================================== */}
      {tab === "mortgage" && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] uppercase tracking-wider text-gray-400 block mb-1">
                Deposit Percentage ({depositPercent}%)
              </label>
              <input
                type="range"
                min="10"
                max="60"
                step="5"
                value={depositPercent}
                onChange={(e) => setDepositPercent(Number(e.target.value))}
                className="w-full accent-[#D4AF37]"
              />
              <span className="text-xs text-gold-300 font-mono mt-1 block">
                Deposit: {formatGBP(mortgageResult.depositAmount)}
              </span>
            </div>

            <div>
              <label className="text-[11px] uppercase tracking-wider text-gray-400 block mb-1">
                Interest Rate ({interestRate}%)
              </label>
              <input
                type="number"
                min="1"
                max="15"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="glass-input w-full px-3 py-1.5 rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="text-[11px] uppercase tracking-wider text-gray-400 block mb-1">
                Term ({loanTerm} Years)
              </label>
              <select
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="glass-input w-full px-3 py-1.5 rounded-xl text-xs appearance-none"
              >
                <option value="15" className="bg-[#0e1017]">15 Years</option>
                <option value="20" className="bg-[#0e1017]">20 Years</option>
                <option value="25" className="bg-[#0e1017]">25 Years</option>
                <option value="30" className="bg-[#0e1017]">30 Years</option>
              </select>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="p-4 rounded-xl bg-black/70 border border-gold-400/20 grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-gray-400 block">
                Monthly Repayment
              </span>
              <span className="font-cinzel text-xl sm:text-2xl font-bold gold-text-gradient">
                {formatGBP(mortgageResult.monthlyPayment)} / mo
              </span>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-wider text-gray-400 block">
                Total Loan Amount
              </span>
              <span className="text-base sm:text-lg font-semibold text-white">
                {formatGBP(mortgageResult.loanAmount)}
              </span>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-wider text-gray-400 block">
                Total Interest Payable
              </span>
              <span className="text-base sm:text-lg font-semibold text-gray-300">
                {formatGBP(mortgageResult.totalInterest)}
              </span>
            </div>
          </div>

          <p className="text-[10px] text-gray-500 italic">
            * Pure deterministic repayment estimate assuming capital and interest repayment over the full term.
          </p>
        </div>
      )}
    </div>
  );
};
