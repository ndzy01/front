import React from "react";
import { useObserver } from "mobx-react-lite";
import store from "../mobx/store";
import IEdit from "../components/iEdit";

const Edit = () => {
  return useObserver(() => (<IEdit eid={store.getId()} />))
 
}

export default Edit;