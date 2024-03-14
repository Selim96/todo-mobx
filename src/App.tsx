import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CreateForm from './components/CreateForm'
import Container from './components/Container'
import Filter from './components/Filter'
import ListOfTodos from './components/ListOfTodos'
import { Analytics } from '@vercel/analytics/react'

const App: React.FC = () => {
  console.log('app render!')
  return (
    <div className="app">
      <Container>
        <h1 className='title'>My Todos</h1>
        <CreateForm />
        <Filter/>
        <ListOfTodos/>
      </Container>
      
      <ToastContainer />
      <Analytics />
    </div>
  )
}

export default App
