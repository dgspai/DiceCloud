export default function walkDown(tree, callback){
  let stack = [...tree];
  while(stack.length){
    let node = stack.pop();
    callback(node);
    stack.push(...node.children);
  }
}
