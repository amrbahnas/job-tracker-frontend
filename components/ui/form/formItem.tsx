import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Field } from "../field";

type FormItemChildProps = {
  label?: string;
  variant?: "error" | string;
  helperText?: string;
};

const FormItem = ({
  children,
  name,
  className,
  textHelper,
}: // label,
{
  textHelper?: string;
  children: React.ReactNode;
  name: string;
  // label: string;
  className?: string;
}) => {
  const childElement = children as React.ReactElement<FormItemChildProps>;
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={className}>
          {/* <FieldLabel htmlFor="form-rhf-demo-title">
                    Bug Title
                  </FieldLabel> */}
          {React.cloneElement(childElement, {
            // label,
            variant: fieldState.invalid ? "error" : undefined,
            helperText: fieldState.invalid
              ? fieldState.error?.message
              : textHelper,
            ...field,
          })}
          {/* {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )} */}
        </Field>
      )}
    />
  );
};

export default FormItem;
