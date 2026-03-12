function getPlatformBadge(name?: string, size: number = 6) {
  if (!name) return null

  const normalized = name.toString().toLowerCase()

  const baseClasses = `flex size-${size}  items-center justify-center rounded-full text-[10px] font-semibold uppercase`

  if (normalized === "linkedin") {
    return <span className={`${baseClasses} bg-[#0a66c2] text-white`}>in</span>
  }

  if (normalized === "indeed") {
    return <span className={`${baseClasses} bg-[#2557a7] text-white`}>id</span>
  }

  if (normalized === "wuzzuf") {
    return <span className={`${baseClasses} bg-[#4f2d7f] text-white`}>wz</span>
  }

  if (normalized === "bayt") {
    return <span className={`${baseClasses} bg-[#0058a3] text-white`}>bt</span>
  }

  if (normalized === "gulftalent") {
    return <span className={`${baseClasses} bg-[#004f9f] text-white`}>gt</span>
  }

  if (normalized === "jooble") {
    return <span className={`${baseClasses} bg-sky-500 text-white`}>jb</span>
  }

  if (normalized === "tanqeeb") {
    return (
      <span className={`${baseClasses} bg-emerald-500 text-white`}>tq</span>
    )
  }

  if (normalized === "naukrigulf") {
    return <span className={`${baseClasses} bg-amber-500 text-white`}>ng</span>
  }

  if (normalized === "jobrapido") {
    return (
      <span className={`${baseClasses} bg-fuchsia-500 text-white`}>jr</span>
    )
  }

  // Fallback: first two letters, neutral color
  return (
    <span className={`${baseClasses} bg-muted text-foreground/80`}>
      {name.slice(0, 2)}
    </span>
  )
}

export default getPlatformBadge
