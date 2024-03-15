//@ts-ignore .d.ts 报错，但实际存在
import { routes as VitelandRoutes } from 'viteland:routes';
import { ComponentClass, FunctionComponent } from 'react';
const routes = VitelandRoutes as {
  path: string;
  element: string | FunctionComponent<{}> | ComponentClass<{}, any>;
}[];

export default routes;
