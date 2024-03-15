import { createElement } from 'react';
import routes from './virtual-modules/routes';

const Content = () => {
  console.log(routes);

  return (
    <>
      {routes.map((it) => {
        const reactElement = createElement(it.element);
        return reactElement;
      })}
    </>
  );
};
export default Content;
