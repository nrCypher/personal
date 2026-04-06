import { profile } from "@/data/profile";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="py-8 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-gray-600 text-sm">
          &copy; {year} {profile.name}. Built with Next.js &amp; Tailwind CSS.
        </p>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-indigo-400 text-sm transition-colors"
        >
          View Source
        </a>
      </div>
    </footer>
  );
}
