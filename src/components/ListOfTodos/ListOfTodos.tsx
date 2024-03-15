import { observer } from "mobx-react-lite";
import React, { useCallback, useEffect, useState }  from "react";
import { useTodoContext } from "../../mobx/store";
import sortIcon from '../../assets/images/sort.png';
import TodoItem from "../TodoItem";
import { ITodo } from "../../interfaces/interfaces";

const ListOfTodos:React.FC = observer(() => {
    const [sorted, setSorted] = useState(false);
    const store = useTodoContext();
    const allTodos = store.getAllTodos();
    const filter = store.getFilterStatus();
    let filteredTodos: ITodo[] =[];

    console.log('list render!');

    if(filter === null) {
        filteredTodos = [...allTodos]
    } else {
        allTodos.forEach(item=> {
            if(item.status === filter) filteredTodos.push(item)
        })
    }
        
    if(sorted) {
        filteredTodos.sort((a, b) => Number(a?.status) - Number(b?.status));
    }
    
   
    

    return (
        <>
            <div className='border'>
                <button className='sortBtn' style={sorted ? {backgroundColor: "white"} : {}} onClick={():void => setSorted(!sorted)}>Sort <img src={sortIcon} alt="sort icon" className='sortImg'/></button>
            </div>
            {!!allTodos.length && 
                <ul className='todoList'>
                    {filteredTodos.reverse().map((item) => {
                        return <TodoItem key={item.id} todo={item}/>
                    }
                    )}
                </ul> 
            }
            {allTodos.length === 0 && <p className='propouse'>Add new Todo</p>}
        </>
    )
})

export default ListOfTodos;