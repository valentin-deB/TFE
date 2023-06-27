import { css, CSSResult } from "lit";
import "/src/assets/globalStyles/typoImports.css";

export const basic = css`
  .c-faceTime {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #fff;
    min-width: 300px;
    min-height: 500px;
  }

  .c-faceTime__user{
    position: absolute;
    top: 10px;
    right: 10px;

    width: 130px;
    height: auto;

    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    pointer-events: auto;
  }

  .c-faceTime__content {
    width: 100%;
    height: 100%;
    max-width: 60vw;
    max-height: 75vh;
    aspect-ratio: auto;
    object-fit: contain;
    pointer-events: none;

  }

  .c-faceTime__no-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 35vw;
    height: 30vw;
  }

  .c-faceTime__no-content p {
    opacity: 0.5;
  }

  .c-faceTime__controls {
    position: relative;
    box-sizing: border-box;
    background-color: #fff;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`;

interface StyleObject {
  styleName: string;
  css: CSSResult;
}

const styleOneBit: StyleObject = {
  styleName: "grey",
  css: css`
    /* CSS here */

    .c-faceTime {
      background-color: #dcd8dd;
    }

    .c-faceTime__controls {
      background: #cac6cb;
      box-shadow: inset -1px -1px 0 0 #464147, inset 1px 1px 0 0 white,
        inset -2px -2px 0 0 #a099a1, inset 2px 2px 0 0 #dedcde;
    }

    .c-faceTime__controls-play {
      background: #cac6cb;
      border: 1px solid #000;
      box-shadow: inset -1px -1px 0 0 #464147, inset 1px 1px 0 0 white,
        inset -2px -2px 0 0 #a099a1, inset 2px 2px 0 0 #dedcde;
    }
    .c-faceTime__controls-play:hover {
      box-shadow: inset -1px -1px 0 0 white, inset 1px 1px 0 0 #464147,
        inset -2px -2px 0 0 #dedcde, inset 2px 2px 0 0 #cac6cb;
    }

    .c-faceTime__controls-time {
      box-shadow: inset -1px -1px 0 0 white, inset 1px 1px 0 0 #464147,
        inset -2px -2px 0 0 #dedcde, inset 2px 2px 0 0 #cac6cb;
    }

    .c-faceTime__controls-progress {
      background: transparent;
      height: 20px;
      -webkit-appearance: none;
      appearance: none; /* Add standard appearance property */
    }
    
    /* Webkit (Chrome, Safari) */
    .c-faceTime__controls-progress::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none; /* Add standard appearance property */
      width: 20px;
      height: 20px;
      transform: translateY(-5px);
      background: #cac6cb;
      box-shadow: inset -1px -1px 0 0 #464147, inset 1px 1px 0 0 white,
        inset -2px -2px 0 0 #a099a1, inset 2px 2px 0 0 #dedcde;
    }
    
    /* Mozilla Firefox */
    .c-faceTime__controls-progress::-moz-range-thumb {
      width: 20px;
      height: 20px;
      background: #cac6cb;
      box-shadow: inset -1px -1px 0 0 #464147, inset 1px 1px 0 0 white,
        inset -2px -2px 0 0 #a099a1, inset 2px 2px 0 0 #dedcde;
      border-radius: 0;
    }
    
    .c-faceTime__controls-progress::-webkit-slider-runnable-track {
      height: 10px;
      -webkit-appearance: none;
      appearance: none; /* Add standard appearance property */
      border: none;
      background: #000;
      box-shadow: inset -1px -1px 0 0 #464147, inset 1px 1px 0 0 white,
        inset -2px -2px 0 0 #a099a1, inset 2px 2px 0 0 #dedcde;
    }
    
    /* Mozilla Firefox */
    .c-faceTime__controls-progress::-moz-range-track {
      height: 10px;
      border: none;
      background: #000;
      box-shadow: inset -1px -1px 0 0 #464147, inset 1px 1px 0 0 white,
        inset -2px -2px 0 0 #a099a1, inset 2px 2px 0 0 #dedcde;
    }    

  `,
};

const styleSkeuo: StyleObject = {
  styleName: "skeuo",
  css: css`
    /* CSS here */
  `,
};

const styleModernMac: StyleObject = {
  styleName: "modernMac",
  css: css`
    .c-faceTime {
      background-color: #2d2c2c;
    }
  `,
};

export const styles: StyleObject[] = [styleOneBit, styleSkeuo, styleModernMac];
