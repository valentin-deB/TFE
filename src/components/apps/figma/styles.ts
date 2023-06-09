
import { css, CSSResult } from 'lit';

export const basic = css`

  /* CSS here */

`;

interface StyleObject {
    styleName: string;
    css: CSSResult;
}
  
const styleOneBit:StyleObject = {
    styleName: "oneBit",
    css: css`
    
    /* CSS here */

    `
};

const styleSkeuo:StyleObject = {
    styleName: "skeuo",
    css: css`
    
    /* CSS here */

    `
};
  
const styleModernMac:StyleObject = {
    styleName: "modernMac",
    css: css`

    /* CSS here */
    
    `
};

export const styles:StyleObject[] = [styleOneBit, styleSkeuo ,styleModernMac];
