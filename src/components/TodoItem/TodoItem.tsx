import React from "react"
import { ITodo } from "../../interfaces/interfaces"
import s from './TodoItem.module.scss'
import iconDelete from '../../assets/images/trash.png'
import { useTodoContext } from "../../mobx/store"
import { observer } from "mobx-react-lite"

interface IProp {
  todo: ITodo
}

const TodoItem: React.FC<IProp> = observer(({todo}) => {
  const {id, title, status} = todo;
  const store = useTodoContext();

  console.log('item render!')

  const deleteTodoClick = (e: React.MouseEvent<HTMLElement>):void => {
    store.deleteTodo(id)
  }
  const changeStatus = (e: React.MouseEvent<HTMLElement>): void => {
    store.changeTodoStatus(id)
  }

  return (
    <li key={id} className={s.item} onClick={changeStatus} style={{backgroundColor: !status ? "var(--red-label)" : 'var(--green-label)'}}>
      <p className={s.title}>{title}</p>
      <button type="button" className={s.button} onClick={deleteTodoClick}><img src={iconDelete} alt="icon" className={s.image}/></button>
    </li>
  )
})

export default TodoItem;