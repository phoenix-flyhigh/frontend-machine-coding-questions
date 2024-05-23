import { ComponentType, FormSchema, ValidationRules } from "./Interfaces";
import FormTemplate from "./components/FormTemplate";

function App() {
  const schema: FormSchema[] = [
    {
      component: ComponentType.TEXT_FIELD,
      name: "name",
      label: "Your name",
      isRequired: true,
      type: "text",
      validate: [ValidationRules.REQUIRED],
    },
    {
      component: ComponentType.TEXT_FIELD,
      name: "email",
      label: "Email",
      isRequired: true,
      type: "email",
      validate: [
        ValidationRules.REQUIRED,
        {
          type: "PATTERN",
          pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
          message: "Not a valid email",
        },
      ],
    },
    {
      component: ComponentType.TEXT_FIELD,
      name: "confirm-email",
      label: "Confirm email",
      isRequired: true,
      type: "email",
      validate: [ValidationRules.REQUIRED, ValidationRules.SAME_EMAIL],
    },
    {
      component: ComponentType.TEXT_FIELD,
      name: "password",
      label: "Password",
      isRequired: true,
      type: "password",
      validate: [ValidationRules.REQUIRED, ValidationRules.PASSWORD_STRENGTH],
    },
    {
      component: ComponentType.RADIO_BUTTON,
      name: "gender",
      label: "Gender",
      options: ["male", "female", "Other"],
      validate: [ValidationRules.RADIO_REQUIRED],
    },
    {
      component: ComponentType.DATE_PICKER,
      name: "date-of-birth",
      label: "Date of birth",
      minAge: 3,
      maxAge: 80,
    },
    {
      component: ComponentType.SLIDER,
      name: "rating",
      label: "Rating",
      defaultValue: "4",
      maxValue: "5",
      minValue: "1",
    },
    {
      component: ComponentType.CHECKBOX,
      name: "terms-of-agreement",
      label: "I accept the terms and conditions",
      isRequired: true,
      validate: [ValidationRules.IS_CHECKED],
    },
  ];

  return (
    <div className=" h-screen w-full flex justify-center items-center">
      <FormTemplate formSchema={schema} />
    </div>
  );
}

export default App;
