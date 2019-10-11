import { tKeys } from 'services/i18n';

export const validatePositiveNumber = (value: string) => (
  Number(value) >= 0 ? undefined : tKeys.shared.validation.isPositiveNumber.getKey()
);
