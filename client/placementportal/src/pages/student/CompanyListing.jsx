// src/pages/student/CompanyListings.jsx
import { useState } from "react"
import { Link } from "react-router"
import {
  Search, MapPin, TrendingUp, Users, Clock, CheckCircle, Filter,
  Building2, ChevronRight, X, Briefcase, Award, AlertCircle
} from "lucide-react"
import { useSelector, useDispatch } from "react-redux"          // ← redux
import { applyToCompany } from "../../redux/slices/applicationSlice.js"  // ← redux

const INDUSTRY_FILTERS = ["All", "Technology", "IT Services", "E-Commerce", "Software", "Consulting", "E-Commerce & Cloud"]
const STATUS_FILTERS   = ["All", "Active", "Upcoming", "Closed"]

const STATUS_STYLES = {
  "Active":   "bg-green-50 text-green-700 border-green-100",
  "Upcoming": "bg-amber-50 text-amber-700 border-amber-100",
  "Closed":   "bg-gray-100 text-gray-500 border-gray-200",
}

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

export default function CompanyListings() {

  // ← redux instead of useApp()
  const dispatch                         = useDispatch()
  const { userdata }                     = useSelector(state => state.auth)
  const { studentsList }                 = useSelector(state => state.students)
  const { companiesList: companies }     = useSelector(state => state.companies)
  const { applicationsList: applications } = useSelector(state => state.applications)

  // ← get full student profile
  const currentStudent = studentsList.find(s => s.id === userdata?.id)

  const [search, setSearch]               = useState("")
  const [industry, setIndustry]           = useState("All")
  const [statusFilter, setStatusFilter]   = useState("All")
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [applying, setApplying]           = useState(false)
  const [appliedId, setAppliedId]         = useState(null)
  const [sortBy, setSortBy]               = useState("package")
  const [showEligible, setShowEligible]   = useState(false)

  // ← check if student already applied to a company
  const isApplied = (companyId) =>
    applications.some(a => a.studentId === userdata?.id && a.companyId === companyId)

  // ← check if student is eligible
  const isEligible = (co) => (currentStudent?.cgpa || 0) >= co.minCGPA

  const daysLeft = (deadline) =>
    Math.ceil((new Date(deadline).getTime() - Date.now()) / 86400000)

  const filtered = [...companies]
    .filter(c => {
      const matchSearch   = c.name.toLowerCase().includes(search.toLowerCase()) ||
                            c.jobRole.toLowerCase().includes(search.toLowerCase()) ||
                            c.location.toLowerCase().includes(search.toLowerCase())
      const matchIndustry = industry      === "All" || c.industry === industry
      const matchStatus   = statusFilter  === "All" || c.status   === statusFilter
      const matchEligible = !showEligible || (currentStudent?.cgpa || 0) >= c.minCGPA
      return matchSearch && matchIndustry && matchStatus && matchEligible
    })
    .sort((a, b) => {
      if (sortBy === "package")  return b.packageLPA - a.packageLPA
      if (sortBy === "deadline") return new Date(a.deadline) - new Date(b.deadline)
      return b.positions - a.positions
    })

  // ← dispatch applyToCompany instead of context applyToCompany
  const handleApply = (company) => {
    if (!userdata || !currentStudent) return
    setApplying(true)

    dispatch(applyToCompany({
      studentId:   userdata.id,
      companyId:   company.id,
      studentName: currentStudent.name,
      studentRoll: currentStudent.rollNo,
      companyName: company.name,
      jobRole:     company.jobRole,
      packageLPA:  company.packageLPA,
      department:  currentStudent.department,
      cgpa:        currentStudent.cgpa,
      appliedDate: new Date().toISOString().split('T')[0],
      status:      'Applied',
    }))

    setApplying(false)
    setAppliedId(company.id)
    setTimeout(() => setAppliedId(null), 2000)
    setSelectedCompany(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Company Listings</h1>
          <p className="text-gray-500 text-sm mt-1">Browse and apply to placement drives visiting JMIT campus</p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search company, role, location..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <select value={industry} onChange={e => setIndustry(e.target.value)}
                className="text-sm border border-gray-200 rounded-xl px-3 py-2.5 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                {INDUSTRY_FILTERS.map(i => <option key={i} value={i}>{i === "All" ? "All Industries" : i}</option>)}
              </select>
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                className="text-sm border border-gray-200 rounded-xl px-3 py-2.5 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                {STATUS_FILTERS.map(s => <option key={s} value={s}>{s === "All" ? "All Status" : s}</option>)}
              </select>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                className="text-sm border border-gray-200 rounded-xl px-3 py-2.5 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="package">Sort: Package</option>
                <option value="deadline">Sort: Deadline</option>
                <option value="positions">Sort: Positions</option>
              </select>
              <button
                onClick={() => setShowEligible(!showEligible)}
                className={`flex items-center gap-2 text-sm px-3 py-2.5 rounded-xl border transition-colors ${
                  showEligible ? "border-blue-300 bg-blue-50 text-blue-700" : "border-gray-200 bg-gray-50 text-gray-600"
                }`}
              >
                <Filter className="w-4 h-4" /> Eligible Only
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-xs text-gray-400">{filtered.length} companies found</span>
            {showEligible && (
              <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                Filtered by eligibility
              </span>
            )}
          </div>
        </div>

        {/* Company Grid */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center shadow-sm">
            <Building2 className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-600 mb-1">No companies found</h3>
            <p className="text-sm text-gray-400">Try adjusting your search filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map(co => {
              const applied   = isApplied(co.id)
              const eligible  = isEligible(co)
              const days      = daysLeft(co.deadline)
              const gradient  = COMPANY_COLORS[co.name] || "from-blue-400 to-blue-600"
              return (
                <div
                  key={co.id}
                  className={`bg-white rounded-2xl border overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all ${
                    applied ? "border-green-200" : "border-gray-100"
                  }`}
                >
                  <div className={`h-2 bg-linear-to-r ${gradient}`} />
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl bg-linear-to-r ${gradient} flex items-center justify-center text-white font-bold text-lg shadow-md`}>
                          {co.logo}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{co.name}</h3>
                          <p className="text-xs text-gray-500">{co.industry}</p>
                        </div>
                      </div>
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${STATUS_STYLES[co.status]}`}>
                        {co.status}
                      </span>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-3 mb-4">
                      <p className="text-xs text-gray-400 mb-0.5">Role</p>
                      <p className="text-sm font-semibold text-gray-800">{co.jobRole}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <TrendingUp className="w-4 h-4 text-green-500 shrink-0" />
                        <span className="font-semibold text-gray-800">{co.packageLPA} LPA</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
                        <span className="text-xs truncate">{co.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="w-4 h-4 text-indigo-500 shrink-0" />
                        <span className="text-xs">{co.positions} openings</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Award className="w-4 h-4 text-amber-500 shrink-0" />
                        <span className="text-xs">Min {co.minCGPA} CGPA</span>
                      </div>
                    </div>

                    {/* Deadline */}
                    <div className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg mb-4 ${
                      days < 0 ? "bg-gray-50 text-gray-400" : days <= 7 ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"
                    }`}>
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      {days < 0 ? "Deadline passed" : days === 0 ? "Deadline: Today!" : `Deadline: ${days} days left (${co.deadline})`}
                    </div>

                    {/* Eligibility warning */}
                    {!eligible && (
                      <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded-lg mb-3">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        Your CGPA ({currentStudent?.cgpa}) is below minimum ({co.minCGPA})
                      </div>
                    )}

                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedCompany(co)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-gray-200 text-gray-600 text-sm hover:bg-gray-50 transition-colors"
                      >
                        View Details <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                      {applied ? (
                        <div className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-green-50 text-green-600 text-sm font-medium border border-green-100">
                          <CheckCircle className="w-4 h-4" /> Applied
                        </div>
                      ) : (
                        <button
                          onClick={() => handleApply(co)}
                          disabled={co.status !== "Active" || applying || appliedId === co.id}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-blue-700 text-white text-sm font-medium hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {appliedId === co.id
                            ? <CheckCircle className="w-4 h-4" />
                            : <Briefcase className="w-4 h-4" />
                          }
                          {appliedId === co.id ? "Applied!" : "Apply"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Company Detail Modal */}
      {selectedCompany && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedCompany(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className={`h-24 bg-linear-to-r ${COMPANY_COLORS[selectedCompany.name] || "from-blue-400 to-blue-600"} relative`}>
              <button onClick={() => setSelectedCompany(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-6 pb-6">
              <div className="flex items-end gap-4 -mt-8 mb-5">
                <div className={`w-16 h-16 mt-9 rounded-2xl bg-linear-to-br ${COMPANY_COLORS[selectedCompany.name] || "from-blue-400 to-blue-600"} flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-white`}>
                  {selectedCompany.logo}
                </div>
                <div className="pb-1">
                  <h2 className="text-xl font-bold text-gray-900">{selectedCompany.name}</h2>
                  <p className="text-gray-500 text-sm">{selectedCompany.industry}</p>
                </div>
              </div>

              <div className="space-y-4">

                {/* About */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">About the Company</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{selectedCompany.description}</p>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Industry",  value: selectedCompany.industry                                         },
                    { label: "Package",   value: `${selectedCompany.packageLPA} LPA`                             },
                    { label: "Min CGPA",  value: selectedCompany.minCGPA.toString()                              },
                    { label: "Openings",  value: `${selectedCompany.positions} positions`                        },
                    { label: "Status",    value: selectedCompany.status                                          },
                    { label: "Deadline",  value: new Date(selectedCompany.deadline).toLocaleDateString()         },
                  ].map(item => (
                    <div key={item.label} className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs text-gray-400">{item.label}</p>
                      <p className="text-sm font-medium text-gray-800 mt-0.5">{item.value}</p>
                    </div>
                  ))}
                </div>

                {/* Requirements */}
                {selectedCompany.requirements?.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Requirements</h3>
                    <ul className="space-y-1.5">
                      {selectedCompany.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Eligibility warning */}
                {!isEligible(selectedCompany) && (
                  <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                    <p className="text-sm text-amber-700">
                      Your CGPA ({currentStudent?.cgpa}) is below the minimum requirement ({selectedCompany.minCGPA})
                    </p>
                  </div>
                )}

                {/* Apply Button */}
                {isApplied(selectedCompany.id) ? (
                  <div className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-green-50 text-green-700 font-semibold border border-green-200">
                    <CheckCircle className="w-5 h-5" /> Already Applied
                  </div>
                ) : (
                  <button
                    onClick={() => handleApply(selectedCompany)}
                    disabled={selectedCompany.status !== "Active" || applying}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-blue-200"
                  >
                    {applying
                      ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      : <Briefcase className="w-5 h-5" />
                    }
                    {selectedCompany.status === "Active"   ? "Apply Now"           :
                     selectedCompany.status === "Upcoming" ? "Opening Soon"        :
                                                             "Applications Closed" }
                  </button>
                )}

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}