import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './router/Router'
import { ContextProvider } from "./context/Context";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <Router />
    </ContextProvider>
  </React.StrictMode>
)
