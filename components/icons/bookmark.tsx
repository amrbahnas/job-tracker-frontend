import type { IconProps } from "./utils";
import { iconPropsWithDefaults } from "./utils";

export const BookmarkIcon = (props: IconProps) => {
  const svgProps = iconPropsWithDefaults(props, 18, 18);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 24"
      {...svgProps}
      fill="none"
    >
      <path
        d="M16.5 3V23.25C16.5001 23.5384 16.3348 23.8013 16.0749 23.9263C15.8149 24.0512 15.5064 24.016 15.2812 23.8358L8.87469 18.7105C8.50948 18.4183 7.99052 18.4183 7.6253 18.7105L1.21875 23.8358C0.993612 24.016 0.685057 24.0512 0.425114 23.9263C0.16517 23.8013 -0.000108188 23.5384 5.31333e-08 23.25V3C5.31333e-08 1.34425 1.34425 0 3 0H13.5C15.1557 0 16.5 1.34425 16.5 3Z"
        fill={svgProps.fill}
      />
    </svg>
  );
};
