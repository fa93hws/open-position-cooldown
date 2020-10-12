export type RouteKind = 'about' | 'home' | 'notFound';

export const pagePath: Record<RouteKind, string> = {
  about: '/about',
  home: '/',
  notFound: '/404',
};
