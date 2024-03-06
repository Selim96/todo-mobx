import React from "react"
import { ITodo } from "../../interfaces/interfaces"
import s from './TodoItem.module.scss'
import { useAppDispatch } from "../../redux/hooks"
import { deleteTodo, changeTodoStatus } from "../../redux/slice"
import iconDelete from '../../assets/images/trash.png'

interface IProp {
  todo: ITodo
}

const TodoItem: React.FC<IProp> = ({todo}) => {
  const {id, title, status} = todo
  const dispatch = useAppDispatch()
  const deleteTodoClick = (e: any):void => {
    dispatch(deleteTodo(id))
  }
  const changeStatus = (e: React.MouseEvent<HTMLElement>): void => {
    dispatch(changeTodoStatus(id))
  }

  return (
    <li key={id} className={s.item} onClick={changeStatus} style={{backgroundColor: !status ? "var(--red-label)" : 'var(--green-label)'}}>
      <p className={s.title}>{title}</p>
      <button type="button" className={s.button} onClick={deleteTodoClick}><img src={iconDelete} alt="icon" className={s.image}/></button>
    </li>
  )
}

export default TodoItem