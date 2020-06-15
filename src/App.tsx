import React, { Suspense, Fragment, useState } from 'react';
import {
  // BrowserRouter as Router,
  Route,
  Switch,
  HashRouter,
  Redirect,
} from 'react-router-dom';
import { createHashHistory } from 'history';
import { Button } from 'antd';
import config from './config';
import hooks from './hooks';
import api from './http';

import Err404 from './views/err404/Err404';
import './App.scss';
const history = createHashHistory();

function App() {
  const [isExpend, setIsExpend] = useState(true);
  const setLogo = (url: string) => {
    let link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = url;
    document.getElementsByTagName('head')[0].appendChild(link);
  };
  hooks.useSetLogo(() => {
    api('/layout/getLogo', 'GET').then((res: any) => {
      setLogo(res.data.data.url);
    });
  });

  return (
    <HashRouter>
      <Switch>
        <Fragment>
          <div className="app">
            <header className="app-header">
              <div className="app-header-body">
                <div className="app-header-body-logo">
                  <Button
                    type="primary"
                    onClick={() => {
                      setIsExpend(!isExpend);
                    }}
                  >
                    {isExpend ? '收起' : '展开'}
                  </Button>
                </div>
              </div>
            </header>
            <div className="app-body">
              <aside
                className={
                  isExpend ? 'app-body-aside-expend' : 'app-body-aside-collapse'
                }
              >
                <ul>
                  {config.routers.map((item: any) => {
                    return (
                      <li>
                        <a onClick={() => history.push(item.path)}>
                          {item.view ? item.view : item.components}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </aside>
              <div className="app-body-main">
                <div className="app-body-main-content">
                  <Suspense fallback={<span className="page-spin"></span>}>
                    <Switch>
                      {config.routers.map((route, i) => {
                        return <Route key={i} {...route} />;
                      })}
                      <Redirect path="/" to={{ pathname: '/home' }} />
                      <Route component={Err404} />
                    </Switch>
                  </Suspense>
                </div>
                <footer className="app-footer">
                  <h1>ndzy</h1>
                </footer>
              </div>
            </div>
          </div>
        </Fragment>
      </Switch>
    </HashRouter>
  );
}

export default App;
