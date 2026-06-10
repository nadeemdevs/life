const CATEGORY_ACCENTS = {
  birthday: { accent: "#f472b6", tint: "#fdf2f8" },
  career: { accent: "#60a5fa", tint: "#eff6ff" },
  work: { accent: "#60a5fa", tint: "#eff6ff" },
  education: { accent: "#4ade80", tint: "#f0fdf4" },
  life: { accent: "#fbbf24", tint: "#fffbeb" },
  health: { accent: "#fb7185", tint: "#fff1f2" },
  world: { accent: "#a78bfa", tint: "#f5f3ff" },
  technology: { accent: "#38bdf8", tint: "#f0f9ff" },
  hobby: { accent: "#c084fc", tint: "#faf5ff" },
  sports: { accent: "#f97316", tint: "#fff7ed" },
  start: { accent: "#2dd4bf", tint: "#f0fdfa" },
  self: { accent: "#94a3b8", tint: "#f8fafc" },
  family: { accent: "#fb923c", tint: "#fff7ed" },
  relationships: { accent: "#e879f9", tint: "#fdf4ff" },
  writing: { accent: "#818cf8", tint: "#eef2ff" },
  goal: { accent: "#34d399", tint: "#ecfdf5" },
};

export function getCategoryStyle(category) {
  return CATEGORY_ACCENTS[category] ?? { accent: "#94a3b8", tint: "#f8fafc" };
}
