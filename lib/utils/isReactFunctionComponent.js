'use strict'

const isReactFunctionComponent = (node = null) => {
  let isReactFuncComponent = false

  if (!node) {
    return isReactFuncComponent
  }

  if (node?.body && node?.body.body && node?.body.body.length !== 0) {
    const bodyNodesLength = node.body.body.length
    const lastNode = node.body.body[bodyNodesLength - 1]
    if (
      lastNode &&
      lastNode.type &&
      lastNode.argument &&
      lastNode.argument.type &&
      lastNode.type === 'ReturnStatement' &&
      lastNode.argument.type === 'JSXElement'
    ) {
      isReactFuncComponent = true
    }
  }

  return isReactFuncComponent
}
module.exports = {
  isReactFunctionComponent,
}
