import React from 'react'
import { Link } from "react-router"
import {
  Users, Building2, Briefcase, CheckCircle, TrendingUp,
  Award, ArrowRight, Clock, XCircle, Calendar,
  ChevronRight, BarChart3
} from "lucide-react"
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts"
import { useSelector } from "react-redux"   // ← redux
import { useAllApplicationsData, useAllStudentData } from '../../hooks/useAllData.js'
import { useGetCompanies } from '../../hooks/useCompany.js'
import { useAdminData } from '../../hooks/useAdminData.js'

const STATUS_COLORS = {
  Applied:              "#3b82f6",
  Shortlisted:          "#f59e0b",
  "Interview Scheduled": "#8b5cf6",
  Selected:             "#10b981",
  Rejected:             "#ef4444",
}
function AdminDashboard() {
    const {userdata} = useSelector((state)=>state.auth)

    // Get admin data

    const {data:userData} = useAdminData()

    // Get all Students // 
    const {data:studentData} = useAllStudentData()
      const studentsList = studentData?.data ?? []
    
       // Get all Application // 

      const {data:applicationData} = useAllApplicationsData()
        const applicationsList = applicationData?.data ?? []
    
      // get ALl companies
      const { data: companiesData, isLoading } = useGetCompanies();
      const companiesList = companiesData?.data ?? [];

      // console.log(studentsList , applicationsList , companiesList , userData)
      console.log(applicationsList)
      // console.log(applicationData)
    // stats
    const totalStudents = studentsList.length
    const totalApplications = applicationsList.length
    const totalCompanies = companiesList.length

    const activeCompanies = companiesList.filter((company)=>company.status === "Active").length
    const upcomingCompanies = companiesList.filter((company)=>company.status === "Upcoming").length
    const placedStudents =[... new Set( applicationsList.filter((app)=>app.status === "Selected").map((app)=>app?.student?._id))].length

    // pie chart data
    const statusCounts = applicationsList.reduce((acc,currApp)=>{
        acc[currApp.status] = (acc[currApp.status] || 0) + 1
        return acc
    },{})

      const pieData = Object.entries(statusCounts).map(([name, value]) => ({ name, value }))

      // bar chart data
  const deptPlacements = studentsList.reduce((acc, s) => {
    if (!s.department) return acc
    const dept = s.department.split(' ')[0]
    if (!acc[dept]) acc[dept] = { dept, placed: 0, total: 0 }
    acc[dept].total += 1
    const isPlaced = applicationsList.some(a => a?.student?._id === s._id && a.status === 'Selected')
    if (isPlaced) acc[dept].placed += 1
    return acc
  }, {})
  const barData = Object.values(deptPlacements)

  // recent applications
  const recentApps = [...applicationsList]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 8)
    // console.log(recentApps)

    const placementRate = totalStudents > 0
    ? ( Math.round((placedStudents / totalStudents) * 100))
    : 0

  const summaryCards = [
    { label: 'Total Students',  value: totalStudents,      sub: `${placedStudents} placed`,                    icon: Users,    gradient: 'from-blue-500 to-blue-700',    link: '/admin/students'  },
    { label: 'Companies',       value: totalCompanies,     sub: `${activeCompanies} active`,                   icon: Building2, gradient: 'from-indigo-500 to-indigo-700', link: '/admin/companies' },
    { label: 'Applications',    value: totalApplications,  sub: `${statusCounts['Selected'] || 0} selected`,   icon: Briefcase, gradient: 'from-purple-500 to-purple-700', link: '/admin/students'  },
    { label: 'Placement Rate',  value: `${placementRate}%`, sub: `${placedStudents} selected`,                 icon: Award,    gradient: 'from-green-500 to-green-700',  link: '/admin/students'  },
  ]

  const quickStats = [
    { label: 'Applied',              value: statusCounts['Applied']              || 0, color: 'text-blue-600',   bg: 'bg-blue-50',   icon: Briefcase  },
    { label: 'Shortlisted',          value: statusCounts['Shortlisted']          || 0, color: 'text-amber-600',  bg: 'bg-amber-50',  icon: TrendingUp },
    { label: 'Interview Scheduled',  value: statusCounts['Interview Scheduled']  || 0, color: 'text-purple-600', bg: 'bg-purple-50', icon: Calendar   },
    { label: 'Selected',             value: statusCounts['Selected']             || 0, color: 'text-green-600',  bg: 'bg-green-50',  icon: CheckCircle },
    { label: 'Rejected',             value: statusCounts['Rejected']             || 0, color: 'text-red-600',    bg: 'bg-red-50',    icon: XCircle    },
    { label: 'Upcoming Companies',   value: upcomingCompanies,                        color: 'text-gray-600',   bg: 'bg-gray-50',   icon: Clock      },
  ]
   
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              JMIT Placement Cell — Admin 👋
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Welcome back, {userdata?.data?.name}. Here's the JMIT placement overview.  {/* ← from redux */}
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/admin/companies"
              className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-800 transition-colors shadow-md shadow-blue-200"
            >
              <Building2 className="w-4 h-4" /> Manage Companies
            </Link>
            <Link
              to="/admin/students"
              className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              <Users className="w-4 h-4" /> Manage Students
            </Link>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {summaryCards.map((card) => (
            <Link
              key={card.label}
              to={card.link}
              className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <div className={`absolute inset-0 bg-linear-to-br ${card.gradient} opacity-90`}></div>
              <div className="relative p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center">
                    <card.icon className="w-5 h-5 text-white" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                </div>
                <p className="text-3xl font-bold text-white">{card.value}</p>
                <p className="text-white/90 text-sm font-medium mt-0.5">{card.label}</p>
                <p className="text-white/60 text-xs mt-0.5">{card.sub}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {quickStats.map((stat) => (
            <div key={stat.label} className={`${stat.bg} rounded-2xl p-4 text-center`}>
              <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-1.5`} />
              <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-gray-500 text-xs mt-0.5 leading-tight">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">

          {/* Pie Chart */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <h2 className="font-semibold text-gray-800">Application Status Distribution</h2>
            </div>
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" outerRadius={90} innerRadius={50} dataKey="value" paddingAngle={3}>
                    {pieData.map((entry) => (
                      <Cell key={entry.name} fill={STATUS_COLORS[entry.name] || '#94a3b8'} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v, n) => [`${v} applications`, n]} />
                  <Legend iconType="circle" iconSize={8} formatter={(value) => <span style={{ fontSize: '0.75rem' }}>{value}</span>} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-60 flex items-center justify-center text-gray-400">No data available</div>
            )}
          </div>

          {/* Bar Chart */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <Users className="w-5 h-5 text-indigo-600" />
              <h2 className="font-semibold text-gray-800">Department-wise Placements</h2>
            </div>
            {barData.length > 0 ? (
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={barData} barGap={4}>
                  <XAxis dataKey="dept" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 8 }} formatter={(v, n) => [v, n === 'placed' ? 'Placed' : 'Total']} />
                  <Bar dataKey="total"  name="Total"  fill="#e0e7ff" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="placed" name="Placed" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-60 flex items-center justify-center text-gray-400">No data available</div>
            )}
          </div>

        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Recent Applications */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">Recent Applications</h2>
              <Link to="/admin/students" className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium">
                View All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-6 py-3 text-xs text-gray-500 font-semibold uppercase tracking-wider">Student</th>
                    <th className="text-left px-4 py-3 text-xs text-gray-500 font-semibold uppercase tracking-wider">Company</th>
                    <th className="text-left px-4 py-3 text-xs text-gray-500 font-semibold uppercase tracking-wider">Date</th>
                    <th className="text-left px-4 py-3 text-xs text-gray-500 font-semibold uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentApps.map((app) => (
                    <tr key={app._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-xs shrink-0">
                            {app?.student?.user?.name?.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800 text-xs">{app?.student?.user?.name}</p>
                            <p className="text-gray-400 text-xs">{app?.student?.rollNo}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <p className="font-medium text-gray-800 text-xs">{app?.company?.name}</p>
                        <p className="text-gray-400 text-xs">{app?.company?.jobRole}</p>
                      </td>
                      <td className="px-4 py-3.5 text-gray-500 text-xs whitespace-nowrap">
                        {new Date(app.appliedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap"
                          style={{ background: `${STATUS_COLORS[app.status]}18`, color: STATUS_COLORS[app.status] }}
                        >
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-5">

            {/* Top Companies */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-800 text-sm">Top Companies</h2>
                <Link to="/admin/companies" className="text-xs text-blue-600 hover:underline font-medium">View all</Link>
              </div>
              <div className="space-y-3">
                {companiesList
                  .filter(c => c.status === 'Active')
                  .sort((a, b) => b.packageLPA - a.packageLPA)
                  .slice(0, 4)
                  .map((co) => (
                    <div key={co.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
                          {co.logo}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{co.name}</p>
                          <p className="text-xs text-gray-400">{co.positions} positions</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                        {co.packageLPA} LPA
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-linear-to-br from-blue-700 to-indigo-700 rounded-2xl p-5 text-white shadow-sm">
              <h2 className="font-semibold mb-4 text-sm">Quick Actions</h2>
              <div className="space-y-2.5">
                {[
                  { to: '/admin/companies', label: 'Manage Companies',          icon: Building2   },
                  { to: '/admin/students',  label: 'Update Application Status', icon: CheckCircle },
                  { to: '/admin/students',  label: 'View All Students',         icon: Users       },
                ].map((action) => (
                  <Link
                    key={action.to + action.label}
                    to={action.to}
                    className="flex items-center justify-between bg-white/10 hover:bg-white/20 rounded-xl p-3 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <action.icon className="w-4 h-4 text-white/80" />
                      <span className="text-sm font-medium">{action.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/60" />
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard