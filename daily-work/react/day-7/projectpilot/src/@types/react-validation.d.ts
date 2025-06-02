declare module "react-validation/build/form" {
  import { ComponentType, FormHTMLAttributes } from "react";
  const Form: ComponentType<FormHTMLAttributes<unknown>>;
  export default Form;
}

declare module "react-validation/build/input" {
  import { ComponentType, InputHTMLAttributes } from "react";
  const Input: ComponentType<InputHTMLAttributes<unknown> & { validations?: unknown[] }>;
  export default Input;
}

declare module "react-validation/build/button" {
  import { ComponentType, ButtonHTMLAttributes } from "react";
  const CheckButton: ComponentType<ButtonHTMLAttributes<unknown>>;
  export default CheckButton;
}
