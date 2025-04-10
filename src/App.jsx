import React, { useRef, useEffect, useState } from 'react'
import { Provider, useSelector } from 'react-redux'
import './App.css'

import { NoteList } from './components/NoteList'
import { SearchBar } from './components/SearchBar'
import { ThemeToggle } from './components/ThemeToggle'
import { NoteForm } from './components/NoteForm'

import { store } from './app/store'
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion'

export const AppContent = () => {
  const darkMode = useSelector(state => state.notes.darkMode)
  const [showNoteForm, setShowNoteForm] = useState(false)
  const formRef = useRef(null)

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!formRef.current) return
  
      const clickedInsideForm = formRef.current.contains(e.target)
      const clickedInteractive = e.target.closest('button, input, textarea, select, .color-picker, .color-menu')
  
      if (!clickedInsideForm && !clickedInteractive) {
        setShowNoteForm(false)
      }
    }
  
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        setShowNoteForm(false)
      }
    }
  
    if (showNoteForm) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscapeKey)
    }
  
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [showNoteForm])

  
  return (
    <div className={`min-h-screen pt-[160px] transition-all ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} py-6 relative`}>
      
      {/* Fixed Navbar */}
      <div className={`fixed top-0 left-0 w-full z-50 ${darkMode ? 'bg-gray-900 shadow-gray-600' : 'bg-gray-100'} shadow-md`}>
        <div className="max-w-[100rem] mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-yellow-500' : 'text-gray-800'}`}>
              NoteNest
            </h1>
            <ThemeToggle />
          </div>
          <SearchBar onToggleForm={() => setShowNoteForm(prev => !prev)} />
        </div>
      </div>

      {/* Absolute NoteForm Overlay */}
      <AnimatePresence>
        {showNoteForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[162px] left-0 w-full z-40 px-4"
          >
            <div ref={formRef} className={`max-w-[28rem] mx-auto rounded-xl shadow-md ${darkMode ? 'shadow-gray-400' : ''}`}>
              <NoteForm onSubmitSuccess={() => setShowNoteForm(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notes list stays in place */}
      <div className="max-w-[100rem] mx-auto px-4 transition-all">
        <NoteList />
      </div>
    </div>
  )
}

export const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  )
}
