import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { toast } from 'sonner'

export interface INewNoteCardProps {
  onNoteCreated: (content: string) => void
}

export function NewNoteCard({ onNoteCreated }: INewNoteCardProps) {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true)
  const [content, setContent] = useState<string>('')

  function handleStartEditor() {
    setShouldShowOnboarding(false)
  }

  function handleTextContentChange(
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) {
    setContent(event.target.value)
    if (event.target.value.length === 0) {
      setShouldShowOnboarding(true)
    }
  }

  function handleSaveNote(event: FormEvent) {
    event.preventDefault()
    onNoteCreated(content)
    setContent('')
    setShouldShowOnboarding(true)
    toast.success('Note created with success')
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="outline-none flex flex-col rounded-md bg-slate-700 p-5 gap-3 text-left overflow-hidden relativehover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-200">Add note</span>

        <p className="text-sm leading-6 text-slate-400">
          Record an audio note to convert to text
        </p>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />
        <Dialog.Content className="overflow-hidden outline-none max-w-[640px] w-full h-[60vh] z-10 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-700 rounded-md flex flex-col">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-50">
            <X className="size-5" />
          </Dialog.Close>
          <form onSubmit={handleSaveNote} className="flex flex-col flex-1">
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-slate-300">
                Add new note
              </span>

              {shouldShowOnboarding ? (
                <p className="text-sm leading-6 text-slate-400">
                  Start by{' '}
                  <button
                    onClick={handleStartEditor}
                    className="hover:underline font-medium text-lime-400"
                  >
                    recording a new audio note
                  </button>{' '}
                  or if prefer rather{' '}
                  <button
                    onClick={handleStartEditor}
                    className="hover:underline font-medium text-lime-400"
                  >
                    use text
                  </button>
                </p>
              ) : (
                <textarea
                  autoFocus
                  maxLength={1000}
                  className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                  onChange={handleTextContentChange}
                  placeholder="Remove all text to switch to an audio note"
                  value={content}
                />
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-lime-400 py-4 text-center text-sm text-lime-800 outline-none font-medium hover:bg-lime-500 hover:text-lime-950"
            >
              Save note
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
