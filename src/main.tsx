import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ApolloProvider } from '@apollo/client'
import React from 'react'
import { setupStore } from './store/store.ts'
import { client } from './client/client.ts'
import { BrowserRouter } from 'react-router-dom'
import './App.css'



const store = setupStore()
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <App />
        </Provider>
      </ApolloProvider>
    </BrowserRouter >
  </React.StrictMode>,
)
