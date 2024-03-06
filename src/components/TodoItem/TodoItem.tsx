import React from "react"
import { ITodo } from "../../interfaces/interfaces"
import s from './TodoItem.module.scss'
import { useAppDispatch } from "../../redux/hooks"
import { deleteTodo } from "../../redux/slice"

interface IProp {
  todo: ITodo
}

const TodoItem: React.FC<IProp> = ({todo}) => {
  const {id, title} = todo
  const dispatch = useAppDispatch()
  const deleteTodoClick = (e: any):void => {
    dispatch(deleteTodo(id))
  }
  return (
    <li key={id} className={s.item}>
      <p className={s.title}>{title}</p>
      <button type="button" className={s.button} onClick={deleteTodoClick}>X</button>
    </li>
  )
}

export default TodoItem