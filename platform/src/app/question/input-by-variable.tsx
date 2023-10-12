import { Input } from "@/components/input";
import { Variable } from "@/repositories/question.repository";
import { UseFormRegister } from "react-hook-form";

type FunctionComponentInputVariableProps = {
  label: string;
  register: UseFormRegister<any>;
  registerKey: string;
  errorMessage?: string;
}

type FunctionComponentInputVariable = (props: FunctionComponentInputVariableProps) => JSX.Element;

type AllComponentInputVariable = {
  [T in Variable]: FunctionComponentInputVariable;
}

export const allComponentInputVariable: AllComponentInputVariable = {
  [Variable.INTEGER]: ({ label, register, registerKey, errorMessage }) => (
    <Input
      displayName={label}
      {...register(registerKey, { valueAsNumber: true })}
      type="number"
      className="nameInput"
      errorMessage={errorMessage}
    />
  ),
  [Variable.FLOAT]: ({ label, register, registerKey, errorMessage }) => (
    <Input
      displayName={label}
      {...register(registerKey, { valueAsNumber: true })}
      type="number"
      step="0.01"
      className="nameInput"
      errorMessage={errorMessage}
    />
  ),
  [Variable.STRING]: ({ label, register, registerKey, errorMessage }) => (
    <Input
      displayName={label}
      {...register(registerKey, {
        valueAsNumber: false,
        shouldUnregister: true
      })}
      type="text"
      className="nameInput"
      errorMessage={errorMessage}
    />
  ),
  // [Variable.BOOLEAN]: () => <></>,
  // [Variable.INTEGER_ARRAY]: () => <></>,
  // [Variable.FLOAT_ARRAY]: () => <></>,
  // [Variable.STRING_ARRAY]: () => <></>,
  // [Variable.BOOLEAN_ARRAY]: () => <></>,
}
