const generated = import.meta.glob(
  "../assets/reader-illustrations/lovable/**/*.{png,jpg,jpeg,webp,avif}",
  { eager: true, import: "default", query: "?url" },
) as Record<string, string>;

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\\u0300-\\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const slugAliases: Record<string, string[]> = {
  baruque: ["baruque", "baruc"],
  bel: ["bel", "ester"],
  eclesiastico: ["eclesiastico", "sirac"],
  enoque: ["enoque", "enoch"],
  esdras: ["esdras", "ezra"],
  judite: ["judite", "judith"],
  suzana: ["suzana", "susana", "oracao"],
  pai: ["pai-nosso", "pai_nosso", "aramaico"],
  sabedoria: ["sabedoria", "salomao"],
};

function familyKey(slug: string): string {
  const normalized = normalize(slug);
  for (const [family, aliases] of Object.entries(slugAliases)) {
    if (aliases.some((alias) => normalized.includes(normalize(alias)))) return family;
  }
  return "fallback";
}

function generatedForFamily(slug: string): string[] {
  const family = familyKey(slug);
  const aliases = slugAliases[family] ?? [];
  return Object.entries(generated)
    .filter(([path]) => {
      const normalizedPath = normalize(path);
      return family === "fallback"
        ? normalizedPath.includes("reader-illustrations-lovable")
        : aliases.some((alias) => normalizedPath.includes(normalize(alias)));
    })
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, url]) => url);
}

export function lovableReaderArtFor(
  slug: string,
  chapterIndex: number,
): string | undefined {
  const pool = generatedForFamily(slug);
  return pool[chapterIndex];
}
