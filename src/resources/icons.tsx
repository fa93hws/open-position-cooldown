import * as React from 'react';

import githubSVG from './github.svg';
import codeSVG from './code.svg';
import weiboSVG from './weibo.svg';
import aboutSVG from './about.svg';
import homeSVG from './home.svg';
import plusSVG from './plus.svg';

function createIcon(svgContent: string) {
  return () => <i dangerouslySetInnerHTML={{ __html: svgContent }} />;
}

export const Github = createIcon(githubSVG);
export const Code = createIcon(codeSVG);
export const Weibo = createIcon(weiboSVG);
export const About = createIcon(aboutSVG);
export const Home = createIcon(homeSVG);
export const Plus = createIcon(plusSVG);
export type IconType = ReturnType<typeof createIcon>;
