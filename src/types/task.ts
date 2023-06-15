export interface Task {
    id: number,
    title: string,
    completed: boolean,
}

export type UpdateTask = Pick<Task, "title">

export interface UseTaskManagerState {
    tasks: Task[],
    searchTask: string,
}
interface UseTaskManagerAction {
    addTask: (task: Task) => void,
    updateTask: (taskId: number, task: UpdateTask) => void,
    deleteTask: (taskId: number) => void,
    setSearchTask: (title: string) => void,
}

// fusion these two types
export type UseTaskManager = UseTaskManagerAction & UseTaskManagerState;