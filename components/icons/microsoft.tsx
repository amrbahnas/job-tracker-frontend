import type { IconProps } from "./utils";
import { iconPropsWithDefaults } from "./utils";

export const MicrosoftIcon = (props: IconProps) => {
  const svgProps = iconPropsWithDefaults(props, 20, 20);
  return (
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" {...svgProps}>
      <rect x="10.625" y="10.625" width="6.25" height="6.25" fill="#FEBA08" />
      <rect x="3.125" y="10.625" width="6.25" height="6.25" fill="#05A6F0" />
      <rect x="10.625" y="3.125" width="6.25" height="6.25" fill="#80BC06" />
      <rect x="3.125" y="3.125" width="6.25" height="6.25" fill="#F25325" />
    </svg>
  );
};
