import type { IconProps } from "./utils";
import { iconPropsWithDefaults } from "./utils";

export const PlayIcon = (props: IconProps) => {
  const svgProps = iconPropsWithDefaults(props, 187, 187);
  return (
    <svg
      viewBox="0 0 187 187"
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
      fill="none"
    >
      <path
        d="M93.2926 181.836C142.193 181.836 181.835 142.194 181.835 93.2937C181.835 44.393 142.193 4.7511 93.2926 4.7511C44.3919 4.7511 4.75 44.393 4.75 93.2937C4.75 142.194 44.3919 181.836 93.2926 181.836Z"
        stroke={svgProps.fill}
        strokeWidth="9.50213"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M75.584 57.8766L128.71 93.2937L75.584 128.711V57.8766Z"
        stroke={svgProps.fill}
        strokeWidth="9.50213"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
