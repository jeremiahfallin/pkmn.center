import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import React from 'react';
import { useController } from 'react-hook-form';

function ControlledSelect({
  name,
  label,
  options,
  control,
  rules,
  shouldUnregister,
  ...selectProps
}: any) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    shouldUnregister,
  });

  return (
    <FormControl label={label} isInvalid={!!error} id={name}>
      {label && <FormLabel>{label}</FormLabel>}
      <Select options={options} {...selectProps} {...field} />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
}

export default ControlledSelect;
