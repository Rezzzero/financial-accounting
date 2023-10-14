import React from 'react'
import ReactDOM from 'react-dom/client'

import './main.css'
import MainPage from './pages/MainPage.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MainPage />
  </React.StrictMode>,
)
