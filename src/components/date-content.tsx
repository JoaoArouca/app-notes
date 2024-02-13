import { formatDistanceToNow } from 'date-fns'
import { enUS } from 'date-fns/locale'

interface DateContent {
  date: Date
}

export function DateContent({ date }: DateContent) {
  return (
    <span className="text-sm font-medium text-slate-300">
      {formatDistanceToNow(date, {
        locale: enUS,
        addSuffix: true,
      })}
    </span>
  )
}
