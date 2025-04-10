import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleDarkMode } from '../features/notes/noteSlice'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'

export const ThemeToggle = () => {
  const dispatch = useDispatch()
  const darkMode = useSelector(state => state.notes.darkMode)

  return (
    <button
      onClick={() => dispatch(toggleDarkMode())}
      className={`relative px-4 py-2 rounded-lg transition-all overflow-hidden flex justify-center items-center ${
        darkMode 
          ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
      }`}
      style={{ width: '150px', height: '50px' }}

    > <div className="relative w-6 h-6 flex justify-center items-center">
        <AnimatePresence mode="wait">
          {darkMode ? (
            <motion.span
              key="dark"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute"
            >
              🌙
            </motion.span>
          ) : (
            <motion.span
              key="light"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute"
            >
              ☀️
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <span className='pl-2'>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
    </button>
  )
}