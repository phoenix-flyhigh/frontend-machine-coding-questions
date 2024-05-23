interface InputLabelProps {
  label: string;
  isRequired: boolean;
}

const InputLabel = ({ label, isRequired }: InputLabelProps) => {
  return (
    <span className="label-text">{`${label}${isRequired ? "*" : ""}`}:</span>
  );
};

export default InputLabel;
