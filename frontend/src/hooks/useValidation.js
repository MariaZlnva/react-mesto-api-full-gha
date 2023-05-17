import { useCallback, useState } from "react";

export const useValidation = () => {
  const [valuesInput, setValuesInput] = useState({});
  const [errors, setErrors] = useState({});
  const [isValidForm, setIsValidForm] = useState(false);

  function onChange(evt) {
    const { name, value, validationMessage } = evt.target;
    setValuesInput((valuesInput) => ({ ...valuesInput, [name]: value })); // доб.в объект valuesInput данные -в значению св-ва name присвоим данные значений value
    setErrors((errors) => ({ ...errors, [name]: validationMessage }));
    setIsValidForm(evt.target.closest("form").checkValidity());
  }

  const resetValidation = useCallback(
    (valuesInput = {}, errors = {}, isValidForm = false) => {
      setValuesInput(valuesInput);
      setErrors(errors);
      setIsValidForm(isValidForm);
    },
    [setValuesInput, setErrors, setIsValidForm]
  );

  return {
    valuesInput,
    errors,
    onChange,
    resetValidation,
    setValuesInput,
    setErrors,
    isValidForm,
    setIsValidForm,
  };
};
