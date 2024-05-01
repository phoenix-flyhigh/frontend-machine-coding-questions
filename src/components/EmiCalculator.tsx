import { useState, useEffect, useCallback } from "react";
import NumberInput from "./NumberInput";
import Slider from "./Slider";

const EmiCalculator = () => {
  const tenureInMonthsRange = [12, 24, 36, 48, 60];

  const [totalCost, setTotalCost] = useState(0);
  const [interestRate, setInterestRate] = useState(7);
  const [processingFeePercent, setProcessingFee] = useState(1);
  const [downPayment, setDownPayment] = useState(0);
  const [tenure, setTenure] = useState(tenureInMonthsRange[0]);

  const processingFee =
    (processingFeePercent / 100) * (totalCost - downPayment);
  const totalDownPayment = downPayment + processingFee;
  const [emi, setEmi] = useState(0);

  const calculateEmiPerMonth = useCallback(
    (downPayment: number) => {
      if (!totalCost) return 0;
      // EMI amount = [P x R x (1+R)^N]/[(1+R)^N-1]
      const principal = totalCost - downPayment;

      const rate = interestRate / 100;
      const numOfYears = tenure / 12;

      const emi =
        (principal * rate * (1 + rate) ** numOfYears) /
        ((1 + rate) ** numOfYears - 1);

      return Number((emi / 12).toFixed());
    },
    [totalCost, interestRate, tenure]
  );

  const calculateDownPayment = useCallback(
    (emi: number) => {
      if (!totalCost) return 0;
      const maxEmi = calculateEmiPerMonth(0);
      if (!maxEmi) return 0;
      const downPaymentPercent = 100 - (emi / maxEmi) * 100;
      const dp = Number((downPaymentPercent / 100) * totalCost).toFixed();
      return Number(dp);
    },
    [totalCost, calculateEmiPerMonth]
  );

  useEffect(() => {
    if (!(totalCost > 0)) {
      setDownPayment(0);
      setEmi(0);
    }

    const emi = calculateEmiPerMonth(downPayment);

    setEmi(emi);
  }, [tenure, totalCost, downPayment, calculateEmiPerMonth]);

  const handleDownPayment = (value: number) => {
    setDownPayment(value);
    const emi = calculateEmiPerMonth(value);
    setEmi(emi);
  };

  const handleEmi = (value: number) => {
    setEmi(value);
    const downPayment = calculateDownPayment(value);
    setDownPayment(downPayment);
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <h1 className="text-4xl font-bold">Emi calculator</h1>
      <NumberInput
        title="Total cost of Asset"
        value={totalCost}
        handleChange={(e) => setTotalCost(Number(e.target.value))}
      />
      <NumberInput
        title="Interest Rate (in %)"
        value={interestRate}
        handleChange={(e) => setInterestRate(Number(e.target.value))}
        max={100}
      />
      <NumberInput
        title="Processing Fee (in %)"
        value={processingFeePercent}
        max={100}
        handleChange={(e) => setProcessingFee(Number(e.target.value))}
      />
      <h2 className="text-xl font-bold">Down Payment</h2>
      <Slider
        title={`Total Down Payment - ${totalDownPayment.toFixed()}`}
        min={0}
        max={totalCost}
        rangeStartValue="0%"
        rangeEndValue="100%"
        calculatedValue={downPayment.toFixed()}
        value={downPayment}
        handleChange={(value) => handleDownPayment(value)}
      />
      <h2 className="text-xl font-bold">Loan per month</h2>
      <Slider
        title={`Total Loan Amount - ${(emi * tenure).toFixed()}`}
        min={calculateEmiPerMonth(totalCost)}
        max={calculateEmiPerMonth(0)}
        calculatedValue={emi.toFixed()}
        value={emi}
        handleChange={(value) => handleEmi(value)}
      />
      <div className="flex justify-between items-center">
        {tenureInMonthsRange.map((s) => (
          <button
            key={s}
            onClick={() => setTenure(s)}
            className={`${
              s === tenure ? "bg-blue-400" : "bg-gray-300"
            } w-32 px-4 py-2 rounded-full flex justify-center items-center`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmiCalculator;
