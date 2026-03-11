import type { IconProps } from "./utils";
import { iconPropsWithDefaults } from "./utils";

export const GreenCheckedIcon = (props: IconProps) => {
  const svgProps = iconPropsWithDefaults(props, 18, 18);
  return (
    <svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" {...svgProps}>
      <rect width="18" height="18" rx="9" fill="white" />
      <rect
        x="0.5"
        y="0.5"
        width="17"
        height="17"
        rx="8.5"
        stroke="#D0D5DD"
        strokeOpacity="0.3"
      />
      <path
        d="M13 6L7.5 11.5L5 9"
        stroke="#00B800"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
