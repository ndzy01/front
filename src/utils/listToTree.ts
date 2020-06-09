export default function listToTree(list: any) {
  list.map((item: any) => {
    if (item.isLeaf === 0) {
      item.isLeaf=true
    } else {
      item.isLeaf=false
      
    }
    return item
  })
  let map:any = {}
  let node
  let tree = []
  for (let i = 0; i < list.length; i ++) {
      map[list[i].sid] = list[i]; 
      list[i].children = []; 
  }
  for (let i = 0; i < list.length; i += 1) {
      node = list[i];
      if (node.pid !== '-1') {
          map[node.pid].children.push(node);
      } else {
          tree.push(node);
      }
  }
  return tree;
}