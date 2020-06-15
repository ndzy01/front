import React from 'react';
// import { useObserver } from "mobx-react-lite";
// import store from "../mobx/store";
// import "braft-editor/dist/output.css";
// import Show from '../components/Show'
import { createHashHistory } from 'history';
import config from '../config';
const history = createHashHistory();

const Home = () => {
  // return useObserver(() => (<Show articleId={store.getId()} />))
  return (
    <ul>
      {config.routers.map((item: any) => {
        return (
          <li>
            <a onClick={() => history.push(item.path)}>
              {item.view ? item.view : item.components}
            </a>
          </li>
        );
        // console.log(item);
      })}
    </ul>
  );
};

export default Home;
