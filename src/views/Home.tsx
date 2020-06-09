import React from "react";
import { useObserver } from "mobx-react-lite";
import store from "../mobx/store";
import "braft-editor/dist/output.css";
import Show from '../components/Show'

const Home = () => {
  return useObserver(() => (<Show articleId={store.getId()} />))
}

export default Home
