'use client'

import Navbar from '@/components/Navbar'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

export default function ProjectsPage() {
  const { data: session } = useSession()

  const [projects, setProjects] = useState([])

  const [form, setForm] = useState({
    title: '',
    description: ''
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()

    setError('')

    try {
      const res = await fetch('/api/projects', {
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
        description: ''
      })

      fetchProjects()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div>
      <Navbar />

      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">
          Projects
        </h1>

        {/* ERROR STATE */}
        {error && (
          <div className="mb-6 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        {/* ROLE-BASED UI */}
        {session?.user?.role === 'ADMIN' && (
          <div className="card mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Create Project
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Project Title"
                className="input"
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value
                  })
                }
              />

              <textarea
                placeholder="Project Description"
                className="input min-h-32"
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value
                  })
                }
              />

              <button className="primary-btn">
                Create Project
              </button>
            </form>
          </div>
        )}

        {/* LOADING STATE */}
        {loading ? (
          <div className="card text-center py-10">
            Loading projects...
          </div>
        ) : (
          <>
            {/* EMPTY STATE */}
            {projects.length === 0 ? (
              <div className="card text-center py-10 text-gray-500">
                No projects found
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {projects.map(project => (
                  <div
                    key={project.id}
                    className="card hover:shadow-lg transition-all duration-200"
                  >
                    <h3 className="text-xl font-bold mb-2">
                      {project.title}
                    </h3>

                    <p className="text-gray-500 mb-4">
                      {project.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-400">
                        Tasks: {project.tasks?.length || 0}
                      </p>

                      <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                        Active
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}