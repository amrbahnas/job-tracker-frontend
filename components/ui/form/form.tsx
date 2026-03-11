import React from "react";
import {
  FormProvider,
  SubmitHandler,
  UseFormReturn,
  FieldValues,
} from "react-hook-form";
import { FieldGroup } from "../field";
import { cn } from "@/lib/utils";

type FormProps<T extends FieldValues> = {
  children: React.ReactNode;
  onSubmit?: SubmitHandler<T>;
  className?: string;
  form: UseFormReturn<T>;
};

function Form<T extends FieldValues>({
  children,
  onSubmit,
  className,
  form,
}: FormProps<T>) {
  return (
    <FormProvider {...form}>
      <form
        id="form-rhf-demo"
        onSubmit={form?.handleSubmit(onSubmit ?? (() => {}))}
      >
        <FieldGroup className={cn("gap-0", className)}>{children}</FieldGroup>
      </form>
    </FormProvider>
  );
}

export default Form;
