import * as React from 'react';

import weiboSVG from './weibo.svg';

function createIcon(svgContent: string) {
  return () => <i dangerouslySetInnerHTML={{ __html: svgContent }} />;
}

export const Weibo = createIcon(weiboSVG);
export type IconType = ReturnType<typeof createIcon>;
