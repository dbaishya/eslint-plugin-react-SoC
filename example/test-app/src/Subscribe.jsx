import { useEffect, useState, useCallback } from 'react'
import './Subscribe.styles.css'

export const Unsubscribe = ({ onClick = () => null }) => (
  <button onClick={onClick}>Unsubscribe</button>
)

export const Subscribe = ({ onSubmit = () => null, onLoad = () => null }) => {
  const [email, setEmail] = useState('')

  useEffect(() => {
    onLoad()
  }, [onLoad])

  const handleOnChange = useCallback((event) => {
    event.preventDefault()
    const {
      target: { value },
    } = event
    setEmail(() => value)
  }, [])

  const handleOnSubmit = (event) => {
    event.preventDefault()
    if (email) {
      onSubmit(email)
      setEmail(() => '')
    }
  }

  const labelText = 'Enter your email:'

  return (
    <form className="subscribe" onSubmit={handleOnSubmit}>
      <label htmlFor="email">{labelText}</label>
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={handleOnChange}
        required
      />
      <input type="submit" value="Enter" />
    </form>
  )
}
