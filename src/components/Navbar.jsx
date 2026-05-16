'use client'

import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-blue-600">
        Team Task Manager
      </h1>

      <div className="flex gap-6 items-center">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/tasks">Tasks</Link>

        {session && (
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="primary-btn"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  )
}