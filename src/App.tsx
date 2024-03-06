import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import TodoItem from './components/TodoItem'
import CreateForm from './components/CreateForm'
import { useAppSelector } from './redux/hooks'
import allSelectors from './redux/selectors'
import Container from './components/Container'
import Filter from './components/Filter'
import sortIcon from './assets/images/sort.png'
import { Analytics } from '@vercel/analytics/react'


const App: React.FC = () => {
  const [sorted, setSorted] = useState(false)
  const allTodos = useAppSelector(allSelectors.getAllTodos)
  const status = useAppSelector(allSelectors.getStatus)
  const filteredTodos = allTodos.map(todo => {
    if(status === null) return todo
    if(status === todo.status) return todo
    return null
  })
  if(sorted) filteredTodos.sort((a, b) => Number(a?.status) - Number(b?.status))
  return (
    <div className="app">
      <Container>
        <h1 className='title'>My Todos</h1>
        <CreateForm />
        <Filter/>
        <div className='border'>
          <button className='sortBtn' style={sorted ? {backgroundColor: "white"} : {}} onClick={():void => setSorted(!sorted)}>Sort <img src={sortIcon} alt="sort icon" className='sortImg'/></button>
        </div>
        
        {!!allTodos.length && <ul className='todoList'>
          {[...filteredTodos].reverse().map((item) => {
            if(item) return <TodoItem todo={item}/>
          }
          )}
        </ul> 
        }
        {allTodos.length === 0 && <p className='propouse'>Add new Todo</p>}
      </Container>
      
      <ToastContainer />
      <Analytics />
    </div>
  )
}

export default App
