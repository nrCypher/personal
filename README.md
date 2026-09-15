# Personal Academic Website

A personal academic website with a backoffice admin panel, inspired by
[Paulo Leitao's academic website](https://pages.ipb.pt/~pleitao/) with an
academic path timeline section inspired by
[Carla Morais's scientific merits page](https://www.carlamorais.pt/en/scientific-merits/).

## Features

### Public site
- **Home** — profile photo, bio, contact info, research interests, social/academic links
- **Academic Path** — vertical timeline of degrees, habilitation, career milestones and awards (color-coded)
- **Positions** — current and past academic/professional positions
- **Publications** — journal articles, conference papers, book chapters, edited books (grouped by year)
- **Patents** — registered patents with authors, number, country and date
- **Projects** — R&D projects with role, funder, reference, period and description
- **Students** — PhD, MSc and postdoctoral researchers supervised

### Backoffice (`/admin`)
Full CRUD for all content: Site Settings, Academic Path, Positions, Publications, Patents, Projects, Students.

## Tech stack
- [Next.js 14](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma ORM](https://www.prisma.io/) with SQLite
- [NextAuth.js v5](https://authjs.dev/) (credentials provider)

## Getting started

```bash
npm install
cp .env.example .env
# Generate a password hash:
node -e "console.log(require('bcryptjs').hashSync('your-password', 10))"
npx prisma migrate dev
npx prisma db seed
npm run dev
```

- Public site: http://localhost:3000
- Admin panel: http://localhost:3000/admin (default: `admin` / `admin123`)
