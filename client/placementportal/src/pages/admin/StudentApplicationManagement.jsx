// src/pages/admin/StudentApplicationManagement.jsx
import { useState } from "react";
import {
  Users,
  Search,
  Filter,
  ChevronDown,
  Eye,
  Edit3,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  Calendar,
  Briefcase,
  Award,
  X,
  Save,
  GraduationCap,
  Phone,
  Mail,
  Building,
  Star,
  ArrowUpDown,
  LayoutGrid,
  List,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux"; // ← redux

import { useAllApplicationsData, useAllStudentData } from "../../hooks/useAllData.js";

const STATUS_CONFIG = {
  Applied: {
    color: "#3b82f6",
    bg: "bg-blue-50",
    icon: <Clock className="w-4 h-4" />,
  },
  Shortlisted: {
    color: "#f59e0b",
    bg: "bg-amber-50",
    icon: <TrendingUp className="w-4 h-4" />,
  },
  "Interview Scheduled": {
    color: "#8b5cf6",
    bg: "bg-purple-50",
    icon: <Calendar className="w-4 h-4" />,
  },
  Selected: {
    color: "#10b981",
    bg: "bg-green-50",
    icon: <CheckCircle className="w-4 h-4" />,
  },
  Rejected: {
    color: "#ef4444",
    bg: "bg-red-50",
    icon: <XCircle className="w-4 h-4" />,
  },
};

const STATUSES = [
  "Applied",
  "Shortlisted",
  "Interview Scheduled",
  "Selected",
  "Rejected",
];
const ROUND_OPTIONS = [
  "",
  "Aptitude Test",
  "Technical Round 1",
  "Technical Round 2",
  "HR Round",
  "Offer Extended",
];

// ── StatusBadge ───────────────────────────────────────────────
function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status];
  if (!cfg) return null;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.bg}`}
      style={{ color: cfg.color }}
    >
      {cfg.icon} {status}
    </span>
  );
}

// ── UpdateStatusModal ─────────────────────────────────────────
function UpdateStatusModal({ app, onSave, onClose }) {
  const [status, setStatus] = useState(app.status);
  const [round, setRound] = useState(app.round || "");

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center">
              <Edit3 className="w-4 h-4 text-blue-700" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Update Status</h3>
              <p className="text-xs text-gray-400">
                {app.studentName} → {app.companyName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Application Status
            </label>
            <div className="grid grid-cols-1 gap-2">
              {STATUSES.map((s) => {
                const cfg = STATUS_CONFIG[s];
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatus(s)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all text-left ${
                      status === s
                        ? `${cfg.bg}`
                        : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span style={{ color: cfg.color }}>{cfg.icon}</span>
                      <span
                        className="text-sm font-medium"
                        style={{ color: cfg.color }}
                      >
                        {s}
                      </span>
                    </div>
                    {status === s && (
                      <CheckCircle
                        className="w-4 h-4"
                        style={{ color: cfg.color }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Current Round (optional)
            </label>
            <select
              value={round}
              onChange={(e) => setRound(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="">— Select round —</option>
              {ROUND_OPTIONS.filter(Boolean).map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={() => onSave(status, round)}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-700 text-white py-2.5 rounded-xl font-medium hover:bg-blue-800 transition-colors shadow-md shadow-blue-200 text-sm"
            >
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── StudentDetailModal ────────────────────────────────────────
function StudentDetailModal({ student, apps, onClose }) {
  
  // Get all Application //

  const { data: applicationData } = useAllApplicationsData();
  const studentApps = applicationData?.data ?? [];

  const selected = studentApps.filter((a) => a.status === "Selected");

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-linear-to-r from-blue-700 to-indigo-700 p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-white font-bold text-2xl">
              {student.user.name.charAt(0)}
            </div>
            <div>
              <h2 className="font-bold text-white text-lg">{student.name}</h2>
              <p className="text-blue-200 text-sm">{student.rollNo}</p>
              <p className="text-blue-200 text-sm">
                {student.department} • {student.year}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-blue-50 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-blue-700">
                {student.cgpa?.toFixed(1)}
              </p>
              <p className="text-xs text-gray-500">CGPA</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-amber-700">
                {studentApps.length}
              </p>
              <p className="text-xs text-gray-500">Applied</p>
            </div>
            <div className="bg-green-50 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-green-700">
                {selected.length}
              </p>
              <p className="text-xs text-gray-500">Selected</p>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-2.5">
            <h3 className="text-sm font-semibold text-gray-700">
              Contact Information
            </h3>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Mail className="w-4 h-4 text-gray-400" /> {student.email}
            </div>
            {student.phone && (
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Phone className="w-4 h-4 text-gray-400" /> {student.phone}
              </div>
            )}
          </div>

          {/* Skills */}
          {student.skills?.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {student.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Applications */}
          {studentApps.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Applications ({studentApps.length})
              </h3>
              <div className="space-y-2">
                {studentApps.map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center justify-between bg-gray-50 rounded-xl p-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {app.companyName}
                      </p>
                      <p className="text-xs text-gray-400">
                        {app.jobRole} • {app.packageLPA} LPA
                      </p>
                    </div>
                    <StatusBadge status={app.status} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {selected.length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-green-600" />
                <p className="text-sm font-semibold text-green-800">
                  Placement Offer
                </p>
              </div>
              {selected.map((s) => (
                <p key={s.id} className="text-sm text-green-700">
                  {s.companyName} — {s.packageLPA} LPA
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────
export default function StudentApplicationManagement() {
  const dispatch = useDispatch();
  
  // Get all Application // 

      const {data:applicationData} = useAllApplicationsData()
        const applications = applicationData?.data ?? []

   // Get all Students // 
    const {data:studentData} = useAllStudentData()
      const students = studentData?.data ?? []

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [companyFilter, setCompanyFilter] = useState("All");
  const [deptFilter, setDeptFilter] = useState("All");
  const [sortBy, setSortBy] = useState("date");
  const [viewMode, setViewMode] = useState("table");
  const [updateApp, setUpdateApp] = useState(null);
  const [viewStudent, setViewStudent] = useState(null);
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const companyNames = [
    "All",
    ...Array.from(new Set(applications.map((a) => a.company.name))).sort(),
  ];
  const departments = [
    "All",
    ...Array.from(new Set(students.map((s) => s.department || "")))
      .filter(Boolean)
      .sort(),
  ];

  const filtered = [...applications]
    .filter((a) => {
      const matchSearch =
        a.student.user.name.toLowerCase().includes(search.toLowerCase()) ||
        a.company.name.toLowerCase().includes(search.toLowerCase()) ||
        a.student.rollNo?.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "All" || a.status === statusFilter;
      const matchCompany =
        companyFilter === "All" || a.company.name === companyFilter;
      const matchDept = deptFilter === "All" || a.student.department === deptFilter;
      return matchSearch && matchStatus && matchCompany && matchDept;
    })
    .sort((a, b) => {
      if (sortBy === "date")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "name") return a.student.user.name.localeCompare(b.student.user.name);
      return b.student.cgpa - a.student.cgpa;
    });

  // ← dispatch updateStatus instead of setApplications
  const handleStatusUpdate = (status, round) => {
    if (!updateApp) return;
    dispatch(updateStatus({ id: updateApp.id, status, round })); // ← redux
    showToast(`Status updated for ${updateApp.studentName}`);
    setUpdateApp(null);
  };

  const statusCounts = applications.reduce((acc, a) => {
    acc[a.status] = (acc[a.status] || 0) + 1;
    return acc;
  }, {});

  const summaryCards = [
    {
      label: "Total Applications",
      value: applications.length,
      bg: "bg-blue-50",
      color: "text-blue-600",
      icon: Briefcase,
    },
    {
      label: "Shortlisted",
      value: statusCounts["Shortlisted"] || 0,
      bg: "bg-amber-50",
      color: "text-amber-600",
      icon: TrendingUp,
    },
    {
      label: "Selected",
      value: statusCounts["Selected"] || 0,
      bg: "bg-green-50",
      color: "text-green-600",
      icon: CheckCircle,
    },
    {
      label: "Pending",
      value: statusCounts["Applied"] || 0,
      bg: "bg-gray-50",
      color: "text-gray-600",
      icon: Clock,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-400" /> {toast}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Student Applications
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Manage and update JMIT student application statuses
            </p>
          </div>
        </div>
        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {summaryCards.map((card) => (
            <div
              key={card.label}
              className={`${card.bg} rounded-2xl p-4 flex items-center gap-3`}
            >
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                <card.icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <div>
                <p className={`text-2xl font-bold ${card.color}`}>
                  {card.value}
                </p>
                <p className="text-gray-600 text-xs">{card.label}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by student, company, roll no..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none text-sm border border-gray-200 rounded-xl pl-3 pr-8 py-2.5 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Status</option>
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
              </div>
              <div className="relative">
                <select
                  value={companyFilter}
                  onChange={(e) => setCompanyFilter(e.target.value)}
                  className="appearance-none text-sm border border-gray-200 rounded-xl pl-3 pr-8 py-2.5 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {companyNames.map((c) => (
                    <option key={c} value={c}>
                      {c === "All" ? "All Companies" : c}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
              </div>
              <div className="relative">
                <select
                  value={deptFilter}
                  onChange={(e) => setDeptFilter(e.target.value)}
                  className="appearance-none text-sm border border-gray-200 rounded-xl pl-3 pr-8 py-2.5 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {departments.map((d) => (
                    <option key={d} value={d}>
                      {d === "All" ? "All Departments" : d}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
              </div>
              <button
                onClick={() =>
                  setSortBy(
                    sortBy === "date"
                      ? "name"
                      : sortBy === "name"
                        ? "cgpa"
                        : "date",
                  )
                }
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 text-sm hover:bg-gray-100 transition-colors"
              >
                <ArrowUpDown className="w-3.5 h-3.5" />
                Sort:{" "}
                {sortBy === "date"
                  ? "Date"
                  : sortBy === "name"
                    ? "Name"
                    : "CGPA"}
              </button>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {filtered.length} applications
          </p>
        </div>
        {/* card View */}
        /* Card View */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.length === 0 ? (
            <div className="col-span-full bg-white rounded-2xl border border-gray-100 p-16 text-center shadow-sm">
              <Briefcase className="w-12 h-12 text-gray-200 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-500">
                No applications found
              </h3>
            </div>
          ) : (
            filtered.map((app) => (
              <div
                key={app._id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                        {app.student.user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">
                          {app.student.user.name.studentName}
                        </p>
                        <p className="text-xs text-gray-400">
                          {app.student.rollNo} • CGPA {app.student.cgpa}
                        </p>
                      </div>
                    </div>
                    <StatusBadge status={app.status} />
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">
                          {app.company.name}
                        </p>
                        <p className="text-xs text-gray-500">{app.company.jobRole}</p>
                      </div>
                      <span className="text-green-600 font-bold text-sm">
                        {app.company.packageLPA} LPA
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(app.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Building className="w-3.5 h-3.5" /> {app.student.department}
                    </span>
                    {app.round && (
                      <span className="text-purple-500 font-medium">
                        {app.round}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const student = students.find(
                          (s) => s._id === app.student._id,
                        );
                        if (student) setViewStudent(student);
                      }}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-gray-200 text-gray-600 text-xs hover:bg-gray-50 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" /> View Profile
                    </button>
                    <button
                      onClick={() => setUpdateApp(app)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-blue-700 text-white text-xs hover:bg-blue-800 transition-colors font-medium"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Update
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {filtered.length > 0 && (
          <p className="text-xs text-gray-400 mt-3 px-1">
            Showing {filtered.length} of {applications.length} applications
          </p>
        )}
      </div>

      {/* Modals */}
      {updateApp && (
        <UpdateStatusModal
          app={updateApp}
          onSave={handleStatusUpdate}
          onClose={() => setUpdateApp(null)}
        />
      )}
      {viewStudent && (
        <StudentDetailModal
          student={viewStudent}
          apps={applications}
          onClose={() => setViewStudent(null)}
        />
      )}
    </div>
  );
}
