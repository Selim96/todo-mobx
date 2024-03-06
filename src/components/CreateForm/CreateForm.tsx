import React, { useState } from "react"
import s from './CreateForm.module.scss'
import { useAppDispatch } from "../../redux/hooks"
import { addNewTodo } from "../../redux/slice"
import { nanoid } from "nanoid"
import { toast } from "react-toastify"

const CreateForm: React.FC = () => {
  const [title, setTitle] = useState('')
  const maxTitleLength = 20

  const dispatch = useAppDispatch()

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value)
  }

  const onSubmit = (e: React.FormEvent<HTMLElement>): void => {
    e.preventDefault()
    if(title.length <= maxTitleLength) {
      const newTodo = {
        id: nanoid(),
        title: title.trim(),
        status: false
      }
      dispatch(addNewTodo(newTodo))
      setTitle('')
    } else {
      toast.error("To long Title for Todo!")
    }
  }

  return (
    <form className={s.form}>
      <input type="text" name="title" value={title} onChange={onChangeInput}  pattern="\S.*"/>
      <button type="submit" className={s.button} onClick={onSubmit} disabled={!title.trim()}>Add</button>
    </form>
  )
}

export default CreateForm