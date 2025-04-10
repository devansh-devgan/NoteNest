import React, {useState, useRef} from 'react'
import { useSelector } from 'react-redux'
import { NoteCard } from './NoteCard'
import { MasonryWrapper } from './MasonryWrapper'
import { EditNoteModal } from './EditNoteModal'
import '../NoteList.css'

export const NoteList = () => {
  const { notes, searchTerm, colorFilter, darkMode } = useSelector(state => state.notes)
  const [noteToEdit, setNoteToEdit] = useState(null)
  const gridRef = useRef(null)

  const filteredNotes = notes.filter(note => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesColor = colorFilter === '' || note.color === colorFilter

    return matchesSearch && matchesColor
  })

  // Sort by latest created first
  filteredNotes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  const pinnedNotes = filteredNotes.filter(note => note.isPinned)
  const unpinnedNotes = filteredNotes.filter(note => !note.isPinned)

  const renderNotes = (notesList) => (
    <MasonryWrapper>
      {notesList.map(note => (
        <div
          id={`note-${note.id}`}
          key={note.id}
          className={`masonry-item w-[280px] ${
            Date.now() - new Date(note.createdAt).getTime() < 2000
              ? 'animate-fade-in-scale'
              : ''
          }`}
        >
          <NoteCard note={note} onEdit={() => setNoteToEdit(note)} />
        </div>
      ))}
    </MasonryWrapper>
  )

  return (
    <div ref={gridRef} className="note-list flex flex-col gap-4 p-4 max-w-8xl mx-auto transition-all">
      {/* Pinned Notes */}
      {pinnedNotes.length > 0 && (
        <div className="w-full transition-all">
          <h2
            className={`category text-lg font-medium mb-4 transition-all ${
              darkMode ? 'text-gray-200' : 'text-gray-800'
            }`}
          >
            Pinned Notes
          </h2>
          {renderNotes(pinnedNotes)}
        </div>
      )}

      {/* Unpinned Notes (Search, Filter, or All) */}
      {unpinnedNotes.length > 0 && (
        <div className="w-full transition-all">
          {(searchTerm !== '' || colorFilter !== '' || pinnedNotes.length > 0) && (
            <h2
              className={`category text-lg font-medium mb-4 transition-all ${
                darkMode ? 'text-gray-200' : 'text-gray-800'
              }`}
            >
              {searchTerm !== ''
                ? 'Search Results'
                : colorFilter !== ''
                ? 'Filtered Notes'
                : 'Other Notes'}
            </h2>
          )}
          {renderNotes(unpinnedNotes)}
        </div>
      )}

      {/* No Notes Found */}
      {filteredNotes.length === 0 && (
        <div
          className={`not-found text-center p-8 transition-all ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          <p className="text-lg transition-all">No notes found</p>
        </div>
      )}

      {/* Edit Mode */}
      {noteToEdit && (
        <EditNoteModal note={noteToEdit} onClose={() => setNoteToEdit(null)} />
      )}
    </div>
  )
}