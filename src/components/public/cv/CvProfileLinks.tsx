import { profile } from "@/data/cv/profile";

type ProfileKey = (typeof profile.academicProfiles)[number]["key"];

/** Brand-coloured marks; simplified, so they stay crisp at 20px. */
function ProfileIcon({ kind }: { kind: ProfileKey }) {
  const common = { className: "h-5 w-5 shrink-0", viewBox: "0 0 24 24", "aria-hidden": true } as const;
  switch (kind) {
    case "orcid":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="12" fill="#A6CE39" />
          <text x="12" y="16.2" textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="Arial, sans-serif" fill="#fff">iD</text>
        </svg>
      );
    case "scopus":
      return (
        <svg {...common}>
          <rect width="24" height="24" rx="5" fill="#E9711C" />
          <text x="12" y="16.3" textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="Arial, sans-serif" fill="#fff">Sc</text>
        </svg>
      );
    case "researcherid":
      return (
        <svg {...common}>
          <rect width="24" height="24" rx="5" fill="#5E33BF" />
          <text x="12" y="16.3" textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="Arial, sans-serif" fill="#fff">RID</text>
        </svg>
      );
    case "scholar":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="12" fill="#4285F4" />
          <path fill="#fff" d="M12 5.5 4.5 9.6l7.5 4.1 6.1-3.35V15h1.4V9.6L12 5.5Zm-4.4 6.85v2.6L12 17.35l4.4-2.4v-2.6L12 14.75l-4.4-2.4Z" />
        </svg>
      );
  }
}

export default function CvProfileLinks() {
  return (
    <ul className="flex flex-wrap gap-2">
      {profile.academicProfiles.map((p) => (
        <li key={p.key}>
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${p.label}: ${p.value}`}
            className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1 pl-1 pr-3 no-underline shadow-sm transition-colors hover:border-accent-500"
          >
            <ProfileIcon kind={p.key} />
            <span className="flex flex-col leading-tight">
              <span className="text-xs font-semibold text-slate-800 group-hover:text-primary-700">{p.label}</span>
              <span className="font-mono text-[10px] text-slate-500">{p.value}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
