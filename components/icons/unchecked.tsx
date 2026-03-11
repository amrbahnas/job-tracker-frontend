import type { IconProps } from "./utils";
import { iconPropsWithDefaults } from "./utils";

export const UncheckedIcon = (props: IconProps) => {
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
        d="M12 6L6 12M6 6L12 12"
        stroke="#647385"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
