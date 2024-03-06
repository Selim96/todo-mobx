export interface ITodo {
    id: string,
    title: string,
    status: boolean
}


export interface IState {
    allTodos: ITodo[],
    filterStatus: boolean | null,
};