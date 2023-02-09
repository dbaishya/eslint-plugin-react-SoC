# Ensures separation of concerns

This rule ensures separation of business logic from presentation logic in React functional components. A presentation component should be concerned with rendering only. Local state management, fetching data, sorting, searching and anything else which can be described as business logic should be abstracted away in a custom hook.

## Rule Details

---

Eamples of **incorrect** code for this rule:

❌: business logic is mixed with presentation logic

```jsx
const Subscribe = ({
  onSubmit = (email = '') => null,
  onLoad = () => null,
}) => {
  // ❌: useState is used in a presentation component
  const [email, setEmail] = useState('')

  // ❌: useEffect is used in a presentation component
  useState(() => {
    onLoad()
    sendLoadEvent()
  }, [onLoad])

  // ❌: React.useCallback is used in a presentation component
  const handleOnChange = React.useCallback(
    (event) => {
      event.preventDefault()
      const {
        target: { value },
      } = event
      setEmail(() => value)
    },
    [onSubmit]
  )

  // ❌: arrow function is used in a presentation component
  const handleOnSubmit = (event) => {
    event.preventDefault()
    if (email) {
      onSubmit(email)
      setEmail(() => '')
    }
  }

  // ❌: function declaration is used in a presentation component
  async function sendLoadEvent() {
    // @no-op analytics
  }

  const labelText = 'Enter your email: '

  return (
    <form onSubmit={handleOnSubmit}>
      <label for="email">{labelText}</label>
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={handleOnChange}
        required
      />
      <input type="submit" value="Subscribe" />
    </form>
  )
}
```

---
# Rule to warn mixing of business logic with presentation logic (`react-soc/separation-of-concerns`)

<!-- end auto-generated rule header -->

Examples of **correct** code for this rule:

✅: custom hook is used for abstracting business logic

```jsx
const useSubscribe = ({ onSubmit = (email = '') => null }) => {
  const [email, setEmail] = useState('')

  const handleOnChange = useCallback(
    (event) => {
      event.preventDefault()
      const {
        target: { value },
      } = event
      setEmail(() => value)
    },
    [onSubmit]
  )

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
}
```

✅: a custom hook is used for abstracting business thus logic keeping presentation logic clean

```jsx
const Subscribe = ({ onSubmit = (email = '') => null }) => {
  const { email, handleOnChange, handleOnSubmit } = useSubscribe({ onSubmit })
  const labelText = 'Enter your email: '

  return (
    <form onSubmit={handleOnSubmit}>
      <label for="email">{labelText}</label>
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={handleOnChange}
        required
      />
      <input type="submit" value="Subscribe" />
    </form>
  )
}
```

## When Not To Use It

---

If you do not care about separation of concerns then you can disable this rule.
