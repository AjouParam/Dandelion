import React from 'react';
import { SvgXml } from 'react-native-svg';
export default function Back() {
  const backImg = `<svg id="레이어_1" data-name="레이어 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><defs><style>.cls-1{fill:#424242;}</style></defs><path class="cls-1" d="M117.94,128l35.51-35.51a7.25,7.25,0,0,0-10.26-10.26l-40.64,40.64a7.26,7.26,0,0,0,0,10.26l40.64,40.64a7.25,7.25,0,0,0,10.26-10.26Z"/></svg>`;
  const LogoSvg = () => <SvgXml xml={backImg} width="30%" height="30%" />;

  return <LogoSvg />;
}
