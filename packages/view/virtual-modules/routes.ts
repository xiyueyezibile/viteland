//@ts-ignore .d.ts 报错，但实际存在
import { routes as VitelandRoutes } from 'viteland:routes';
import { createElement } from 'react';
import { VRoute } from '../types';

const routes = VitelandRoutes.map((route) => {
  const reactElement = createElement(route.element);
  return { element: reactElement, ...route };
}) as VRoute[];
export default routes;
