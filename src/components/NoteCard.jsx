import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteNote, togglePin } from '../features/notes/noteSlice'
import { getColorForTheme } from '../utils/colors'

export const NoteCard = ({ note, onEdit }) => {  
  const dispatch = useDispatch()
  const [isDeleting, setIsDeleting] = useState(false)
  const darkMode = useSelector(state => state.notes.darkMode)
  const displayColor = getColorForTheme(note.color, darkMode)

  const handleDelete = () => {
    setIsDeleting(true)
    setTimeout(() => {
      dispatch(deleteNote(note.id))

      if (window.masonryInstance) {
        window.masonryInstance.reloadItems()
        window.masonryInstance.layout()
      }
    }, 200)
  }

  const handlePin = () => {
    dispatch(togglePin(note.id))
  }


  return (
  <>

    {/* NoteCard */}
    <div 
    className={`note-card p-4 rounded-lg shadow-md w-full break-inside-avoid transition-all ${darkMode ? 'shadow-gray-400' : ''} ${
      isDeleting ? 'animate-fade-out-scale' : ''
    }`}
      style={{ backgroundColor: displayColor}}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className={`font-medium text-lg md:text-xl transition-all ${displayColor === '#d3d3d3' ? 'text-gray-800' : darkMode ? 'text-white' : 'text-gray-800'}`}>
          {note.title}
        </h3>
        <button
            title={note.isPinned ? "Unpin Note" : "Pin Note"}
            onClick={handlePin}
            className={`group p-2 w-10 h-10 rounded-full flex items-center justify-center transition-all 
                ${note.isPinned ? 'text-yellow-500' : darkMode ? 'text-gray-400' : 'text-gray-500'} 
                hover:bg-opacity-20 ${darkMode ? 'hover:bg-yellow-500' : 'hover:bg-yellow-400'}`}
            >
            <img 
                src={note.isPinned ? "/pinRed.svg" : "/pin.svg"} 
                alt="Pin" 
                className={`transition-all ${note.isPinned ? 'opacity-100 invert-0' : 'opacity-60'}
                ${displayColor === '#d3d3d3' ? 'invert-0' : darkMode ? 'invert group-hover:invert-0 group-hover:opacity-80' : 'group-hover:opacity-70'}`}
            />
        </button>
      </div>
      <p className={`transition-all ${displayColor === '#d3d3d3' ? 'text-gray-600 mb-4' : darkMode ? 'text-gray-300 mb-4' : 'text-gray-600 mb-4'}`}>
        {note.content}
      </p>
      <div className="flex justify-end gap-2">
        <button
          onClick={onEdit}
          className={`px-3 py-1 rounded transition-all ${
            displayColor === '#d3d3d3' ? 'text-gray-600 hover:bg-gray-200' : darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className={`px-3 py-1 rounded transition-all ${
            displayColor === '#d3d3d3' ? 'text-red-600 hover:bg-red-100' : darkMode ? 'text-red-200 hover:bg-red-900' : 'text-red-600 hover:bg-red-100'
          }`}
        >
          Delete
        </button>
      </div>
    </div>
  </>
  )
}