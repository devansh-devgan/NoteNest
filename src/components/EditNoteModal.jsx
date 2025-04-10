import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateNote } from '../features/notes/noteSlice'
import { ColorPicker } from './ColorPicker'
import { getColorForTheme } from '../utils/colors'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'

export const EditNoteModal = ({ note, onClose }) => {
  const dispatch = useDispatch()
  const darkMode = useSelector(state => state.notes.darkMode)

  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)
  const [color, setColor] = useState(note.color)
  const [isVisible, setIsVisible] = useState(true)

  const displayColor = getColorForTheme(color, darkMode)
  const textAreaRef = useRef(null)
  const modalRef = useRef(null)

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto'
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
    }
  }, [content])

  // ESC key + click outside
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsVisible(false)
    }

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsVisible(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSave = () => {
    dispatch(updateNote({ id: note.id, title, content, color }))
    setIsVisible(false)
  }

  const handleCancel = () => {
    setIsVisible(false)
  }

  return (
    <AnimatePresence onExitComplete={onClose}>
      {isVisible && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
        >
          <motion.div
            ref={modalRef}
            key="modal"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="p-4 rounded-lg shadow-lg w-full max-w-xl"
            style={{ backgroundColor: displayColor }}
          >
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Title"
              className={`font-medium text-lg md:text-xl w-full mb-2 p-2 border rounded bg-transparent transition-all ${
                displayColor === '#d3d3d3'
                  ? 'text-gray-800 placeholder-gray-500 border-gray-500'
                  : darkMode
                  ? 'text-white placeholder-gray-300 border-gray-300'
                  : 'text-gray-800 placeholder-gray-500 border-gray-500'
              }`}
            />
            <textarea
              ref={textAreaRef}
              value={content}
              onChange={(e) => {
                setContent(e.target.value)
                e.target.style.height = 'auto'
                e.target.style.height = `${e.target.scrollHeight}px`
              }}
              rows={1}
              placeholder="Take a note..."
              className={`w-full resize-y overflow-hidden p-2 border rounded mb-2 bg-transparent transition-all ${
                displayColor === '#d3d3d3'
                  ? 'text-gray-600 placeholder-gray-500 border-gray-500'
                  : darkMode
                  ? 'text-white placeholder-gray-300 border-gray-300'
                  : 'text-gray-800 placeholder-gray-500 border-gray-500'
              }`}
            />
            <div className="flex items-center justify-between transition-all">
              <ColorPicker selectedColor={color} onColorChange={setColor} isDarkMode={darkMode} />
              <div className="flex gap-2 transition-all">
                <button
                  onClick={handleCancel}
                  className={`px-3 py-1 rounded transition-all ${
                    displayColor === '#d3d3d3'
                      ? 'text-gray-600 hover:bg-gray-100'
                      : darkMode
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className={`px-3 py-1 rounded transition-all ${
                    darkMode ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-yellow-500 hover:bg-yellow-600'
                  } text-white`}
                >
                  Save
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
