import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="max-w-5xl text-center">

        {/* HERO SECTION */}
        <h1 className="text-6xl font-bold text-blue-600 mb-6">
          Team Task Manager
        </h1>

        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          Manage projects, assign tasks, track progress,
          and collaborate with your team efficiently
          using a clean and modern workflow system.
        </p>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">

          <Link
            href="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl transition-all duration-200 font-medium shadow-md hover:shadow-xl hover:-translate-y-1"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="bg-white border border-gray-300 hover:bg-gray-100 px-8 py-4 rounded-2xl transition-all duration-200 font-medium shadow-sm hover:shadow-lg hover:-translate-y-1"
          >
            Signup
          </Link>

        </div>

        {/* FEATURE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* PROJECT MANAGEMENT */}
          <Link
            href="/projects"
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 text-left"
          >
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
              <span className="text-2xl">📁</span>
            </div>

            <h3 className="text-2xl font-semibold mb-3">
              Project Management
            </h3>

            <p className="text-gray-500 leading-relaxed">
              Create, organize, and manage multiple projects
              efficiently with structured workflows.
            </p>
          </Link>

          {/* TASK TRACKING */}
          <Link
            href="/tasks"
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 text-left"
          >
            <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center mb-4">
              <span className="text-2xl">✅</span>
            </div>

            <h3 className="text-2xl font-semibold mb-3">
              Task Tracking
            </h3>

            <p className="text-gray-500 leading-relaxed">
              Assign tasks, update statuses, monitor deadlines,
              and improve team productivity.
            </p>
          </Link>

          {/* TEAM COLLABORATION */}
          <Link
            href="/dashboard"
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 text-left"
          >
            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
              <span className="text-2xl">👥</span>
            </div>

            <h3 className="text-2xl font-semibold mb-3">
              Team Collaboration
            </h3>

            <p className="text-gray-500 leading-relaxed">
              Role-based access for admins and members
              with centralized dashboard visibility.
            </p>
          </Link>

        </div>

      </div>
    </div>
  )
}