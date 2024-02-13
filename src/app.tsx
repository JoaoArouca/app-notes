import { useState } from 'react'
import logo from './assets/logo.svg'
import { NewNoteCard } from './components/new-note-card'
import { NoteCard } from './components/note-card'

export interface INoteProps {
  note: {
    id: string
    date: Date
    content: string
  }
}

export function App() {
  const [notes, setNotes] = useState<INoteProps[]>([])

  function onNoteCreated(content: string) {
    const newNote: INoteProps = {
      note: {
        id: crypto.randomUUID(),
        content,
        date: new Date(),
      },
    }

    setNotes([newNote, ...notes])
  }

  function onNoteDeleted(id: string) {
    setNotes((prevNotes) => prevNotes.filter((note) => note.note.id !== id))
  }

  return (
    <main className="mx-auto max-w-6xl my-12 space-y-6">
      <img src={logo} alt="logo" />
      <form className="w-full">
        <input
          type="text"
          placeholder="Find your notes..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
        />
      </form>
      <div className="h-px bg-slate-700" />
      <section className="grid grid-cols-3 auto-rows-[250px] gap-6">
        <NewNoteCard onNoteCreated={onNoteCreated} />
        {notes.length > 0 &&
          notes.map(({ note }) => (
            <NoteCard note={note} onNoteDeleted={onNoteDeleted} key={note.id} />
          ))}
      </section>
    </main>
  )
}
