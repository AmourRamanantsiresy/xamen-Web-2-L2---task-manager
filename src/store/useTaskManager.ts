import { Task, UseTaskManager } from "@/types"
import { create } from "zustand"

// or if the task id provided do not exist
const UpdateFailedError = (message: string) => { throw new Error(`Update failed : ${message}`) }

const useTaskManager = create<UseTaskManager>()(set => ({
  addTask(task) {
    set(state => ({ ...state, tasks: [...state.tasks, task] }))
  },
  deleteTask(taskId) {
    set(state => ({ ...state, tasks: state.tasks.filter(({ id }) => id !== taskId) }))
  }, setSearchTask(title) {
    set(state => ({ ...state, searchTask: title }))
  },
  updateTask(taskId, task) {
    set(state => {
      const currentTask = state.tasks.filter(t => t.id === taskId)
      if (currentTask.length === 0) {
        UpdateFailedError(`Task ${taskId} not found.`)
      }
      const updatedTask: Task = { ...currentTask[0], ...task }

      return { ...state, tasks: [...state.tasks.filter(t => t.id !== taskId), updatedTask] }
    })
  }, searchTask: "",
  tasks: []
}))

export {
  useTaskManager
}