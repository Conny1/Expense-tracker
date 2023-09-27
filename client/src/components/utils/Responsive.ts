import { css } from "styled-components";
import { Styles } from "styled-components/dist/types";

export const mobile = (props: Styles<object>) => {
  return css`
    @media only screen and (max-width: 950px) {
      ${props}
    }
  `;
};
