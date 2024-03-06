import { configureStore, combineReducers } from "@reduxjs/toolkit"
import reducer from "./slice"
import { ITodo } from "../interfaces/interfaces"


const saveToLocalStorage = (data: ITodo[] | undefined): void => {
  try {
    localStorage.setItem('todo_data', JSON.stringify(data))
  } catch (e) {
    console.error(e)
  }
}

const loadFromLocalStorage = (): any => {
  try {
    const dataStr = localStorage.getItem('todo_data')
    return dataStr ? JSON.parse(dataStr) : []
  } catch (e) {
    console.error(e)
    return null
  }
}

const persistedStore = loadFromLocalStorage()

const store = configureStore({
  reducer,
  preloadedState: {
    allTodos: persistedStore,
    filterStatus: null
  },
})

store.subscribe(() => {
  saveToLocalStorage(store.getState().allTodos)
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch