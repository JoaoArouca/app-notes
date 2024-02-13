import { ChangeEvent, useState } from 'react'
import logo from './assets/logo.svg'
import { NewNoteCard } from './components/new-note-card'
import { NoteCard } from './components/note-card'

export interface Note {
  id: string
  date: Date
  content: string
}

function getNotesOnStorage(storage: string) {
  const notesStorage = localStorage.getItem(storage)
  return notesStorage ? JSON.parse(notesStorage) : []
}

export function App() {
  const [notes, setNotes] = useState<Note[]>(getNotesOnStorage('notes'))
  const [search, setSearch] = useState<string>('')

  const filteredNotes =
    search !== ''
      ? notes.filter((note) =>
          note.content.toLowerCase().includes(search.toLowerCase()),
        )
      : notes

  function onNoteCreated(content: string) {
    const newNote: Note = {
      id: crypto.randomUUID(),
      content,
      date: new Date(),
    }
    const notesArray = [newNote, ...notes]
    setNotes(notesArray)

    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  function onNoteDeleted(id: string) {
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.filter((note) => note.id !== id)
      localStorage.setItem('notes', JSON.stringify(updatedNotes))
      return updatedNotes
    })
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value
    setSearch(query)
  }

  return (
    <main className="mx-auto max-w-6xl my-12 space-y-6">
      <img src={logo} alt="logo" />
      <form className="w-full">
        <input
          type="text"
          placeholder="Find your notes..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
          onChange={handleSearch}
        />
      </form>
      <div className="h-px bg-slate-700" />
      <section className="grid grid-cols-3 auto-rows-[250px] gap-6">
        <NewNoteCard onNoteCreated={onNoteCreated} />
        {filteredNotes.length > 0 &&
          filteredNotes.map((note) => (
            <NoteCard note={note} onNoteDeleted={onNoteDeleted} key={note.id} />
          ))}
      </section>
    </main>
  )
}
