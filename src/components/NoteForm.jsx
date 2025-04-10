import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNote } from '../features/notes/noteSlice'
import { ColorPicker } from './ColorPicker'
import { colorOptions } from '../utils/colors'

export const NoteForm = ({ onSubmitSuccess }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [color, setColor] = useState('#ffffff')
  const [isPinned, setIsPinned] = useState(false)
  const dispatch = useDispatch()
  const darkMode = useSelector(state => state.notes.darkMode)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (content.trim() || title.trim()) {
      dispatch(addNote(title.trim(), content.trim(), color, isPinned))
      setTitle('')
      setContent('')
      setColor('#ffffff')
      setIsPinned(false)
      onSubmitSuccess?.()
    }
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className="max-w-md mx-auto p-4 rounded-lg shadow-md transition-all"
      style={{ backgroundColor: darkMode ? colorOptions.find(c => c.value === color)?.darkValue || "#364153" : color }}
    >
      <div className='flex'>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className={`font-medium text-lg md:text-xl w-11/12 mb-2 p-2 border rounded bg-transparent transition-all ${
            color === '#ffffff' ? 'text-gray-800 placeholder-gray-500 border-gray-500' : darkMode ? 'text-white placeholder-gray-300 border-gray-300' : 'text-gray-800 placeholder-gray-500 border-gray-500'
          }`}
        />
        <button
          type="button"
          title={isPinned ? "Unpin Note" : "Pin Note"}
          onClick={() => setIsPinned(!isPinned)}
          className={`group ml-1.5 p-2 w-10 h-10 rounded-full flex items-center justify-center transition-all 
            ${isPinned ? 'text-yellow-500' : darkMode ? 'text-gray-400' : 'text-gray-500'} 
            hover:bg-opacity-20 ${darkMode ? 'hover:bg-yellow-500' : 'hover:bg-yellow-400'}`}
        >
          <img 
            src={isPinned ? "/pinRed.svg" : "/pin.svg"} 
            alt="Pin" 
            className={`transition-all ${isPinned ? 'opacity-100 invert-0' : 'opacity-60'}
            ${color === '#ffffff' ? 'invert-0' : darkMode ? 'invert group-hover:invert-0 group-hover:opacity-80' : 'group-hover:opacity-70'}`}
          />
        </button>
      </div>
      <textarea
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          e.target.style.height = "auto";
          e.target.style.height = `${e.target.scrollHeight}px`;
        }}
        rows={1}
        placeholder="Take a note..."
        className={`w-full resize-y overflow-hidden p-2 border rounded mb-2 bg-transparent transition-all ${
          color === '#ffffff' ? 'text-gray-600 placeholder-gray-500 border-gray-500' : darkMode ? 'text-white placeholder-gray-300 border-gray-300' : 'text-gray-800 placeholder-gray-500 border-gray-500'
        }`}
      />
      <div className="flex items-center justify-between transition-all">
        <ColorPicker selectedColor={color} onColorChange={setColor} isDarkMode={darkMode} />
        <button
          type="submit"
          className={`px-4 py-2 rounded transition-all ${
            darkMode ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-yellow-500 hover:bg-yellow-600'
          } text-white`}
        >
          Add Note
        </button>
      </div>
    </form>
  )
}