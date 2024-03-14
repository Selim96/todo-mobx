import { makeAutoObservable } from "mobx";
import React, {useContext, createContext } from "react";
import { toast } from "react-toastify";
import { ITodo } from "../interfaces/interfaces";

class Store {
    allTodos: ITodo[] = [];
    private filterStatus:boolean | null = null;
    constructor() {
        makeAutoObservable(this);
        this.allTodos = this.loadFromLocalStorage();
    }

    getFilteredTodos() {
        const filteredTodos: ITodo[] = []
        this.allTodos.forEach(todo => {
            if(this.filterStatus === null) filteredTodos.push(todo);
            if(this.filterStatus === todo.status) filteredTodos.push(todo);
            return;
          });
        return filteredTodos;
    }

    getAllTodos() {
        return this.allTodos;
    }

    getFilterStatus() {
        return this.filterStatus;
    }

    addNewTodo(newTodo: ITodo):void {
        this.allTodos.push(newTodo);
        toast.success("New Todo Created!!");
        this.saveToLocalStorage();
    };

    deleteTodo(deleteId: string) {
        const index = this.allTodos.findIndex((todo) => todo.id === deleteId);

        if (index === -1) {
        return;
        }

        this.allTodos.splice(index, 1);
    };
    changeTodoStatus(changeId: string) {
        const changeTodo = this.allTodos.find(todo=> todo.id === changeId);
        if(!!changeTodo) {
            changeTodo.status = !changeTodo.status;
            this.saveToLocalStorage();
        }

        // const newArray = this.allTodos.map(todo => {
        //   if(todo.id === changeId) {
        //     return {...todo, status: !todo.status}
        //   }
        //   return todo
        // })
        // this.allTodos = [...newArray]
      };
      changeFilter(flag: boolean | null) {
        this.filterStatus = flag
      };

      saveToLocalStorage(): void {
        try {
          localStorage.setItem('todo_data', JSON.stringify(this.allTodos))
        } catch (e) {
          console.error(e)
        }
      };
      loadFromLocalStorage(): any {
        try {
          const dataStr = localStorage.getItem('todo_data');
          return dataStr ? JSON.parse(dataStr) : [];
        } catch (e) {
          console.error(e)
          return null
        }
      }
}

const todoStore = new Store();

const TodoContext = createContext<Store>(todoStore);

export const useTodoContext = () => useContext(TodoContext);

interface IProp {
    children: React.ReactElement
}

const StoreProvider: React.FC<IProp> = ({children}) => {
    const some = 1
    return (
        <TodoContext.Provider value={todoStore}>
            {children}
        </TodoContext.Provider>
    )
}

export default StoreProvider;