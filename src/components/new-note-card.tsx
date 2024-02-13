import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { toast } from 'sonner'

export interface INewNoteCardProps {
  onNoteCreated: (content: string) => void
}

let speechRecognition: SpeechRecognition | null = null

export function NewNoteCard({ onNoteCreated }: INewNoteCardProps) {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true)
  const [content, setContent] = useState<string>('')
  const [isRecording, setIsRecording] = useState<boolean>(false)

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
    if (content === '') {
      toast.error('Cannot create an empty note')
      return
    }
    onNoteCreated(content)
    setContent('')
    setShouldShowOnboarding(true)
    toast.success('Note created with success')
  }

  function handleStartRecording() {
    const isSpeechRecognitionAPIAvailable =
      'SpeechRecognition' in window || 'webkitSpeechRecognition' in window

    if (!isSpeechRecognitionAPIAvailable) {
      alert(
        'Sorry, your browser seens not to support the speech recognition API',
      )
      return
    }

    setIsRecording(true)
    setShouldShowOnboarding(false)
    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition

    speechRecognition = new SpeechRecognitionAPI()
    speechRecognition.lang = 'pt-BR'
    speechRecognition.continuous = true
    speechRecognition.maxAlternatives = 1
    speechRecognition.interimResults = true

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript)
      }, '')

      setContent(transcription)
    }

    speechRecognition.onerror = (event) => {
      console.error(event)
    }

    speechRecognition.start()
  }

  function handleStopRecording() {
    setIsRecording(false)

    if (speechRecognition !== null) {
      speechRecognition.stop()
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="outline-none flex flex-col rounded-md bg-slate-700 p-5 gap-3 text-left overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-200">Add note</span>

        <p className="text-sm leading-6 text-slate-400">
          Record an audio note to convert to text
        </p>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />
        <Dialog.Content className="overflow-hidden outline-none inset-0 md:inset-auto md:max-w-[640px] w-full md:h-[60vh] z-10 fixed md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 bg-slate-700 md:rounded-md flex flex-col">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-50">
            <X className="size-5" />
          </Dialog.Close>
          <form className="flex flex-col flex-1">
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-slate-300">
                Add new note
              </span>

              {shouldShowOnboarding ? (
                <p className="text-sm leading-6 text-slate-400">
                  Start by{' '}
                  <button
                    type="button"
                    onClick={handleStartRecording}
                    className="hover:underline font-medium text-lime-400"
                  >
                    recording a new audio note
                  </button>{' '}
                  or if prefer rather{' '}
                  <button
                    type="button"
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

            {isRecording ? (
              <button
                type="button"
                onClick={handleStopRecording}
                className="flex items-center justify-center gap-2 w-full bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none font-medium hover:bg-slate-800 hover:text-slate-100"
              >
                <div className="size-3 rounded-full bg-red-500 animate-pulse" />
                Recording (click to stop)
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSaveNote}
                className="w-full bg-lime-400 py-4 text-center text-sm text-lime-800 outline-none font-medium hover:bg-lime-500 hover:text-lime-950"
              >
                Save note
              </button>
            )}
            {/* <button
              type="submit"
              className="w-full bg-lime-400 py-4 text-center text-sm text-lime-800 outline-none font-medium hover:bg-lime-500 hover:text-lime-950"
            >
              Save note
            </button> */}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
