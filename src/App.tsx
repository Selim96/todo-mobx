import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import TodoItem from './components/TodoItem'
import CreateForm from './components/CreateForm'
import { useAppSelector } from './redux/hooks'
import allSelectors from './redux/selectors'
import Container from './components/Container'
import Filter from './components/Filter'



const App: React.FC = () => {
  const allTodos = useAppSelector(allSelectors.getAllTodos)
  const status = useAppSelector(allSelectors.getStatus)
  const filteredTodos = allTodos.map(todo => {
    if(status === null) return todo
    if(status === todo.status) return todo
    return
  })
  return (
    <div className="app">
      <Container>
        <h1 className='title'>My Todos</h1>
        <CreateForm />
        <Filter/>
        {allTodos && <ul className='todoList'>
          {[...filteredTodos].reverse().map((item) => {
            if(item)
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
