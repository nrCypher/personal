# CV documents

One folder per CV page. Drop PDFs (or any file) into the folder that matches the
page, then reference the file name from the matching entry.

| Folder | Page (PT) | Page (EN) |
|---|---|---|
| `summary/` | `/cv-academic/resumo-do-cvrricvlvm-vitae` | `/cv-academic/en/cvrricvlvm-vitae-short-summary` |
| `scientific/` | `/cv-academic/vertente-merito-cientifico` | `/cv-academic/en/scientific-merits` |
| `pedagogical/` | `/cv-academic/vertente-merito-pedagogico` | `/cv-academic/en/pedagogical-merits` |
| `other/` | `/cv-academic/outras-atividades-relevantes` | `/cv-academic/en/further-relevant-activities` |
| `contacts/` | `/cv-academic/contactos` | `/cv-academic/en/contacts` |

An entry shows a download button when it carries a `file` field, resolved as
`/docs/<folder>/<file>`:

```ts
{ text: "Intelligent products: The GRACE experience", year: "2015", file: "grace-2015.pdf" }
```

Files are shared by both languages — the folder is keyed by page, not by language.
Upload and delete them from the backoffice at `/admin/cv-documents`.
