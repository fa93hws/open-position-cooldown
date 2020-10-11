import * as React from 'react';
import { useTheme } from 'emotion-theming';
import type { Theme } from '../theme';

import githubSVG from './github.svg';
import codeSVG from './code.svg';
import weiboSVG from './weibo.svg';

function createIcon(svgContent: string) {
  return (props: { size: 'icon'; fill: keyof Theme['colors'] }) => {
    const theme = useTheme<Theme>();
    const size = theme.sizes[props.size];
    const fill = theme.colors[props.fill];

    return (
      <i
        style={{ width: size, height: size, fill }}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    );
  };
}

export const Github = createIcon(githubSVG);
export const Code = createIcon(codeSVG);
export const Weibo = createIcon(weiboSVG);
export type IconType = ReturnType<typeof createIcon>;
