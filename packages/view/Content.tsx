import { createElement } from 'react';
import Vroutes from './virtual-modules/routes';
import { RouteObject, useRoutes } from 'react-router-dom';

const Content = () => {
  const routes = Vroutes.map((it) => {
    const reactElement = createElement(it.element);
    return { path: it.path, element: reactElement };
  });
  console.log(Vroutes, routes);

  const routeElement = useRoutes(routes as RouteObject[]);
  console.log(routeElement);

  return (
    <div>
      <div>1{routeElement}</div>
    </div>
  );
};

export default Content;
