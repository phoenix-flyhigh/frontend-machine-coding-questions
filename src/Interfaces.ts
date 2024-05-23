import { HTMLInputTypeAttribute } from "react";

export enum ComponentType {
  "TEXT_FIELD",
  "RADIO_BUTTON",
  "DATE_PICKER",
  "SLIDER",
  "CHECKBOX",
}

export enum ValidationRules {
  "REQUIRED",
  "RADIO_REQUIRED",
  "PASSWORD_STRENGTH",
  "SAME_EMAIL",
  "IS_CHECKED",
}

export interface ValidationSchema {
  type: "PATTERN";
  pattern: RegExp;
  message: string;
}

export interface FormSchema {
  component: ComponentType;
  name: string;
  label: string;
  isRequired?: boolean;
  type?: HTMLInputTypeAttribute;
  options?: string[];
  validate?: (ValidationRules | ValidationSchema)[];
  minAge?: number;
  maxAge?: number;
  minValue?: string;
  maxValue?: string;
  defaultValue?: string;
  defaultChecked?: boolean;
}
