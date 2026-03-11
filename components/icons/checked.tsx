import type { IconProps } from "./utils";
import { iconPropsWithDefaults } from "./utils";

export const CheckedIcon = (props: IconProps) => {
  const svgProps = iconPropsWithDefaults(props, 16, 16);
  return (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...svgProps}>
      <rect width="16" height="16" rx="8" fill="#55A2F6" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.7557 5.03928C12.0102 5.27253 12.0274 5.66788 11.7941 5.92233L7.2108 10.9223C7.09561 11.048 6.93409 11.1212 6.76366 11.1249C6.59323 11.1286 6.42868 11.0625 6.30814 10.9419L4.22481 8.85861C3.98073 8.61453 3.98073 8.21881 4.22481 7.97473C4.46888 7.73065 4.86461 7.73065 5.10869 7.97473L6.73045 9.59649L10.8727 5.07768C11.1059 4.82323 11.5013 4.80604 11.7557 5.03928Z"
        fill="#F5F9FF"
      />
    </svg>
  );
};
