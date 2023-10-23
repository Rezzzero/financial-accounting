import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store/index.tsx'
import './main.css'
import MainPage from './pages/MainPage.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <MainPage />
    </Provider>
  </React.StrictMode>,
)
