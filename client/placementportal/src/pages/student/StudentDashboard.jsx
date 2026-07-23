// src/pages/student/StudentDashboard.jsx
import { Link } from "react-router"
import {
  Briefcase, CheckCircle, Clock, XCircle, TrendingUp,
  Building2, ArrowRight, Calendar, Award, ChevronRight, Bell
} from "lucide-react"
import { useSelector } from "react-redux"   // ← redux
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { useStudentProfile } from "../../hooks/useStudent.js"
import { useLoggedInStudentApplications } from "../../hooks/useApplication.js"
import { useGetCompanies } from "../../hooks/useCompany.js"

const STATUS_COLORS = {
  "Applied":             "#3b82f6",
  "Shortlisted":         "#f59e0b",
  "Interview Scheduled": "#8b5cf6",
  "Selected":            "#10b981",
  "Rejected":            "#ef4444",
}

const STATUS_ICONS = {
  "Applied":             <Clock className="w-4 h-4" />,
  "Shortlisted":         <TrendingUp className="w-4 h-4" />,
  "Interview Scheduled": <Calendar className="w-4 h-4" />,
  "Selected":            <CheckCircle className="w-4 h-4" />,
  "Rejected":            <XCircle className="w-4 h-4" />,
}

export default function StudentDashboard() {

  
  const { user } = useSelector(state => state.auth)
  
  
  

  // ← get full student profile
    const { data: currentStudent} = useStudentProfile();

    // get loggedin student applications
        const { data: applicationsData } = useLoggedInStudentApplications();
        const myApps = applicationsData?.data ?? [];
  
    // get all companies
  const { data: companiesData, isLoading } = useGetCompanies();
   const companies = companiesData?.data ?? [];
 
  const activeCompanies = companies.filter(c => c?.status === "Active")
  const eligibleCompanies = activeCompanies.filter(c => (currentStudent?.data?.cgpa || 0) >= c.minCGPA)

  // pie chart data
  const statusCounts = myApps.reduce((acc, a) => {
    acc[a.status] = (acc[a.status] || 0) + 1
    return acc
  }, {})
  const pieData = Object.entries(statusCounts).map(([name, value]) => ({ name, value }))

  // recent applications
  const recentApps = [...myApps]
    .sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate))
    .slice(0, 5)

  // upcoming deadlines — companies student hasn't applied to yet
  const upcomingDeadlines = eligibleCompanies
    .filter(c => !myApps.find(a => a.company._id === c._id))
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 3)

  // static notifications — will come from backend later
  const notifications = [
    { text: "New company Google added - deadline Apr 15",     type: "info",    time: "2 hours ago" },
    { text: "Interview scheduled with Microsoft on Apr 20",   type: "success", time: "5 hours ago" },
    { text: "Application status updated for Amazon",          type: "update",  time: "1 day ago"   },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Good morning, {currentStudent?.data?.user?.name?.split(" ")[0]}! 👋  
          </h1>
          <p className="text-gray-500 text-sm mt-1">Here's your placement activity overview</p>
        </div>

        {/* Profile Completion Banner */}
        {!currentStudent?.data?.skills?.length && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                <Award className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-amber-800">Complete your profile to apply to companies</p>
                <p className="text-xs text-amber-600">Add your skills, about section and contact details</p>
              </div>
            </div>
            <Link to="/student/profile" className="shrink-0 bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors">
              Complete Now
            </Link>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Applications", value: myApps.length,            bg: "bg-blue-50",   iconBg: "bg-blue-100",   text: "text-blue-700",   icon: Briefcase  },
            { label: "Eligible Companies", value: eligibleCompanies.length,  bg: "bg-green-50",  iconBg: "bg-green-100",  text: "text-green-700",  icon: Building2  },
            { label: "Active Drives",      value: activeCompanies.length,    bg: "bg-purple-50", iconBg: "bg-purple-100", text: "text-purple-700", icon: TrendingUp },
            { label: "Selected",           value: statusCounts["Selected"] || 0, bg: "bg-amber-50", iconBg: "bg-amber-100", text: "text-amber-700", icon: Award },
          ].map(stat => (
            <div key={stat.label} className={`${stat.bg} rounded-2xl p-5`}>
              <div className={`w-10 h-10 ${stat.iconBg} rounded-xl flex items-center justify-center mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.text}`} />
              </div>
              <p className={`text-2xl font-bold ${stat.text}`}>{stat.value}</p>
              <p className="text-gray-600 text-sm mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">

          {/* Pie Chart */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="font-semibold text-gray-800 mb-4">Application Status</h2>
            {myApps.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value">
                      {pieData.map(entry => (
                        <Cell key={entry.name} fill={STATUS_COLORS[entry.name] || "#94a3b8"} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v, n) => [v, n]} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-3 space-y-1.5">
                  {pieData.map(entry => (
                    <div key={entry.name} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: STATUS_COLORS[entry.name] }}></span>
                        <span className="text-gray-600">{entry.name}</span>
                      </div>
                      <span className="font-semibold text-gray-800">{entry.value}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                <Briefcase className="w-10 h-10 mb-2 opacity-30" />
                <p className="text-sm">No applications yet</p>
              </div>
            )}
          </div>

          {/* Student Profile Card */}
          <div className="bg-linear-to-br from-blue-700 to-indigo-700 rounded-2xl p-6 text-white shadow-sm">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-2xl font-bold">
                {currentStudent?.data?.user?.name.charAt(0)}
              </div>
              <div>
                <h2 className="font-semibold text-lg">{currentStudent?.data?.name}</h2>
                <p className="text-blue-200 text-sm">{currentStudent?.data?.rollNo}</p>
                <p className="text-blue-200 text-sm">{currentStudent?.data?.department}</p>
              </div>
            </div>data?.
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "CGPA",        value: currentStudent?.data?.cgpa || "N/A" },
                { label: "Department",  value: currentStudent?.data?.department?.split(" ")[0] || "N/A" },
                { label: "Eligible For", value: `${eligibleCompanies.length} company` },
                { label: "Applied To",  value: `${myApps.length} company` },
              ].map(item => (
                <div key={item.label} className="bg-white/10 rounded-xl p-3">
                  <p className="text-blue-200 text-xs">{item.label}</p>
                  <p className="text-white font-semibold text-sm mt-0.5">{item.value}</p>
                </div>
              ))}
            </div>
            <Link to="/student/profile" className="mt-4 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 rounded-xl py-2.5 text-sm font-medium transition-colors">
              View Full Profile <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-800">Notifications</h2>
              <Bell className="w-4 h-4 text-gray-400" />
            </div>
            <div className="space-y-3">
              {notifications.map((n, i) => (
                <div key={i} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className={`w-2 h-2 rounded-full shrink-0 mt-1.5 ${
                    n.type === "success" ? "bg-green-500" : n.type === "new" ? "bg-blue-500" : "bg-purple-500"
                  }`}></div>
                  <div>
                    <p className="text-sm text-gray-700">{n.text}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="grid lg:grid-cols-2 gap-6">

          {/* Recent Applications */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">Recent Applications</h2>
              <Link to="/student/applications" className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium">
                View All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="divide-y divide-gray-50">
              {recentApps.length > 0 ? recentApps.map(app => (
                <div key={app.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
                      {app?.company?.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{app.companyName}</p>
                      <p className="text-xs text-gray-500">{app.jobRole}</p>
                    </div>
                  </div>
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                    style={{ background: `${STATUS_COLORS[app.status]}20`, color: STATUS_COLORS[app.status] }}
                  >
                    {STATUS_ICONS[app.status]} {app.status}
                  </span>
                </div>
              )) : (
                <div className="px-6 py-10 text-center text-gray-400">
                  <Briefcase className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">No applications yet. Start applying!</p>
                </div>
              )}
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">Apply Before Deadline</h2>
              <Link to="/student/companies" className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium">
                View All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="divide-y divide-gray-50">
              {upcomingDeadlines.length > 0 ? upcomingDeadlines.map(co => {
                const days = Math.ceil((new Date(co.deadline).getTime() - Date.now()) / 86400000)
                return (
                  <div key={co.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-700 font-bold text-sm">
                          {co.logo}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{co.name}</p>
                          <p className="text-xs text-gray-500">{co.jobRole} • {co.packageLPA} LPA</p>
                        </div>
                      </div>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${days <= 7 ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"}`}>
                        {days}d left
                      </span>
                    </div>
                    <Link to="/student/companies" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                      Apply Now <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                )
              }) : (
                <div className="px-6 py-10 text-center text-gray-400">
                  <Building2 className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">You've applied to all eligible companies!</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}