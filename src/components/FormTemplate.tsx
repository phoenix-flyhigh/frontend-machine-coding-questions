import { useState } from "react";
import { ComponentType, FormSchema } from "../Interfaces";
import TextField from "./TextField";
import RadioGroup from "./RadioGroup";
import DatePicker from "./DatePicker";
import { subtractYears } from "../DateUtils";
import Slider from "./Slider";
import Checkbox from "./Checkbox";

const FormTemplate = ({ formSchema }: { formSchema: FormSchema[] }) => {
  const initialErrorState = formSchema.reduce((acc, element) => {
    acc[element.name] = false;
    return acc;
  }, {} as { [key: string]: boolean });

  const initialFormState = formSchema.reduce((acc, element) => {
    acc[element.name] = element.defaultValue || null;
    return acc;
  }, {} as { [key: string]: any });

  const [formErrors, setFormErrors] = useState(initialErrorState);
  const [formState, setFormState] = useState(initialFormState);

  const hasErrors = Object.keys(formErrors).some((x) => formErrors[x] === true);

  return (
    <div className="flex flex-col gap-8 w-full items-center">
      <h1 className="text-2xl font-bold self-center">Config Driven Form</h1>
      <form
        className="flex flex-col gap-4 w-2/5 xl:w-1/4"
        onSubmit={(e) => {
          e.preventDefault();
          alert(`Sucessfully submitted!`);
          setFormState(initialFormState);
          setFormErrors(initialErrorState);
        }}
      >
        {formSchema.map((element) => {
          if (element.component === ComponentType.TEXT_FIELD) {
            return (
              <TextField
                formState={formState}
                setFormState={setFormState}
                validation={element.validate ?? []}
                label={element.label}
                required={element.isRequired}
                type={element.type}
                name={element.name}
                setFormError={setFormErrors}
                key={element.label}
              />
            );
          }
          if (element.component === ComponentType.RADIO_BUTTON) {
            return (
              <RadioGroup
                formState={formState}
                setFormState={setFormState}
                options={element.options ?? []}
                label={element.label}
                name={element.name}
                validation={element.validate ?? []}
                setFormError={setFormErrors}
                key={element.label}
              />
            );
          }
          if (element.component === ComponentType.DATE_PICKER) {
            return (
              <DatePicker
                formState={formState}
                setFormState={setFormState}
                validation={element.validate ?? []}
                label={element.label}
                required={element.isRequired}
                name={element.name}
                setFormError={setFormErrors}
                key={element.label}
                min={element.maxAge && subtractYears(element.maxAge)}
                max={element.minAge && subtractYears(element.minAge)}
              />
            );
          }
          if (element.component === ComponentType.SLIDER) {
            return (
              <Slider
                formState={formState}
                setFormState={setFormState}
                validation={element.validate ?? []}
                label={element.label}
                required={element.isRequired}
                name={element.name}
                setFormError={setFormErrors}
                key={element.label}
                min={element.minValue}
                max={element.maxValue}
              />
            );
          }
          if (element.component === ComponentType.CHECKBOX) {
            return (
              <Checkbox
                formState={formState}
                setFormState={setFormState}
                validation={element.validate ?? []}
                label={element.label}
                required={element.isRequired}
                name={element.name}
                setFormError={setFormErrors}
                defaultChecked={element.defaultChecked}
                key={element.label}
              />
            );
          }
        })}
        <input
          type="submit"
          name="submit"
          className={` disabled:bg-gray-300 w-48 bg-green-700 text-white py-2 px-4 rounded-full`}
          disabled={hasErrors}
        />
      </form>
    </div>
  );
};

export default FormTemplate;
