export function hexToRGBA(hex: string, opacity: number) {
  return `rgba(${hexToRGB(hex)}, ${opacity})`;
}

export function hexToRGB(hex: string) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (_m, r, g, b) => {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : 'invalid hex format';
}

// export function styledBy<Props extends {[key in K]: string}, K extends keyof Props>(
//   property: K, mapping: Record<Props[K], string | number>,
// ): (props: Props) => string | number;
// export function styledBy<Props extends {[key in K]?: string}, K extends keyof Props>(
//   property: K, mapping: Record<NonNullable<Props[K]>, string | number>, defaultProp: NonNullable<Props[K]>,
// ): (props: Props) => string | number;
// export function styledBy<Props extends {[key in K]?: string}, K extends keyof Props>(
//   property: K, mapping: Record<NonNullable<Props[K]>, string | number>, defaultProp?: NonNullable<Props[K]>,
// ): (props: Props) => string | number {
//   return (props: Props) => mapping[(props[property] || defaultProp) as NonNullable<Props[K]>];
// }
