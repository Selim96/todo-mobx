import  {IState, ITodo} from "../interfaces/interfaces"

const getAllTodos = (state: IState): ITodo[] | [] => state.allTodos
const getStatus = (state: IState): boolean | null => state.filterStatus


const allSelectors = {
  getAllTodos,
  getStatus
}

export default allSelectors