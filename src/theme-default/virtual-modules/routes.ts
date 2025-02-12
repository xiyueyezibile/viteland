//@ts-ignore .d.ts 报错，但实际存在
import { routes as VitelandRoutes } from 'viteland:routes';
import { createElement } from 'react';
import { VRoute } from '../types';
/** 从虚拟模块里拿到路由组件和路径 */
const routes = VitelandRoutes.map((route) => {
  const reactElement = createElement(route.element);
  return { element: reactElement, ...route };
}) as VRoute[];
export default routes;
