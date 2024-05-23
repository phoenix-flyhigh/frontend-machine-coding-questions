import {
  InputHTMLAttributes,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import { ValidationRules, ValidationSchema } from "../Interfaces";
import "./styles.css";
import InputLabel from "./InputLabel";

interface RadioGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  formState: {
    [key: string]: string | null;
  };
  setFormState: Dispatch<
    SetStateAction<{
      [key: string]: string | null;
    }>
  >;
  validation: (ValidationRules | ValidationSchema)[];
  label: string;
  options: string[];
  setFormError: Dispatch<
    SetStateAction<{
      [key: string]: boolean;
    }>
  >;
}

const RadioGroup = ({
  formState,
  setFormState,
  label,
  options,
  validation,
  setFormError,
  ...props
}: RadioGroupProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setSelectedOption(formState[props.name ?? label]);
  }, [formState[props.name ?? label]]);

  const handleError = (errorMessage: string) => {
    setError(true);
    setErrorMessage(errorMessage);
    setFormError((prev) => ({ ...prev, [props.name ?? label]: true }));
  };

  const handleBlur = () => {
    if (!validation.length) {
      return;
    }
    if (validation.includes(ValidationRules.RADIO_REQUIRED)) {
      if (selectedOption === null) {
        handleError("This field is required.");
        return;
      }
    }
  };

  const handleChange = (option: string) => {
    setError(false);
    setErrorMessage("");
    setFormError((prev) => ({ ...prev, [props.name ?? label]: false }));
    setFormState((prev) => ({
      ...prev,
      [props.name ?? label]: option,
    }));
    setSelectedOption(option);
  };

  return (
    <>
      <div className="label">
        <InputLabel label={label} isRequired={props.required ?? false} />
        {options.map((option) => (
          <label key={option} className="flex items-center gap-1">
            <input
              type="radio"
              {...props}
              onBlur={handleBlur}
              checked={option === selectedOption}
              onChange={() => handleChange(option)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
      {error && <p className="error-text">{errorMessage}</p>}
    </>
  );
};

export default RadioGroup;
