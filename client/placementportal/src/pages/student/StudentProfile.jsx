// src/pages/student/StudentProfile.jsx
import { useState , useEffect} from "react"
import {
  User, Mail, Phone, Building, BookOpen, Star, Edit3, Save, X,
  Plus, Trash2, Linkedin, Github, FileText, MapPin, Award, CheckCircle
} from "lucide-react"
import { useSelector, useDispatch } from "react-redux"       // ← redux

import { useStudentProfile, useUpdateStudentProfile } from "../../hooks/useStudent.js"

const SKILL_SUGGESTIONS = ["React", "Node.js", "Python", "Java", "C++", "SQL", "MongoDB", "AWS", "Docker", "Machine Learning", "TypeScript", "Angular", "Vue.js", "Spring Boot", "Django", "Flutter", "Kotlin", "Swift", "TensorFlow", "Kubernetes"]

export default function StudentProfile() {



   // ← get full student profile
   const { data: currentStudent} = useStudentProfile();

   const {mutate} = useUpdateStudentProfile()
 

  const [editing, setEditing] = useState(false)
  const [saved, setSaved]     = useState(false)
  const [newSkill, setNewSkill] = useState("")

  const [form, setForm] = useState({
  name: "",
  phone: "",
  address: "",
  about: "",
  linkedin: "",
  github: "",
  skills: [],
  cgpa: "",
});


useEffect(() => {
  if (currentStudent?.data) {
    setForm({
      name: currentStudent.data.user.name || "",
      phone: currentStudent.data.phone || "",
      address: currentStudent.data.address || "",
      about: currentStudent.data.about || "",
      linkedin: currentStudent.data.linkedin || "",
      github: currentStudent.data.github || "",
      skills: currentStudent.data.skills || [],
      cgpa: currentStudent.data.cgpa?.toString() || "",
    });
  }
}, [currentStudent]);

  const update = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const addSkill = (skill) => {
    const s = skill.trim()
    if (s && !form.skills.includes(s)) {
      setForm(f => ({ ...f, skills: [...f.skills, s] }))
    }
    setNewSkill("")
  }

  const removeSkill = (skill) => setForm(f => ({ ...f, skills: f.skills.filter(s => s !== skill) }))

  // ← dispatch updateStudent instead of setCurrentUser
  const handleSave = () => {
    if (!currentStudent?.data) return
      mutate(form)
    setEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const profileCompletion = () => {
    const fields = [form.name, form.phone, form.about, form.linkedin, form.github, form.skills.length > 0 ? "yes" : ""]
    return Math.round((fields.filter(Boolean).length / fields.length) * 100)
  }

  const completion = profileCompletion()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-500 text-sm mt-0.5">Manage your personal and academic information</p>
          </div>
          <div className="flex items-center gap-3">
            {saved && (
              <span className="flex items-center gap-1.5 text-green-600 text-sm font-medium bg-green-50 px-3 py-1.5 rounded-lg">
                <CheckCircle className="w-4 h-4" /> Saved!
              </span>
            )}
            {editing ? (
              <>
                <button onClick={() => setEditing(false)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-gray-600 text-sm hover:bg-gray-50 transition-colors">
                  <X className="w-4 h-4" /> Cancel
                </button>
                <button onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-700 text-white text-sm hover:bg-blue-800 transition-colors shadow-md shadow-blue-200">
                  <Save className="w-4 h-4" /> Save Changes
                </button>
              </>
            ) : (
              <button onClick={() => setEditing(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-700 text-white text-sm hover:bg-blue-800 transition-colors shadow-md shadow-blue-200">
                <Edit3 className="w-4 h-4" /> Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Profile Completion */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Profile Completion</span>
            </div>
            <span className={`text-sm font-bold ${completion >= 80 ? "text-green-600" : completion >= 50 ? "text-amber-600" : "text-red-500"}`}>
              {completion}%
            </span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${completion >= 80 ? "bg-green-500" : completion >= 50 ? "bg-amber-500" : "bg-red-400"}`}
              style={{ width: `${completion}%` }}
            />
          </div>
          {completion < 100 && (
            <p className="text-xs text-gray-400 mt-1.5">Complete your profile to improve your chances with recruiters</p>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Left Column */}
          <div className="lg:col-span-1 space-y-5">

            {/* Avatar Card */}
            <div className="bg-linear-to-br from-blue-700 to-indigo-700 rounded-2xl p-6 text-center text-white shadow-sm">
              <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                {currentStudent?.data?.user?.name?.charAt(0)}
              </div>
              {editing ? (
                <input
                  value={form.name}
                  onChange={e => update("name", e.target.value)}
                  className="w-full bg-white/20 rounded-xl px-3 py-2 text-white placeholder-white/60 text-center text-sm focus:outline-none focus:bg-white/30"
                />
              ) : (
                <h2 className="font-semibold text-lg">{currentStudent?.data?.user?.name}</h2>
              )}
              <p className="text-blue-200 text-sm mt-1">{currentStudent?.data?.rollNo}</p>
              <p className="text-blue-200 text-sm">{currentStudent?.data?.department}</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="bg-white/10 rounded-xl p-2.5">
                  <p className="text-blue-200 text-xs">CGPA</p>
                  {editing ? (
                    <input
                      type="number" min="0" max="10" step="0.01"
                      value={form.cgpa}
                      onChange={e => update("cgpa", e.target.value)}
                      className="w-full bg-transparent text-white text-sm font-bold text-center focus:outline-none"
                    />
                  ) : (
                    <p className="text-white font-bold text-sm">{currentStudent?.data?.cgpa?.toFixed(1)}</p>
                  )}
                </div>
                <div className="bg-white/10 rounded-xl p-2.5">
                  <p className="text-blue-200 text-xs">Year</p>
                  <p className="text-white font-bold text-sm">{currentStudent?.data?.year}</p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-3">
              <h3 className="font-semibold text-gray-800 text-sm">Contact Information</h3>
              <div className="space-y-3">
                {[
                  { icon: Mail,  label: "Email",   value: currentStudent?.data?.user?.email, key: null },  
                  { icon: Phone, label: "Phone",   value: form.phone,      key: "phone"   },
                  { icon: MapPin, label: "Address", value: form.address,   key: "address" },
                ].map(item => (
                  <div key={item.label} className="flex gap-3">
                    <item.icon className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-400">{item.label}</p>
                      {editing && item.key ? (
                        <input
                          value={item.value}
                          onChange={e => update(item.key, e.target.value)}
                          className="w-full text-sm text-gray-700 bg-gray-50 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-0.5"
                        />
                      ) : (
                        <p className="text-sm text-gray-700 truncate">{item.value || "Not provided"}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-3">
              <h3 className="font-semibold text-gray-800 text-sm">Social Links</h3>
              {[
                { icon: Linkedin, label: "LinkedIn", key: "linkedin", placeholder: "linkedin.com/in/yourprofile" },
                { icon: Github,   label: "GitHub",   key: "github",   placeholder: "github.com/yourusername"    },
              ].map(item => (
                <div key={item.label} className="flex gap-3">
                  <item.icon className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400">{item.label}</p>
                    {editing ? (
                      <input
                        value={form[item.key]}
                        onChange={e => update(item.key, e.target.value)}
                        placeholder={item.placeholder}
                        className="w-full text-sm text-gray-700 bg-gray-50 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-0.5"
                      />
                    ) : (
                      <p className="text-sm text-blue-600 truncate">{form[item.key] || "Not added"}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-5">

            {/* About */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-4 h-4 text-blue-600" />
                <h3 className="font-semibold text-gray-800">About Me</h3>
              </div>
              {editing ? (
                <textarea
                  value={form.about}
                  onChange={e => update("about", e.target.value)}
                  placeholder="Write a brief description about yourself..."
                  rows={4}
                  className="w-full text-sm text-gray-700 bg-gray-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              ) : (
                <p className="text-sm text-gray-600 leading-relaxed">
                  {form.about || "No bio added yet. Click edit to add your profile summary."}
                </p>
              )}
            </div>

            {/* Academic Details */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <h3 className="font-semibold text-gray-800">Academic Details</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Department",   value: currentStudent?.data?.department,       icon: Building  },
                  { label: "Year",         value: currentStudent?.data?.year,             icon: BookOpen  },
                  { label: "Roll Number",  value: currentStudent?.data?.rollNo,           icon: FileText  },
                  { label: "CGPA",         value: currentStudent?.data?.cgpa?.toFixed(2), icon: Award     },
                ].map(item => (
                  <div key={item.label} className="bg-gray-50 rounded-xl p-3.5 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-blue-700" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">{item.label}</p>
                      <p className="text-sm font-medium text-gray-800">{item.value || "N/A"}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-4 h-4 text-blue-600" />
                <h3 className="font-semibold text-gray-800">Skills</h3>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {form.skills.map(skill => (
                  <span key={skill} className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1.5 rounded-full text-sm font-medium">
                    {skill}
                    {editing && (
                      <button onClick={() => removeSkill(skill)} className="text-blue-400 hover:text-red-500 transition-colors">
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </span>
                ))}
                {form.skills.length === 0 && !editing && (
                  <p className="text-sm text-gray-400">No skills added yet</p>
                )}
              </div>
              {editing && (
                <>
                  <div className="flex gap-2 mb-3">
                    <input
                      value={newSkill}
                      onChange={e => setNewSkill(e.target.value)}
                      onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addSkill(newSkill) } }}
                      placeholder="Type a skill and press Enter"
                      className="flex-1 text-sm bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button onClick={() => addSkill(newSkill)} className="px-3 py-2 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-2">Suggestions:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {SKILL_SUGGESTIONS.filter(s => !form.skills.includes(s)).slice(0, 10).map(s => (
                        <button key={s} onClick={() => addSkill(s)}
                          className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full hover:bg-blue-50 hover:text-blue-700 transition-colors">
                          + {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Resume */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-4 h-4 text-blue-600" />
                <h3 className="font-semibold text-gray-800">Resume</h3>
              </div>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                <FileText className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-500 mb-2">Upload your resume (PDF format)</p>
                <button className="text-sm bg-blue-700 text-white px-5 py-2 rounded-lg hover:bg-blue-800 transition-colors font-medium">
                  Upload Resume
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}