export default function DashboardCard({ title, value }) {
  return (
    <div className="card hover:shadow-lg transition-all">
      <p className="text-gray-500 mb-2">
        {title}
      </p>

      <h2 className="text-3xl font-bold">
        {value}
      </h2>
    </div>
  )
}