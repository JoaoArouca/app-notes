import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ParagraphContent } from './paragraph-content'
import { DateContent } from './date-content'
import { toast } from 'sonner'

interface NoteCardProps {
  note: {
    id: string
    content: string
    date: Date
  }
  onNoteDeleted: (id: string) => void
}

export function NoteCard({ note, onNoteDeleted }: NoteCardProps) {
  function handleNoteDelete() {
    toast.info('Note deleted')
    onNoteDeleted(note.id)
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="flex flex-col outline-none rounded-md text-left bg-slate-800 p-5 gap-y-3 overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <DateContent date={note.date} />
        <ParagraphContent content={note.content} />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />
        <Dialog.Content className="overflow-hidden outline-none max-w-[640px] w-full h-[60vh] z-10 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-700 rounded-md flex flex-col">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-50">
            <X className="size-5" />
          </Dialog.Close>
          <div className="flex flex-1 flex-col gap-3 p-5">
            <DateContent date={note.date} />
            <ParagraphContent content={note.content} />
          </div>
          <button
            type="button"
            onClick={handleNoteDelete}
            className="group rounded-md w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium absolute bottom-0"
          >
            Remove this{' '}
            <span className="group-hover:underline text-red-400">note?</span>
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
