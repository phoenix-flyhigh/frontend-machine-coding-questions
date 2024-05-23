import {
  InputHTMLAttributes,
  Dispatch,
  SetStateAction,
  useState,
  ChangeEvent,
  useEffect,
} from "react";
import { ValidationRules, ValidationSchema } from "../Interfaces";
import "./styles.css";
import InputLabel from "./InputLabel";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
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
}

const TextField: React.FC<TextFieldProps> = ({
  formState,
  setFormState,
  validation,
  label,
  setFormError,
  ...props
}: TextFieldProps) => {
  const [userInput, setUserInput] = useState("");
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
      if (!userInput.length) {
        handleError("This field is required");
        return;
      }
    }
    if (
      validation.includes(ValidationRules.PASSWORD_STRENGTH) &&
      props.type === "password"
    ) {
      if (userInput.length < 8) {
        handleError("Password must be of atleast 8 characters");
        return;
      }
      if (userInput.length > 20) {
        handleError("Password can't be more than 20 characters");
        return;
      }
    }

    if (validation.includes(ValidationRules.SAME_EMAIL)) {
      if (userInput !== formState["email"]) {
        handleError("Emails are not matching");
        return;
      }
    }

    validation.forEach((rule) => {
      if (
        typeof rule === "object" &&
        rule.type === "PATTERN" &&
        !rule.pattern.test(userInput)
      ) {
        handleError("Invalid email");
        return;
      }
    });
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

export default TextField;
