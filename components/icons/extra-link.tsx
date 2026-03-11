import type { IconProps } from "./utils";
import { iconPropsWithDefaults } from "./utils";

export const ExtraLinkIcon = (props: IconProps) => {
  const svgProps = iconPropsWithDefaults(props, 22, 18);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 18"
      {...svgProps}
      fill="none"
    >
      <path
        d="M9.75 2.25H14.25C14.6478 2.25 15.0294 2.40804 15.3107 2.68934C15.592 2.97064 15.75 3.35218 15.75 3.75V14.25C15.75 14.6478 15.592 15.0294 15.3107 15.3107C15.0294 15.592 14.6478 15.75 14.25 15.75H3.75C3.35218 15.75 2.97064 15.592 2.68934 15.3107C2.40804 15.0294 2.25 14.6478 2.25 14.25V9.75M2.25 2.25L9 9M2.25 2.25V6.75M2.25 2.25H6.75"
        stroke={svgProps.fill}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
