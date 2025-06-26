import fs from "node:fs/promises"
import path from "node:path"
import { highlightCode } from "@/lib/highlight-code"
import { ComponentCode } from "@/components/view-code/component-code"

export async function ComponentSource({
  name,
  src,
  title,
  language,
  size,
  code: codeFromProp,
}: {
  name?: string
  src?: string
  title?: string
  language?: string
  size?: number
  code?: string
}) {
  if (!name && !src && !codeFromProp) return null

  let code: string | undefined = codeFromProp

  if (!code && src) {
    const file = await fs.readFile(path.join(process.cwd(), src), "utf-8")
    code = file
  }

  if (!code) return null

  const lang = language ?? title?.split(".").pop() ?? "tsx"
  const highlightedCode = await highlightCode(code, lang)

  return (
    <ComponentCode
      code={code}
      highlightedCode={highlightedCode}
      size={size || 0}
    />
  )
}