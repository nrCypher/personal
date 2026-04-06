import { profile } from "@/data/profile";

export default function About() {
  return (
    <section id="about" className="py-24 bg-gray-900/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text content */}
          <div>
            <p className="text-indigo-400 font-mono text-sm mb-3 tracking-widest uppercase">
              About Me
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Nice to meet you.
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              {profile.bio}
            </p>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              When I&apos;m not writing code, I&apos;m exploring new technologies,
              contributing to open-source projects, and continuously learning.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="flex items-center gap-2 text-gray-400 text-sm">
                <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {profile.location}
              </span>
            </div>
          </div>

          {/* Stats / highlights */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { label: "Open Source", desc: "Contributor & enthusiast", icon: "🌐" },
              { label: "Problem Solver", desc: "Creative & analytical", icon: "🧩" },
              { label: "Clean Code", desc: "Readable & maintainable", icon: "✨" },
              { label: "Always Learning", desc: "Growing every day", icon: "📚" },
            ].map((item) => (
              <div
                key={item.label}
                className="p-6 rounded-2xl bg-gray-800/60 border border-gray-700/50 hover:border-indigo-500/50 transition-colors"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-white font-semibold mb-1">{item.label}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
