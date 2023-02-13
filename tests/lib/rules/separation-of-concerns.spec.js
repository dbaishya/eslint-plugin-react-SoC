// separation-of-concerns.spec.js
const RuleTester = require('eslint').RuleTester
const separationOfConcerns = require('../../../lib/rules/separation-of-concerns')
const ruleTester = new RuleTester({
  // eslint-disable-next-line node/no-unpublished-require
  parser: require.resolve('@babel/eslint-parser'),
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'script',
  },
})

ruleTester.run('separation-of-concerns', separationOfConcerns, {
  invalid: [
    {
      code: `
      const Subscribe = ({ onSubmit = (email = '') => null, onLoad = () => null }) => {
        const [email, setEmail] = useState('')

        useEffect(() => {
          onLoad()
          sendLoadEvent()
        }, [onLoad])
      
        const handleOnChange = React.useCallback((event) => {
          event.preventDefault()
          const { target: {value} } = event
          setEmail(() => value)
        }, [onSubmit])

        const handleOnSubmit = (event) => {
          event.preventDefault()
          if (email) {
            onSubmit(email)
            setEmail(() => '')
          }
        }

        async function sendLoadEvent() {
          // @no-op analytics
        }

        const labelText = 'Enter your email: '

        return (
          <form onSubmit={handleOnSubmit}>
            <label for="email">{labelText}</label>
            <input type="email" name="email" id="email" value={email} onChange={handleOnChange} required />
            <input type="submit" value="Subscribe" />
        </form>
        )
      }`,
      errors: [
        { messageId: 'builtInHooksViolation' },
        { messageId: 'builtInHooksViolation' },
        { messageId: 'builtInHooksViolation' },
        { messageId: 'arrowFunctionExpressionViolation' },
        { messageId: 'functionDeclarationViolation' },
      ],
    },
  ],
  valid: [
    {
      code: `
      const useSubscribe = ({ onSubmit = (email = '') => null }) => {
        const [email, setEmail] = useState('')

        const handleOnChange = useCallback((event) => {
          event.preventDefault()
          const { target: {value} } = event
          setEmail(() => value)
        }, [])

        const handleOnSubmit = (event) => {
          event.preventDefault()
          if (email) {
            onSubmit(email)
            setEmail(() => '')
          }
        }

        return {
          email,
          handleOnChange,
          handleOnSubmit,
        }
      }`,
      errors: [],
    },
    {
      code: `
      const Subscribe = ({ onSubmit = (email = '') => null }) => {
        const { email, handleOnChange, handleOnSubmit } = useSubscribe({ onSubmit })

        /**
         * @valid use case:
         *  - @question: is it okay to declare variables with simple primitives?
         *  - @question: what if declaration is ternary involving some logic?
         */
        const labelText = 'Enter your email: '
      
        return (
          <form onSubmit={handleOnSubmit}>
            <label for="email">{labelText}</label>
            <input type="email" name="email" id="email" value={email} onChange={handleOnChange} required />
            <input type="submit" value="Subscribe" />
          </form>
        )
      }`,
      errors: [],
    },
    {
      code: `
      const Unsubscribe = ({ onClick = () => null }) => (
        <button onClick={onClick}>Unsubscribe</button>
      )`,
      errors: [],
    },
    {
      code: `
      function Unsubscribe2({ onClick = () => null }) {
        return (<button onClick={onClick}>Unsubscribe</button>)
      }`,
      errors: [],
    },
  ],
})
