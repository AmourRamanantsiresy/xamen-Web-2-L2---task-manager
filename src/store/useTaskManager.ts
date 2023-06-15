import { useLocalStorage } from "@/hooks/useLocalStorage"
import { Task, UseTaskManager, UseTaskManagerState } from "@/types"
import { create } from "zustand"

// error if the task id provided do not exist
const UpdateFailedError = (message: string) => { throw new Error(`Update failed : ${message}`) }

const useTaskManager = () => {
  const { read, save: cache } = useLocalStorage<UseTaskManagerState>("taskManagerState")
  const lastTaskManager = read()

  /**
   * will cache the value and return the same value
   * @param value 
   * @returns 
   */
  const save = (value: UseTaskManagerState) => {
    cache(value);
    return value
  }

  return create<UseTaskManager>()(set => ({
    addTask(task) {
      set(state => save({ ...state, tasks: [...state.tasks, task] }))
    },
    deleteTask(taskId) {
      set(state => save({ ...state, tasks: state.tasks.filter(({ id }) => id !== taskId) }))
    }, setSearchTask(title) {
      set(state => save({ ...state, searchTask: title }))
    },
    updateTask(taskId, task) {
      set(state => {
        const currentTask = state.tasks.filter(t => t.id === taskId)
        if (currentTask.length === 0) {
          UpdateFailedError(`Task ${taskId} not found.`)
        }
        const updatedTask: Task = { ...currentTask[0], ...task }

        return save({ ...state, tasks: [...state.tasks.filter(t => t.id !== taskId), updatedTask] })
      })
    }, searchTask: lastTaskManager?.searchTask || "",
    tasks: lastTaskManager?.tasks || []
  }))()
}

export {
  useTaskManager
}