import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import TodoItem from './components/TodoItem'
import CreateForm from './components/CreateForm'
import { useAppSelector } from './redux/hooks'
import allSelectors from './redux/selectors'
import Container from './components/Container'



const App: React.FC = () => {
  const allTodos = useAppSelector(allSelectors.getAllTodos)
  return (
    <div className="app">
      <Container>
        <h1 className='title'>My Todos</h1>
        <CreateForm />
        {allTodos && <ul className='todoList'>
          {[...allTodos].reverse().map((item) => {
            return <TodoItem todo={item}/>}
          )}
        </ul> 
        }
        {allTodos.length === 0 && <p>Add new Todo</p>}
      </Container>
      
      <ToastContainer />
    </div>
  )
}

export default App
