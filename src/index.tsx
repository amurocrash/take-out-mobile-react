import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import 'font-awesome/css/font-awesome.min.css'

// 移动端适配，视口宽度的总rem就是分母，这里就是750
document.documentElement.style.fontSize = 100 / 750 + 'vw'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
)
