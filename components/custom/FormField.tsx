import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Input } from "../ui/input";
import { Field, FieldError, FieldLabel } from "../ui/field";

interface TFormInputFeild<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
  label: string;
  type?: "text" | "email" | "password" | "file";
  disabled: boolean;
}

const FormField = <T extends FieldValues>({
  name,
  control,
  placeholder,
  type = "text",
  label,
  disabled,
}: TFormInputFeild<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <Input
            {...field}
            id={field.name}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            autoComplete="off"
            type={type}
            disabled={disabled}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default FormField;
