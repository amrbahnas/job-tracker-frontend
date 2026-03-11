import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement> & {
  size?: number | string;
  color?: string;
};

export const iconPropsWithDefaults = (
  props: IconProps,
  defaultWidth: number | string,
  defaultHeight: number | string,
  defaultFill = "currentColor"
) => {
  const { size, color, width, height, fill, ...rest } = props;
  const w = size ?? width ?? defaultWidth;
  const h = size ?? height ?? defaultHeight;
  const f = color ?? fill ?? defaultFill;
  return { width: w, height: h, fill: f, ...rest };
};
