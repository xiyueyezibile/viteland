import { createElement } from 'react';
import routes from './virtual-modules/routes';
import { RouteObject, useRoutes } from 'react-router-dom';

const Content = () => {
  const routeElement = useRoutes(
    routes.map((route) => {
      return { path: route.path, element: createElement(route.element) };
    }) as RouteObject[]
  );

  return routeElement;
};

export default Content;
