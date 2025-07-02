'use client'

import { useState, useEffect } from 'react'
import TaskForm from '@/components/TaskForm'
import TaskList from '@/components/TaskList'

interface Task {
  id: number
  title: string
  description?: string
  status: string
  dueDate?: string
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [isFormVisible, setIsFormVisible] = useState(false)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks')
      const data = await response.json()
      setTasks(data)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    }
  }

  const handleSubmit = async (taskData: Omit<Task, 'id'>) => {
    try {
      if (editingTask) {
        const response = await fetch(`/api/tasks/${editingTask.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(taskData),
        })
        if (response.ok) {
          setEditingTask(null)
          await fetchTasks()
        }
      } else {
        const response = await fetch('/api/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(taskData),
        })
        if (response.ok) {
          await fetchTasks()
          setIsFormVisible(false)
        }
      }
    } catch (error) {
      console.error('Error saving task:', error)
    }
  }

  const handleEdit = (task: Task) => {
    setEditingTask(task)
    setIsFormVisible(true)
  }

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        await fetchTasks()
      }
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Task Management</h1>
          <button
            onClick={() => {
              setEditingTask(null)
              setIsFormVisible(!isFormVisible)
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            {isFormVisible ? 'Close Form' : 'Add New Task'}
          </button>
        </div>

        {isFormVisible && (
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {editingTask ? 'Edit Task' : 'Create New Task'}
            </h2>
            <TaskForm
              onSubmit={handleSubmit}
              initialData={editingTask}
            />
          </div>
        )}

        <TaskList
          tasks={tasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </main>
  )
} 