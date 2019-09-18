export const become = <T>(value: T) => (a: T, b: T) => a !== value && b === value;
export const becomeTrue = become(true);
export const becomeFalse = become(false);
