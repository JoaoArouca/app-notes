interface ParagraphContentProps {
  content: string
}

export function ParagraphContent({ content }: ParagraphContentProps) {
  return (
    <p className="break-words text-sm leading-6 text-slate-400">{content}</p>
  )
}
