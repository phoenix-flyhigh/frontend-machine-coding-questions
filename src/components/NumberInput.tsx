interface NumberInputProps {
  title: string;
  value: number;
  max?: number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NumberInput = ({ title, value, max, handleChange }: NumberInputProps) => {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-lg font-semibold">{title}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => handleChange(e)}
        className="border-black border-b-2 p-2 focus:outline-none"
        max={max}
        step={1}
      />
    </div>
  );
};

export default NumberInput;
