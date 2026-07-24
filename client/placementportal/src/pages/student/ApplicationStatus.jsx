// src/pages/student/ApplicationStatus.jsx
import { useState } from "react"
import { Link } from "react-router"
import {
  Briefcase, CheckCircle, Clock, XCircle, TrendingUp, Calendar,
  Search, Filter, Building2, ArrowRight, ChevronRight, Package,
  AlertCircle, Star, X
} from "lucide-react"
import { useSelector } from "react-redux"   // ← redux
import { useStudentProfile } from "../../hooks/useStudent.js"
import { useLoggedInStudentApplications } from "../../hooks/useApplication.js"

const STATUS_CONFIG = {
  "Applied":             { color: "#3b82f6", bg: "bg-blue-50",   border: "border-blue-100",   icon: <Clock className="w-4 h-4" />,       step: 1 },
  "Shortlisted":         { color: "#f59e0b", bg: "bg-amber-50",  border: "border-amber-100",  icon: <TrendingUp className="w-4 h-4" />,  step: 2 },
  "Interview Scheduled": { color: "#8b5cf6", bg: "bg-purple-50", border: "border-purple-100", icon: <Calendar className="w-4 h-4" />,    step: 3 },
  "Selected":            { color: "#10b981", bg: "bg-green-50",  border: "border-green-100",  icon: <CheckCircle className="w-4 h-4" />, step: 4 },
  "Rejected":            { color: "#ef4444", bg: "bg-red-50",    border: "border-red-100",    icon: <XCircle className="w-4 h-4" />,     step: 0 },
}

const PIPELINE_STEPS  = ["Applied", "Shortlisted", "Interview Scheduled", "Selected"]

const COMPANY_COLORS = {
  "Google":    "from-blue-400 to-blue-600",
  "Microsoft": "from-green-400 to-green-600",
  "Amazon":    "from-amber-400 to-orange-500",
  "Infosys":   "from-indigo-400 to-indigo-600",
  "TCS":       "from-purple-400 to-purple-600",
  "Flipkart":  "from-yellow-400 to-orange-500",
  "Adobe":     "from-red-400 to-red-600",
  "Deloitte":  "from-blue-500 to-indigo-600",
}

// ── PipelineBar ───────────────────────────────────────────────
function PipelineBar({ status }) {
  const currentStep = STATUS_CONFIG[status]?.step ?? 0
  const isRejected  = status === "Rejected"
  return (
    <div className="flex items-center gap-1 mt-3">
      {PIPELINE_STEPS.map((step, idx) => {
        const stepNum = idx + 1
        const active  = !isRejected && stepNum <= currentStep
        const current = !isRejected && stepNum === currentStep
        return (
          <div key={step} className="flex items-center flex-1">
            <div className={`flex-1 h-1.5 rounded-full transition-all ${active ? "bg-blue-500" : "bg-gray-200"} ${current ? "bg-blue-600" : ""}`} />
            {idx < PIPELINE_STEPS.length - 1 && (
              <div className={`w-2.5 h-2.5 rounded-full mx-0.5 shrink-0 border-2 ${active ? "bg-blue-500 border-blue-500" : "bg-white border-gray-300"}`} />
            )}
          </div>
        )
      })}
      {isRejected && <div className="flex-1 h-1.5 rounded-full bg-red-200" />}
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────
export default function ApplicationStatus() {

   // ← get full student profile
   const { data: currentStudentData} = useStudentProfile();

   // get loggedin student applications
    const { data: applicationsData } = useLoggedInStudentApplications();
    const applications = applicationsData?.data ?? [];
    

  const [search, setSearch]         = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [selected, setSelected]     = useState(null)

  const statusCounts = applications.reduce((acc, a) => {
    acc[a.status] = (acc[a.status] || 0) + 1
    return acc
  }, {})

  const filtered = [...applications]
    .filter(a => {
      const matchSearch = a.company.name.toLowerCase().includes(search.toLowerCase()) ||
                          a.company.jobRole.toLowerCase().includes(search.toLowerCase())
      const matchStatus = statusFilter === "All" || a.status === statusFilter
      return matchSearch && matchStatus
    })
    .sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate))

  const summaryCards = [
    { label: "Total Applied",        value: applications.length,                        bg: "bg-blue-50",   iconBg: "bg-blue-100",   text: "text-blue-700",   icon: Briefcase  },
    { label: "Shortlisted",          value: statusCounts["Shortlisted"]        || 0, bg: "bg-amber-50",  iconBg: "bg-amber-100",  text: "text-amber-700",  icon: TrendingUp },
    { label: "Interview Scheduled",  value: statusCounts["Interview Scheduled"] || 0, bg: "bg-purple-50", iconBg: "bg-purple-100", text: "text-purple-700", icon: Calendar   },
    { label: "Selected",             value: statusCounts["Selected"]           || 0, bg: "bg-green-50",  iconBg: "bg-green-100",  text: "text-green-700",  icon: CheckCircle },
    { label: "Rejected",             value: statusCounts["Rejected"]           || 0, bg: "bg-red-50",    iconBg: "bg-red-100",    text: "text-red-700",    icon: XCircle    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
            <p className="text-gray-500 text-sm mt-1">Track the status of all your placement applications</p>
          </div>
          <Link to="/student/companies"
            className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-800 transition-colors shadow-md shadow-blue-200">
            <Briefcase className="w-4 h-4" /> Apply to More
          </Link>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {summaryCards.map(card => (
            <button
              key={card.label}
              onClick={() => setStatusFilter(card.label === "Total Applied" ? "All" : card.label)}
              className={`${card.bg} rounded-2xl p-4 text-left transition-all hover:shadow-md hover:-translate-y-0.5 ${
                statusFilter === (card.label === "Total Applied" ? "All" : card.label) ? "ring-2 ring-blue-400" : ""
              }`}
            >
              <div className={`w-9 h-9 ${card.iconBg} rounded-xl flex items-center justify-center mb-2`}>
                <card.icon className={`w-4 h-4 ${card.text}`} />
              </div>
              <p className={`text-xl font-bold ${card.text}`}>{card.value}</p>
              <p className="text-gray-600 text-xs mt-0.5">{card.label}</p>
            </button>
          ))}
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6 shadow-sm flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search by company or role..."
              value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {["All", "Applied", "Shortlisted", "Interview Scheduled", "Selected", "Rejected"].map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors border ${
                  statusFilter === s ? "bg-blue-700 text-white border-blue-700" : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                }`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Applications List */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center shadow-sm">
            <Briefcase className="w-14 h-14 text-gray-200 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-600 mb-1">No applications found</h3>
            <p className="text-sm text-gray-400 mb-5">
              {search || statusFilter !== "All" ? "Try adjusting your filters" : "Start applying to companies!"}
            </p>
            <Link to="/student/companies"
              className="inline-flex items-center gap-2 bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-800 transition-colors">
              Browse Companies <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map(app => {
              const cfg      = STATUS_CONFIG[app.status]
              const gradient = COMPANY_COLORS[app.company.name] || "from-blue-400 to-blue-600"
              return (
                <div key={app._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all">
                  <div className={`h-1.5 bg-linear-to-r ${gradient}`} />
                  <div className="p-5">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">

                      {/* Company Logo */}
                      <div className={`w-14 h-14 rounded-2xl bg-linear-to-br ${gradient} flex items-center justify-center text-white font-bold text-xl shadow-md shrink-0`}>
                        {app.company.name.charAt(0)}
                      </div>

                      {/* Main Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900 text-base">{app.companyName}</h3>
                            <p className="text-sm text-gray-500">{app.jobRole}</p>
                          </div>
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border self-start sm:self-auto ${cfg.bg} ${cfg.border}`}
                            style={{ color: cfg.color }}
                          >
                            {cfg.icon} {app.status}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-gray-500 mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            Applied: {new Date(app.appliedDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Package className="w-3.5 h-3.5" />
                            {app.packageLPA} LPA
                          </span>
                          {app.round && (
                            <span className="flex items-center gap-1">
                              <ChevronRight className="w-3.5 h-3.5" /> {app.round}
                            </span>
                          )}
                        </div>

                        {/* Pipeline */}
                        {app.status !== "Rejected" && (
                          <div>
                            <div className="flex justify-between text-xs text-gray-400 mb-1">
                              {PIPELINE_STEPS.map(s => (
                                <span key={s} className={`${STATUS_CONFIG[app.status]?.step >= STATUS_CONFIG[s]?.step ? "text-blue-600 font-medium" : ""}`}>
                                  {s === "Interview Scheduled" ? "Interview" : s}
                                </span>
                              ))}
                            </div>
                            <PipelineBar status={app.status} />
                          </div>
                        )}

                        {app.status === "Rejected" && (
                          <div className="flex items-center gap-2 text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            Application was not shortlisted this time. Keep trying!
                          </div>
                        )}

                        {app.status === "Selected" && (
                          <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 px-3 py-2 rounded-lg border border-green-100">
                            <Star className="w-3.5 h-3.5 shrink-0 fill-green-500 text-green-500" />
                            Congratulations! Offer extended at {app.packageLPA} LPA
                          </div>
                        )}
                      </div>

                      {/* Detail Button */}
                      <button onClick={() => setSelected(app)}
                        className="shrink-0 flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium px-3 py-2 rounded-xl hover:bg-blue-50 transition-colors border border-blue-100 self-start">
                        Details <ChevronRight className="w-3.5 h-3.5" />
                      </button>

                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className={`h-20 bg-linear-to-r mb-9 ${COMPANY_COLORS[selected.company.name] || "from-blue-400 to-blue-600"} relative`}>
              <button onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-6 pb-6">
              <div className="flex items-end gap-4 -mt-7 mb-5">
                <div className={`w-14 h-14 rounded-2xl bg-linear-to-br ${COMPANY_COLORS[selected.companyName] || "from-blue-400 to-blue-600"} flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-white`}>
                  {selected.company.name.charAt(0)}
                </div>
                <div className="pb-1 ">
                  <h2 className="text-lg  font-bold text-gray-900">{selected.company.name}</h2>
                  <p className="text-sm text-gray-500">{selected.company.jobRole}</p>
                </div>
              </div>

              <div className="space-y-3">

                {/* Status Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Current Status</span>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${STATUS_CONFIG[selected.status].bg} ${STATUS_CONFIG[selected.status].border}`}
                    style={{ color: STATUS_CONFIG[selected.status].color }}
                  >
                    {STATUS_CONFIG[selected.status].icon} {selected.status}
                  </span>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Job Role",     value: selected.company.jobRole                                          },
                    { label: "Package",      value: `${selected.company.packageLPA} LPA`                             },
                    { label: "Status",       value: selected.status                                           },
                    { label: "Round",        value: selected.round || "N/A"                                   },
                    { label: "Applied Date", value: new Date(selected.createdAt).toLocaleDateString()       },
                    { label: "Deadline",     value: selected.company.deadline ? new Date(selected.company.deadline).toLocaleDateString() : "N/A" },
                  ].map(item => (
                    <div key={item.label} className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs text-gray-400">{item.label}</p>
                      <p className="text-sm font-medium text-gray-800 mt-0.5">{item.value}</p>
                    </div>
                  ))}
                </div>

                {/* Pipeline */}
                {selected.status !== "Rejected" && (
                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-xs font-semibold text-blue-800 mb-3 uppercase tracking-wide">Application Pipeline</p>
                    <div className="space-y-3">
                      {PIPELINE_STEPS.map((step, idx) => {
                        const currentStepNum = STATUS_CONFIG[selected.status]?.step ?? 0
                        const done    = currentStepNum >= idx + 1
                        const current = currentStepNum === idx + 1
                        return (
                          <div key={step} className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${done ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-400"} ${current ? "ring-4 ring-blue-200" : ""}`}>
                              {done ? <CheckCircle className="w-3.5 h-3.5" /> : <span className="text-xs">{idx + 1}</span>}
                            </div>
                            <span className={`text-sm ${done ? "text-gray-800 font-medium" : "text-gray-400"}`}>{step}</span>
                            {current && (
                              <span className="text-xs text-blue-600 bg-white px-2 py-0.5 rounded-full ml-auto font-medium border border-blue-200">
                                Current
                              </span>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {selected.status === "Selected" && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-green-800 font-semibold">🎉 You've been selected!</p>
                    <p className="text-green-700 text-sm mt-0.5">Offer extended at {selected.packageLPA} LPA</p>
                  </div>
                )}

                {selected.status === "Rejected" && (
                  <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-center">
                    <XCircle className="w-10 h-10 text-red-400 mx-auto mb-2" />
                    <p className="text-red-700 font-semibold text-sm">Not shortlisted this time</p>
                    <p className="text-red-500 text-xs mt-0.5">Don't give up — more opportunities await!</p>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}