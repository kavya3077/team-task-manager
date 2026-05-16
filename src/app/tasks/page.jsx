'use client'

import Navbar from '@/components/Navbar'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

export default function TasksPage() {
  const { data: session } = useSession()

  const [tasks, setTasks] = useState([])
  const [projects, setProjects] = useState([])
  const [users, setUsers] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    projectId: '',
    assignedTo: ''
  })

  async function fetchTasks() {
    try {
      const res = await fetch('/api/tasks')

      if (!res.ok) {
        throw new Error('Failed to fetch tasks')
      }

      const data = await res.json()
      setTasks(data)
    } catch (err) {
      setError(err.message)
    }
  }

  async function fetchProjects() {
    try {
      const res = await fetch('/api/projects')

      if (!res.ok) {
        throw new Error('Failed to fetch projects')
      }

      const data = await res.json()
      setProjects(data)
    } catch (err) {
      setError(err.message)
    }
  }

  async function fetchUsers() {
    try {
      const res = await fetch('/api/users')

      if (!res.ok) {
        throw new Error('Failed to fetch users')
      }

      const data = await res.json()
      setUsers(data)
    } catch (err) {
      setError(err.message)
    }
  }

  async function loadData() {
    setLoading(true)

    await Promise.all([
      fetchTasks(),
      fetchProjects(),
      fetchUsers()
    ])

    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()

    setError('')

    try {
      console.log(form)
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message)
      }

      setForm({
        title: '',
        description: '',
        dueDate: '',
        projectId: '',
        assignedTo: ''
      })

      fetchTasks()
    } catch (err) {
      setError(err.message)
    }
  }

  async function updateStatus(id, status) {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      })

      if (!res.ok) {
        throw new Error('Failed to update status')
      }

      fetchTasks()
    } catch (err) {
      setError(err.message)
    }
  }

  function getStatusColor(status) {
    switch (status) {
      case 'DONE':
        return 'bg-green-100 text-green-700'

      case 'IN_PROGRESS':
        return 'bg-yellow-100 text-yellow-700'

      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div>
      <Navbar />

      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">
          Tasks
        </h1>

        {error && (
          <div className="mb-6 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        {/* ROLE BASED UI */}
        {session?.user?.role === 'ADMIN' && (
          <div className="card mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Create Task
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid md:grid-cols-2 gap-4"
            >
              <input
                type="text"
                placeholder="Task Title"
                className="input"
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value
                  })
                }
              />

              <input
                type="date"
                className="input"
                value={form.dueDate}
                onChange={(e) =>
                  setForm({
                    ...form,
                    dueDate: e.target.value
                  })
                }
              />

              <textarea
                placeholder="Description"
                className="input md:col-span-2 min-h-28"
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value
                  })
                }
              />

              <select
                required
                className="input"
                value={form.projectId}
                onChange={(e) =>
                  setForm({
                    ...form,
                    projectId: e.target.value
                  })
                }
              >
                <option value="">
                  Select Project
                </option>

                {projects.map(project => (
                  <option
                    key={project.id}
                    value={project.id}
                  >
                    {project.title}
                  </option>
                ))}
              </select>

              <select
                className="input"
                value={form.assignedTo}
                onChange={(e) =>
                  setForm({
                    ...form,
                    assignedTo: e.target.value
                  })
                }
              >
                <option value="">
                  Select Member
                </option>

                {users.map(user => (
                  <option
                    key={user.id}
                    value={user.id}
                  >
                    {user.name}
                  </option>
                ))}
              </select>

              <button className="primary-btn md:col-span-2">
                Create Task
              </button>
            </form>
          </div>
        )}

        {/* LOADING STATE */}
        {loading ? (
          <div className="card text-center py-10">
            Loading tasks...
          </div>
        ) : (
          <div className="card overflow-x-auto">
            {tasks.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                No tasks found
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3">
                      Task
                    </th>

                    <th className="text-left py-3">
                      Project
                    </th>

                    <th className="text-left py-3">
                      Assigned To
                    </th>

                    <th className="text-left py-3">
                      Due Date
                    </th>

                    <th className="text-left py-3">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {tasks.map(task => (
                    <tr
                      key={task.id}
                      className="border-b hover:bg-gray-50 transition-all"
                    >
                      <td className="py-4">
                        <div>
                          <p className="font-medium">
                            {task.title}
                          </p>

                          <p className="text-sm text-gray-500">
                            {task.description}
                          </p>
                        </div>
                      </td>

                      <td>
                        {task.project?.title || 'N/A'}
                      </td>

                      <td>
                        {task.assignedUser?.name || 'N/A'}
                      </td>

                      <td>
                        {new Date(
                          task.dueDate
                        ).toLocaleDateString()}
                      </td>

                      <td>
                        {session?.user?.role === 'ADMIN' ? (
                          <select
                            value={task.status}
                            className={`px-3 py-2 rounded-xl border ${getStatusColor(task.status)}`}
                            onChange={(e) =>
                              updateStatus(
                                task.id,
                                e.target.value
                              )
                            }
                          >
                            <option value="TODO">
                              TODO
                            </option>

                            <option value="IN_PROGRESS">
                              IN PROGRESS
                            </option>

                            <option value="DONE">
                              DONE
                            </option>
                          </select>
                        ) : (
                          <span
                            className={`px-3 py-2 rounded-xl text-sm font-medium ${getStatusColor(task.status)}`}
                          >
                            {task.status}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  )
}