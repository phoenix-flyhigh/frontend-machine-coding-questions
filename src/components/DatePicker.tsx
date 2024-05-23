import React, {
  ChangeEvent,
  Dispatch,
  InputHTMLAttributes,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { ValidationRules, ValidationSchema } from "../Interfaces";
import "./styles.css";
import InputLabel from "./InputLabel";

interface DatePickerProps extends InputHTMLAttributes<HTMLInputElement> {
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
  setFormError: Dispatch<
    SetStateAction<{
      [key: string]: boolean;
    }>
  >;
  minAge?: number;
  maxAge?: number;
}

const DatePicker = ({
  formState,
  setFormState,
  validation,
  label,
  setFormError,
  ...props
}: DatePickerProps) => {
  const [userInput, setUserInput] = useState<string>(
    formState[props.name ?? label] ?? ""
  );
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setUserInput(formState[props.name ?? label] ?? "");
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
    if (validation.includes(ValidationRules.REQUIRED)) {
      if (!userInput) {
        handleError("This field is required");
        return;
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setErrorMessage("");
    setFormError((prev) => ({ ...prev, [props.name ?? label]: false }));
    setFormState((prev) => ({
      ...prev,
      [props.name ?? label]: e.target.value,
    }));
    setUserInput(e.target.value);
  };
  return (
    <>
      <label className="label">
        <InputLabel label={label} isRequired={props.required ?? false} />
        <input
          type="date"
          {...props}
          onBlur={handleBlur}
          className="input-box"
          value={userInput}
          onChange={(e) => handleChange(e)}
        />
      </label>
      {error && <p className="error-text">{errorMessage}</p>}
    </>
  );
};

export default DatePicker;
