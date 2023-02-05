'use strict'

const builtInHooks = [
  'useState',
  'useEffect',
  'useContext',
  'useReducer',
  'useCallback',
  'useMemo',
  'useRef',
  'useImperativeHandle',
  'useLayoutEffect',
  'useDebugValue',
  'useDeferredValue',
  'useTransition',
  'useId',
  'useSyncExternalStore',
  'useInsertionEffect',
]

const isReactBuiltInHooks = (name = '') => {
  return builtInHooks.some((hookName) => hookName === name)
}

module.exports = {
  isReactBuiltInHooks,
}
