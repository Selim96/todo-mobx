import { observer } from "mobx-react-lite";
import React, { useCallback, useState }  from "react";
import { useTodoContext } from "../../mobx/store";
import sortIcon from '../../assets/images/sort.png';
import TodoItem from "../TodoItem";

const ListOfTodos:React.FC = observer(() => {
    const [sorted, setSorted] = useState(false)
    const store = useTodoContext()
    const allTodos = store.allTodos

    console.log('list render!');

    const hanldChangeStatus = useCallback((id: string) => {
        store.changeTodoStatus(id)
    }, [store]);

    const handlDeleteItem = useCallback((id:string)=>{
        store.deleteTodo(id)
    }, []);
  
    if(sorted) allTodos.sort((a, b) => Number(a?.status) - Number(b?.status));

    return (
        <>
            <div className='border'>
                <button className='sortBtn' style={sorted ? {backgroundColor: "white"} : {}} onClick={():void => setSorted(!sorted)}>Sort <img src={sortIcon} alt="sort icon" className='sortImg'/></button>
            </div>
            {!!allTodos.length && 
                <ul className='todoList'>
                    {allTodos.map((item) => {
                        return <TodoItem key={item.id} todo={item} changeStatus={hanldChangeStatus} deleteItem={handlDeleteItem}/>
                    }
                    )}
                </ul> 
            }
            {allTodos.length === 0 && <p className='propouse'>Add new Todo</p>}
        </>
    )
})

export default ListOfTodos;