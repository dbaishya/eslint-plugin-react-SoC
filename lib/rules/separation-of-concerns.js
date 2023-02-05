'use strict'

const { isReactBuiltInHooks } = require('../utils/isReactBuiltInHooks')
const {
  isReactFunctionComponent,
} = require('../utils/isReactFunctionComponent')

const checkLastSegment = (node = null, report = () => null) => {
  if (isReactFunctionComponent(node)) {
    node.body.body.forEach((aNode) => {
      switch (aNode.type) {
        case 'ExpressionStatement': {
          let name = ''
          const {
            expression: {
              callee: { type, ...rest },
            },
          } = aNode

          // @example useEffect(...)
          if (type === 'Identifier') {
            name = rest?.name
          }
          // @example React.useEffect(...)
          else if (type === 'MemberExpression') {
            name = rest?.property?.name
          }
          if (name && isReactBuiltInHooks(name)) {
            report({
              node: aNode,
              messageId: 'builtInHooksViolation',
              data: {
                builtInHookName: name,
              },
            })
          }
          break
        }

        case 'FunctionDeclaration': {
          const {
            id: { name },
          } = aNode
          report({
            node: aNode,
            messageId: 'functionDeclarationViolation',
            data: {
              functionName: name,
            },
          })
          break
        }

        case 'VariableDeclaration': {
          const { declarations } = aNode
          declarations.forEach((aDeclaration) => {
            const {
              id,
              init: { callee, type },
            } = aDeclaration

            // @example const handle = (event) => {...}
            if (type === 'ArrowFunctionExpression') {
              const { name } = id
              report({
                node: aNode,
                messageId: 'arrowFunctionExpressionViolation',
                data: {
                  arrowFunctionName: name,
                },
              })
            }
            // @example useState({...})
            else if (type === 'CallExpression') {
              let name = ''
              const { type: calleeType, ...rest } = callee
              // @example useEffect(...)
              if (calleeType === 'Identifier') {
                name = rest?.name
              }
              // @example React.useEffect(...)
              else if (calleeType === 'MemberExpression') {
                name = rest?.property?.name
              }
              if (name && isReactBuiltInHooks(name)) {
                report({
                  node: aNode,
                  messageId: 'builtInHooksViolation',
                  data: {
                    builtInHookName: name,
                  },
                })
              }
            }
            // @example const foo = 'bar'
            else if (type === 'Literal') {
              // @no-op
            }
          })
          break
        }

        default:
          break
      }
    })
  }
}

module.exports = {
  meta: {
    docs: {
      description:
        'rule to warn mixing of business logic with presentation logic',
      recommended: true,
    },
    fixable: null,
    messages: {
      arrowFunctionExpressionViolation:
        'violation: arrow function expression {{ arrowFunctionName }} found in presentation logic',
      builtInHooksViolation:
        'violation: react built-in hook {{ builtInHookName }} found in presentation logic',
      functionDeclarationViolation:
        'violation: function declaration {{ functionName }} found in presentation logic',
    },
    schema: [],
    type: 'suggestion',
  },
  create(context) {
    return {
      ArrowFunctionExpression: (node) => {
        checkLastSegment(node, context.report)
      },
      FunctionDeclaration: (node) => {
        checkLastSegment(node, context.report)
      },
    }
  },
}
