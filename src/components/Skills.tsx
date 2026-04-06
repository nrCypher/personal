import { skills } from "@/data/profile";

export default function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-indigo-400 font-mono text-sm mb-3 tracking-widest uppercase">
            Tech Stack
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Skills &amp; Tools
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((group) => (
            <div
              key={group.category}
              className="p-6 rounded-2xl bg-gray-900/80 border border-gray-800 hover:border-indigo-500/40 transition-all duration-300"
            >
              <h3 className="text-indigo-400 font-semibold text-sm uppercase tracking-wider mb-5">
                {group.category}
              </h3>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
