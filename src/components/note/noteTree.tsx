import React, { useState ,useEffect} from 'react'
import { Tree } from 'antd'
import store  from '../../mobx/store'
import api from '../../http'
import listToTree from '../../utils/listToTree'

const { DirectoryTree } = Tree;

export default function noteTree() {
  const [treeData, setTreeData] = useState<any>()
  const [id, setId] = useState<string>()
  const [sId, setSId] = useState<string>()
  const onExpand = () => {
    api('/tree/all', "GET").then((res: any) => {
      setTreeData(listToTree(res.data.data))
    })
   
  }
  const onSelect = (keys: any, event: any) => {
    setId(event.node.id)
    setSId(event.node.sid)
    store.setId(id||"")
    store.setSId(sId || "")
  };
  useEffect(() => {
    api('/tree/all', "GET").then((res: any) => {
      setTreeData(listToTree(res.data.data))
    })
  },[])
  return  (<DirectoryTree
    multiple
    defaultExpandAll
    onSelect={onSelect}
    onExpand={onExpand}
    treeData={treeData} />) 
}