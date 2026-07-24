// src/pages/admin/CompanyManagement.jsx
import { useState } from "react";
import {
  Building2,
  Plus,
  Search,
  Edit3,
  Trash2,
  X,
  Save,
  MapPin,
  TrendingUp,
  Users,
  Award,
  Clock,
  CheckCircle,
  AlertTriangle,
  MoreVertical,
  Filter,
  Briefcase,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux"; // ← redux

import { nanoid } from "nanoid";

const INDUSTRY_OPTIONS = [
  "Technology",
  "IT Services",
  "E-Commerce",
  "Software",
  "Consulting",
  "E-Commerce & Cloud",
  "Finance",
  "Healthcare",
  "Manufacturing",
];
const STATUS_OPTIONS = ["Active", "Upcoming", "Closed"];

const STATUS_STYLES = {
  Active: "bg-green-50 text-green-700 border-green-200",
  Upcoming: "bg-amber-50 text-amber-700 border-amber-200",
  Closed: "bg-gray-100 text-gray-500 border-gray-200",
};

const emptyForm = {
  name: "",
  logo: "",
  industry: "Technology",
  location: "",
  packageLPA: 0,
  positions: 0,
  minCGPA: 0,
  deadline: "",
  description: "",
  status: "Active",
  jobRole: "",
  requirements: [],
};

// ── CompanyFormModal ──────────────────────────────────────────
import { useForm } from "react-hook-form";
import {
  useAddCompany,
  usedeleteCompany,
  useGetCompanies,
  useUpdataCompany,
} from "../../hooks/useCompany.js";
import { useEffect } from "react";

function CompanyFormModal({ initial, onSave, onClose }) {

  // for Requirements
  const [reqInput, setReqInput] = useState("");
  const [requirements, setRequirements] = useState(initial?.requirements || []);

  // console.log(initial)
  // console.log(requirements)

  // for eligibleBraches
  const [branchInput, setBranchInput] = useState("");
  const [eligibleBranches, setEligibleBranches] = useState(
    initial?.eligibleBranches || [],
  );
 

useEffect(() => {
  if (initial) {
    setEligibleBranches(initial.eligibleBranches);
     setRequirements(initial.requirements );
  }
}, [initial]);



  const addBranch = () => {
    const branch = branchInput.trim();
    console.log(branch)

    if (branch && !eligibleBranches.includes(branch)) {
      setEligibleBranches([...eligibleBranches, branch]);
    }

    setBranchInput("");
  };

  const removeBranch = (branch) => {
    setEligibleBranches(eligibleBranches.filter((b) => b !== branch));
  };

   const addReq = () => {
    const r = reqInput.trim();
    if (r && !requirements.includes(r)) {
      setRequirements([...requirements, r]);
    }
    setReqInput("");
  };

  const removeReq = (r) => setRequirements(requirements.filter((x) => x !== r));

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    defaultValues: initial
      ? { ...initial }
      : {
          name: "",
          logo: "",
          industry: "Technology",
          location: "",
          packageLPA: "",
          positions: "",
          minCGPA: "",
          deadline: "",
          description: "",
          status: "Active",
          jobRole: "",
        },
  });

 

  // ← RHF calls this only if all validations pass
  const onSubmit = (data) => {
    
    const logo = data.logo || data.name.charAt(0).toUpperCase();
    if (branchInput.trim()) {
    eligibleBranches.push(branchInput.trim());
  }
    data.requirements = requirements;
    data.eligibleBranches = eligibleBranches;
    if (initial) {
      onSave(data, initial._id); // Edit
    } else {
      onSave(data); // Add
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-blue-700" />
            </div>
            <h2 className="font-semibold text-gray-900">
              {initial ? "Edit Company" : "Add New Company"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* ← handleSubmit wraps onSubmit */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          {/* Name & Logo */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Company Name *
              </label>
              <input
                placeholder="e.g. Google"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? "border-red-300" : "border-gray-200"}`}
                {...register("name", { required: "Company name is required" })}
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Logo Text
              </label>
              <input
                placeholder="e.g. G (auto-set)"
                maxLength={3}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("logo")}
              />
            </div>
          </div>

          {/* Industry & Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Industry *
              </label>
              <select
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                {...register("industry")}
              >
                {INDUSTRY_OPTIONS.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Status *
              </label>
              <select
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                {...register("status")}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Job Role & Location */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Job Role *
              </label>
              <input
                placeholder="e.g. Software Engineer"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.jobRole ? "border-red-300" : "border-gray-200"}`}
                {...register("jobRole", { required: "Job role is required" })}
              />
              {errors.jobRole && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.jobRole.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Location *
              </label>
              <input
                placeholder="e.g. Bangalore, India"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.location ? "border-red-300" : "border-gray-200"}`}
                {...register("location", { required: "Location is required" })}
              />
              {errors.location && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.location.message}
                </p>
              )}
            </div>
          </div>

          {/* Package, Positions, CGPA, Deadline */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Package (LPA) *
              </label>
              <input
                type="number"
                min="0"
                step="0.5"
                placeholder="e.g. 12"
                className={`w-full px-3 py-2.5 rounded-xl border text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.packageLPA ? "border-red-300" : "border-gray-200"}`}
                {...register("packageLPA", {
                  required: "Package is required",
                  valueAsNumber: true,
                  min: { value: 0.1, message: "Package must be > 0" },
                })}
              />
              {errors.packageLPA && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.packageLPA.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Positions *
              </label>
              <input
                type="number"
                min="1"
                placeholder="e.g. 10"
                className={`w-full px-3 py-2.5 rounded-xl border text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.positions ? "border-red-300" : "border-gray-200"}`}
                {...register("positions", {
                  required: "Positions is required",
                  valueAsNumber: true,
                  min: { value: 1, message: "Positions must be > 0" },
                })}
              />
              {errors.positions && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.positions.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Min CGPA *
              </label>
              <input
                type="number"
                min="0"
                max="10"
                step="0.1"
                placeholder="e.g. 7.5"
                className={`w-full px-3 py-2.5 rounded-xl border text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.minCGPA ? "border-red-300" : "border-gray-200"}`}
                {...register("minCGPA", {
                  required: "Min CGPA is required",
                  valueAsNumber: true,
                  min: { value: 0, message: "Min CGPA is 0" },
                  max: { value: 10, message: "Max CGPA is 10" },
                })}
              />
              {errors.minCGPA && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.minCGPA.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Deadline *
              </label>
              <input
                type="date"
                className={`w-full px-3 py-2.5 rounded-xl border text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.deadline ? "border-red-300" : "border-gray-200"}`}
                {...register("deadline", { required: "Deadline is required" })}
              />
              {errors.deadline && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.deadline.message}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Company Description
            </label>
            <textarea
              placeholder="Brief company overview..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              {...register("description")}
            />
          </div>
            {/* EligibleBranches */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Eligible Branches
            </label>

            <div className="flex gap-2 mb-2">
              <input
                value={branchInput}
                onChange={(e) => setBranchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addBranch();
                  }
                }}
                placeholder="Add branch (e.g. IT, CSE)"
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={addBranch}
                className="px-4 py-2.5 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {eligibleBranches.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {eligibleBranches.map((branch) => (
                  <span
                    key={branch}
                    className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-100 px-3 py-1.5 rounded-full text-xs font-medium"
                  >
                    {branch}

                    <button
                      type="button"
                      onClick={() => removeBranch(branch)}
                      className="text-green-500 hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Requirements — still useState, RHF not ideal for dynamic lists */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Requirements
            </label>
            <div className="flex gap-2 mb-2">
              <input
                value={reqInput}
                onChange={(e) => setReqInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addReq();
                  }
                }}
                placeholder="Add a requirement and press Enter"
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={addReq}
                className="px-4 py-2.5 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {requirements.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {requirements.map((r) => (
                  <span
                    key={r}
                    className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1.5 rounded-full text-xs font-medium"
                  >
                    {r}
                    <button
                      type="button"
                      onClick={() => removeReq(r)}
                      className="text-blue-400 hover:text-red-500 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 bg-blue-700 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 transition-all shadow-md shadow-blue-200 text-sm"
            >
              <Save className="w-4 h-4" />{" "}
              {initial ? "Save Changes" : "Add Company"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── DeleteConfirmModal ────────────────────────────────────────
function DeleteConfirmModal({ company, onConfirm, onClose }) {
  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-7 h-7 text-red-500" />
        </div>
        <h3 className="font-semibold text-gray-900 text-center mb-2">
          Remove Company?
        </h3>
        <p className="text-sm text-gray-500 text-center mb-6">
          Are you sure you want to remove <strong>{company.name}</strong>? This
          action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition-colors text-sm"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ─────────────f───────────────────────────────
export default function CompanyManagement() {
  

  // get ALl companies
  const { data: companiesData, isLoading } = useGetCompanies();
  const companiesList = companiesData?.data ?? [];

  const { mutate: addCompany } = useAddCompany();
  const { mutate: deleteCompany } = usedeleteCompany();
  const { mutate: updateCompany } = useUpdataCompany();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editCompany, setEditCompany] = useState(null);
  const [deleteComp, setDeleteComp] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null);
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const filtered = companiesList.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.jobRole.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  // ←  addCompany
  const handleAdd = (data, id) => {
    
    addCompany(data);
    setShowForm(false);
    showToast(`${data.name} added successfully!`);
  };

  // ←  updateCompany
  const handleEdit = (data, id) => {
    if (!editCompany) return;
    updateCompany({ data, id });
    setEditCompany(null);
    showToast(`${data.name} updated successfully!`);
  };

  // ←  deleteCompany
  const handleDelete = () => {
    if (!deleteComp) return;
    deleteCompany(deleteComp._id);
    showToast(`${deleteComp.name} removed.`);
    setDeleteComp(null);
  };

  // ←  updateCompany for status change
  const handleStatusChange = ( status , id) => {
     updateCompany({  data: {
      status,
    }, id });
    setMenuOpen(null);
    showToast("Status updated!");
  };

  const stats = [
    {
      label: "Total Companies",
      value: companiesList.length,
      icon: Building2,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Active Drives",
      value: companiesList.filter((c) => c.status === "Active").length,
      icon: TrendingUp,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Upcoming",
      value: companiesList.filter((c) => c.status === "Upcoming").length,
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Total Positions",
      value: companiesList.reduce((acc, c) => acc + c.positions, 0),
      icon: Briefcase,
      color: "text-purple-600",
      bg: "bg-purple-50",
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
              Company Management
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Add, edit and manage placement drives visiting JMIT
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-800 transition-colors shadow-md shadow-blue-200 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" /> Add Company
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className={`${s.bg} rounded-2xl p-4 flex items-center gap-3`}
            >
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div>
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-gray-600 text-xs">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6 shadow-sm flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by company or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <Filter className="w-4 h-4 text-gray-400 self-center" />
            {["All", "Active", "Upcoming", "Closed"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors border ${
                  statusFilter === s
                    ? "bg-blue-700 text-white border-blue-700"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Companies Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-16 text-center">
              <Building2 className="w-12 h-12 text-gray-200 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-500 mb-1">
                No companies found
              </h3>
              <p className="text-sm text-gray-400">
                {search || statusFilter !== "All"
                  ? "Try adjusting your search"
                  : "Add your first company!"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-6 py-3.5 text-xs text-gray-500 font-semibold uppercase tracking-wider">
                      Company
                    </th>
                    <th className="text-left px-4 py-3.5 text-xs text-gray-500 font-semibold uppercase tracking-wider">
                      Role & Industry
                    </th>
                    <th className="text-left px-4 py-3.5 text-xs text-gray-500 font-semibold uppercase tracking-wider">
                      Package
                    </th>
                    <th className="text-left px-4 py-3.5 text-xs text-gray-500 font-semibold uppercase tracking-wider">
                      Positions
                    </th>
                    <th className="text-left px-4 py-3.5 text-xs text-gray-500 font-semibold uppercase tracking-wider">
                      Deadline
                    </th>
                    <th className="text-left px-4 py-3.5 text-xs text-gray-500 font-semibold uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-right px-6 py-3.5 text-xs text-gray-500 font-semibold uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((co) => {
                    const days = Math.ceil(
                      (new Date(co.deadline).getTime() - Date.now()) / 86400000,
                    );
                    return (
                      <tr
                        key={co.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm shrink-0">
                              {co.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">
                                {co.name}
                              </p>
                              <div className="flex items-center gap-1 text-xs text-gray-400">
                                <MapPin className="w-3 h-3" /> {co.location}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <p className="font-medium text-gray-800">
                            {co.jobRole}
                          </p>
                          <p className="text-xs text-gray-400">{co.industry}</p>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                            <span className="font-semibold text-gray-800">
                              {co.packageLPA} LPA
                            </span>
                          </div>
                          <p className="text-xs text-gray-400">
                            Min CGPA: {co.minCGPA}
                          </p>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5 text-indigo-400" />
                            <span className="text-gray-700">
                              {co.positions}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <p className="text-gray-700 text-xs">{co.deadline}</p>
                          <p
                            className={`text-xs font-medium mt-0.5 ${days < 0 ? "text-gray-400" : days <= 7 ? "text-red-500" : "text-amber-500"}`}
                          >
                            {days < 0 ? "Passed" : `${days}d left`}
                          </p>
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${STATUS_STYLES[co.status]}`}
                          >
                            {co.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-1 relative">
                            <button
                              onClick={() => setEditCompany(co)}
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeleteComp(co)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <div className="relative">
                              <button
                                onClick={() =>
                                  setMenuOpen(menuOpen === co.id ? null : co.id)
                                }
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                              >
                                <MoreVertical className="w-4 h-4" />
                              </button>
                              {menuOpen === co.id && (
                                <div className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20">
                                  <p className="px-3 py-1.5 text-xs text-gray-400 font-semibold uppercase tracking-wider">
                                    Change Status
                                  </p>
                                  {STATUS_OPTIONS.map((s) => (
                                    <button
                                      key={s}
                                      onClick={() =>
                                        handleStatusChange( s , co._id)
                                      }
                                      className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 ${co.status === s ? "text-blue-600 font-medium" : "text-gray-700"}`}
                                    >
                                      {co.status === s && (
                                        <CheckCircle className="w-3.5 h-3.5" />
                                      )}
                                      {s}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="text-xs text-gray-400 mt-3 px-1">
          Showing {filtered.length} of {companiesList.length} companies
        </p>
      </div>

      {/* Modals */}
      {showForm && (
        <CompanyFormModal
          onSave={handleAdd}
          onClose={() => setShowForm(false)}
        />
      )}
      {editCompany && (
        <CompanyFormModal
          initial={editCompany}
          onSave={handleEdit}
          onClose={() => setEditCompany(null)}
        />
      )}
      {deleteComp && (
        <DeleteConfirmModal
          company={deleteComp}
          onConfirm={handleDelete}
          onClose={() => setDeleteComp(null)}
        />
      )}
    </div>
  );
}
