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

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  formState: {
    [key: string]: boolean | undefined;
  };
  setFormState: Dispatch<
    SetStateAction<{
      [key: string]: boolean | undefined;
    }>
  >;
  validation: (ValidationRules | ValidationSchema)[];
  label: string;
  setFormError: Dispatch<
    SetStateAction<{
      [key: string]: boolean;
    }>
  >;
}

const Checkbox = ({
  formState,
  setFormState,
  setFormError,
  validation,
  label,
  ...props
}: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState<boolean | undefined>(
    formState[props.name ?? label] || props.defaultChecked
  );
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setIsChecked(formState[props.name ?? label]);
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
    if (validation.includes(ValidationRules.IS_CHECKED)) {
      if (!isChecked) {
        handleError("Pls accept the terms");
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
      [props.name ?? label]: e.target.checked,
    }));
    setIsChecked((prev) => !prev);
  };
  return (
    <>
      <label className="label justify-start">
        <input
          type="checkbox"
          onBlur={handleBlur}
          checked={isChecked}
          onChange={(e) => handleChange(e)}
          {...props}
        />
        <InputLabel label={label} isRequired={props.required ?? false} />
      </label>
      {error && <p className="error-text">{errorMessage}</p>}
    </>
  );
};

export default Checkbox;
