import type { IconProps } from "./utils";
import { iconPropsWithDefaults } from "./utils";

export const SuccessCheckedIcon = (props: IconProps) => {
  const svgProps = iconPropsWithDefaults(props, 20, 20);
  return (
    <svg
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
      fill="none"
    >
      <rect width="20" height="20" rx="10" fill="#CEFFCE" />
      <rect
        x="0.402885"
        y="0.402885"
        width="19.1942"
        height="19.1942"
        rx="9.59712"
        stroke="#D0D5DD"
        strokeOpacity="0.4"
        strokeWidth="0.805769"
      />
      <path
        d="M14.362 6.72656L8.36068 12.7279L5.63281 10"
        stroke="#008500"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
