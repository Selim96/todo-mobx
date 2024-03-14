import React from 'react' 
import ReactDOM from 'react-dom/client' 
import App from './App'  
import './stylesheet/shared.scss' 
import StoreProvider from './mobx/store'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
) 
root.render(
  <StoreProvider>
    <App />
  </StoreProvider>
) 

