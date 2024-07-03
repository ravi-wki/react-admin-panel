import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '../ui/select';

interface FormSelectProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
}

const FormSelect: React.FC<FormSelectProps> = ({ name, label, options }) => {
  const { control, setValue } = useFormContext();
  if (!control) {
    return null;
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select {...field} onValueChange={(value) => setValue(name, value)}>
          <SelectTrigger>
            <SelectValue placeholder={`Select ${label}`} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{label}</SelectLabel>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    />
  );
};

export default FormSelect;
