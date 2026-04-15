import { Link } from "react-router";
import {
  GraduationCap, Building2, Users, TrendingUp, CheckCircle, ArrowRight,
  Star, Briefcase, Award, BookOpen, ChevronRight, MapPin, Phone, Mail
} from "lucide-react";

const HERO_IMAGE = "https://images.unsplash.com/photo-1697120508416-89675565948d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdpbmVlcmluZyUyMGNvbGxlZ2UlMjBjYW1wdXMlMjBJbmRpYSUyMG1vZGVybiUyMGJ1aWxkaW5nfGVufDF8fHx8MTc3MzY1MTYzN3ww&ixlib=rb-4.1.0&q=80&w=1080";
const OFFICE_IMAGE = "https://images.unsplash.com/photo-1659994833931-ff29b139a963?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHN0dWR5aW5nJTIwY2FtcHVzJTIwcGxhY2VtZW50JTIwaW50ZXJ2aWV3fGVufDF8fHx8MTc3MzY1MTYzOHww&ixlib=rb-4.1.0&q=80&w=1080";

const stats = [
  { value: "500+", label: "Students Placed",   icon: GraduationCap },
  { value: "80+",  label: "Partner Companies", icon: Building2      },
  { value: "42 LPA", label: "Highest Package", icon: TrendingUp     },
  { value: "92%",  label: "Placement Rate",    icon: Award          },
];

const features = [
  { icon: Building2,  title: "Company Listings",   desc: "Browse top companies visiting campus with detailed job descriptions, package information and eligibility criteria." },
  { icon: Briefcase,  title: "One-Click Apply",     desc: "Apply to multiple companies with a single profile. Track all your applications in one place." },
  { icon: TrendingUp, title: "Real-Time Updates",   desc: "Get instant status updates on shortlisting, interview schedules and final selections." },
  { icon: Users,      title: "TPO Controls",        desc: "Training & Placement Officer can manage companies, students and results with a powerful dashboard." },
  { icon: BookOpen,   title: "Profile Builder",     desc: "Build a comprehensive student profile with skills, education and resume upload support." },
  { icon: Star,       title: "Analytics & Reports", desc: "Track placement statistics, trends and generate reports for better decision making." },
];

const testimonials = [
  { name: "Aryan Sharma",  role: "Placed at Google • 45 LPA",    text: "The placement portal made the entire process so smooth. I could track every stage of my application in real-time!", avatar: "A"  },
  { name: "Priya Verma",   role: "Placed at Microsoft • 42 LPA", text: "The portal helped me apply to multiple companies at once and never miss a deadline. The TPO team support is amazing!", avatar: "P"  },
  { name: "Ananya Singh",  role: "Placed at Amazon • 38 LPA",    text: "This system transformed how our college manages placements. Everything from drive registration to offer letters is seamless.", avatar: "An" },
];

const departments = [
  { name: "Computer Science & Engineering",  code: "CSE",  placed: 48 },
  { name: "Information Technology",          code: "IT",   placed: 32 },
  { name: "Electronics & Communication",     code: "ECE",  placed: 29 },
  { name: "Mechanical Engineering",          code: "ME",   placed: 21 },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">

      {/* Top Bar */}
      <div className="bg-blue-950 text-blue-200 text-xs py-2 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> College Campus, City, State</span>
            <span className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> +91-XXXX-XXXXXX</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> placements@college.edu</span>
            <span>Approved by Accreditation Body</span>
          </div>
        </div>
      </div>

      {/* Sticky Navbar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-700 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-blue-900 font-bold text-base block leading-tight">College Portal</span>
              <span className="text-gray-400 text-xs leading-tight">Placement Cell</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a href="#features" className="hover:text-blue-700 transition-colors">Features</a>
            <a href="#departments" className="hover:text-blue-700 transition-colors">Departments</a>
            <a href="#testimonials" className="hover:text-blue-700 transition-colors">Success Stories</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login" className="px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 rounded-lg transition-colors font-medium">
              Login
            </Link>
            <Link to="/register" className="px-4 py-2 text-sm bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium">
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-blue-950 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 opacity-20">
          <img src={HERO_IMAGE} alt="Campus" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-linear-to-r from-blue-950/85 to-indigo-900/60"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            {/* College Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 px-4 py-2 rounded-full text-sm mb-6">
              <div className="w-5 h-5 bg-blue-400 rounded-full flex items-center justify-center">
                <GraduationCap className="w-3 h-3 text-white" />
              </div>
              Official Placement Portal
            </div>

            <h1
              className="font-bold text-white leading-tight mb-6"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              College Placement Cell <br />
              <span className="text-blue-300">Your Career Starts Here</span>
            </h1>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl leading-relaxed">
              The official online placement portal — connecting students with top recruiters, enabling one-click applications, and empowering the TPO team with powerful management tools.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-900 px-7 py-3.5 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-lg"
              >
                Student Registration <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 border-2 border-blue-400/50 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-white/10 transition-all"
              >
                Sign In to Portal
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-blue-200">
              {["Free Registration", "Real-time Updates", "Secure Platform"].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-green-400" /> {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 text-center">
                <stat.icon className="w-6 h-6 text-blue-300 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-blue-200 text-sm mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider">Portal Features</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-4">Everything Students Need</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              A complete placement ecosystem built for students and the Training & Placement Officer to manage the entire recruitment lifecycle.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-700" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section id="departments" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider">Departments</span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-4">
                Placements Across All Branches
              </h2>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                Our Training & Placement Cell actively coordinates recruitment for students from all engineering branches, ensuring every student gets a fair chance at their dream company.
              </p>
              <div className="space-y-4">
                {departments.map((dept) => (
                  <div key={dept.code} className="flex items-center justify-between bg-gray-50 rounded-2xl p-4 hover:bg-blue-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-700 text-white flex items-center justify-center font-bold text-sm">
                        {dept.code}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{dept.name}</p>
                        <p className="text-xs text-gray-400">{dept.placed} students placed (2024–25)</p>
                      </div>
                    </div>
                    <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: `${(dept.placed / 60) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img src={OFFICE_IMAGE} alt="College Placement" className="w-full h-80 lg:h-auto object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider">How It Works</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">Three Simple Steps to Get Placed</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Create Your Profile",     desc: "Register using your college email and build your complete academic profile with skills, projects and resume.", icon: Users      },
              { step: "02", title: "Browse & Apply",          desc: "Explore companies visiting campus and apply with a single click to multiple drives simultaneously.", icon: Briefcase   },
              { step: "03", title: "Track & Get Placed",      desc: "Monitor your application status in real-time and receive instant notifications on shortlisting and selections.", icon: TrendingUp },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-md transition-all text-center">
                <div className="w-14 h-14 rounded-2xl bg-blue-700 text-white flex items-center justify-center font-bold text-lg mx-auto mb-5">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/register" className="inline-flex items-center gap-2 text-blue-700 font-semibold hover:text-blue-900 transition-colors">
              Register as Student <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-blue-300 text-sm font-semibold uppercase tracking-wider">Alumni Success</span>
            <h2 className="text-3xl font-bold text-white mt-2">Success Stories from Our Students</h2>
            <p className="text-blue-300 text-sm mt-2">Our students are making their mark at India's top tech companies</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-blue-100 text-sm leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{t.name}</p>
                    <p className="text-blue-300 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-linear-to-r from-blue-600 to-indigo-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Begin Your Placement Journey?</h2>
          <p className="text-blue-100 mb-8">
            Join the Placement Portal — register today and connect with top recruiters visiting our campus.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 px-8 py-3.5 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-md"
            >
              Register as Student <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/50 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-white/10 transition-all"
            >
              TPO / Admin Login
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-white font-bold text-base block leading-tight">College Portal</span>
                  <span className="text-gray-400 text-xs">Placement Cell</span>
                </div>
              </div>
              <p className="text-sm leading-relaxed">
                Connecting students with top companies and empowering the next generation of professionals.
              </p>
            </div>
            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Contact T&P Cell</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>College Campus, City, State - Pincode</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span>+91-XXXX-XXXXXX</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>placements@college.edu</span>
                </div>
              </div>
            </div>
            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Student Portal</h4>
              <div className="space-y-2 text-sm">
                <Link to="/register" className="block hover:text-white transition-colors">Register / Sign Up</Link>
                <Link to="/login" className="block hover:text-white transition-colors">Student Login</Link>
                <Link to="/login" className="block hover:text-white transition-colors">TPO Admin Login</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
            <p>© 2026 College Placement Portal. All rights reserved.</p>
            <p>Developed & Maintained by Placement Cell</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
