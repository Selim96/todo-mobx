import React from "react"
import s from './Filter.module.scss'
import { observer } from "mobx-react-lite"
import { useTodoContext } from "../../mobx/store"

const Filter: React.FC = observer(() => {
  const store = useTodoContext();

  console.log('filter render!')

  const allTodos = store.getAllTodos();
  const status = store.getFilterStatus();

  const countAll = allTodos.length;
  let countCompleted = 0
  let countCurrent = 0
  allTodos.forEach(todo => {
    if(todo.status) {
      countCompleted++
    } else {
      countCurrent++
    }
  })

  const onChangeFilter = (e: React.MouseEvent<HTMLElement>):void =>{
    const id = e.currentTarget.id
    if(id === '1') store.changeFilter(null)
    if(id === '2') store.changeFilter(true)
    if(id === '3') store.changeFilter(false)
  }
   
  return (
    <div className={s.filter_box}>
      <div className={s.button} key={1} id="1" onClick={onChangeFilter}
        style={{backgroundColor: status === null ? "var(--button)" : ''}}
      ><p>All</p><span>{countAll}</span></div>
      <div className={s.button} key={2} id="2" onClick={onChangeFilter}
        style={status === true ? {backgroundColor:  "var(--green-label)", border: 'none'} : {}}
      ><p>Completed</p><span>{countCompleted}</span></div>
      <div className={s.button} key={3} id="3" onClick={onChangeFilter}
        style={status === false ? {backgroundColor:  "var(--red-label)", border: 'none'} : {}}
      ><p>Current</p><span>{countCurrent}</span></div>
    </div>
  )
})

export default Filter