import { tKeys } from 'services/i18n';

const validatePositiveNumber = (value: string) => (
  Number(value) >= 0 ? undefined : tKeys.shared.validation.isPositiveNumber.getKey()
);

export default validatePositiveNumber;
