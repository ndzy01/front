import { RouteProps } from 'react-router';
import { lazy } from 'react';

let routes: IRouteItem[] = [
  {
    path: '/home', // 主页
    view: 'Home',
  },
  {
    path: '/edit', // 编辑页
    view: 'Edit',
  },
  {
    path: '/add', 
    view: 'Add',
  },
  // ------------------------------------------------------------------------------------//
  {
    path: '/scrollTable',
    components: 'scrollTable/index',
  },
  {
    path: '/form01',
    components: 'form/form01',
  },
  {
    path: '/form02', 
    components: 'form/form02',
  },
  {
    path: '/popover', 
    components: 'popover/index',
  },
  {
    path: '/renderProps', 
    components: 'renderProps/index',
  },
  {
    path: '/nowTime', 
    components: 'nowTime/nowTime',
  },
];
interface IRouteItem extends RouteProps {
  view?: string;
  components?: string;
}

for (const item of routes) {
  if (item.view) {
    item.component = lazy(() => import(('../views/' + item.view) as string));
  }
  if (item.components) {
    item.component = lazy(() =>
      import(('../components/' + item.components) as string)
    );
  }
}

export default routes;
