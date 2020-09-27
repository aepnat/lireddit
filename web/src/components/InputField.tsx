import React, { InputHTMLAttributes } from "react";
import {
  FormControl,
  Input,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/core";
import { useField } from "formik";
import { Textarea } from "@chakra-ui/core/dist";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  textarea?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea = false,
  size: _,
  ...props
}) => {
  let C = Input;
  if (textarea) {
    C = Textarea;
  }
  const [field, { error }] = useField(props);

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <C {...field} {...props} id={field.name} />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};
