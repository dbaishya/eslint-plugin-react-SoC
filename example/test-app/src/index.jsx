import React from 'react'
import ReactDOM from 'react-dom/client'
import { Subscribe } from './Subscribe'
import './index.styles.css'

const TestApp = () => (
  <div className="test-app">
    <h1>subscribe:</h1>
    <Subscribe />
  </div>
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <TestApp />
  </React.StrictMode>
)
