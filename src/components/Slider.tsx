interface SliderProps {
  title: string;
  calculatedValue: string;
  rangeStartValue?: string;
  rangeEndValue?: string;
  min: number;
  max: number;
  value: number;
  handleChange: (value: number) => void;
}

const Slider = ({
  title,
  calculatedValue,
  rangeStartValue,
  rangeEndValue,
  min,
  max,
  value,
  handleChange,
}: SliderProps) => {
  return (
    <div className="flex flex-col gap-4">
      <label className="text-lg font-semibold underline">{title}</label>
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => handleChange(Number(e.target.value))}
      />
      <div className="flex items-center justify-between">
        <span>{rangeStartValue ?? min.toString()}</span>
        <span>{calculatedValue}</span>
        <span>{rangeEndValue ?? max.toString()}</span>
      </div>
    </div>
  );
};

export default Slider;
