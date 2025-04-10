import React, { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setColorFilter, closeColorMenu } from '../features/notes/noteSlice'
import { colorOptions } from '../utils/colors'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'

export const ColorMenu = ({ paletteButtonRef }) => {
  const dispatch = useDispatch()
  const { colorFilter, darkMode, isColorMenuOpen } = useSelector(state => state.notes)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOrKey = (event) => {
      const clickedOutside =
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        (!paletteButtonRef?.current || !paletteButtonRef.current.contains(event.target))
      const pressedEscape = event.type === 'keydown' && event.key === 'Escape'

      if (clickedOutside || pressedEscape) {
        dispatch(closeColorMenu())
      }
    }

    if (isColorMenuOpen) {
      document.addEventListener('mousedown', handleClickOrKey)
      document.addEventListener('keydown', handleClickOrKey)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOrKey)
      document.removeEventListener('keydown', handleClickOrKey)
    }
  }, [isColorMenuOpen, dispatch, paletteButtonRef])

  return (
    <AnimatePresence mode="wait">
      {isColorMenuOpen && (
        <motion.div
          ref={menuRef}
          key="color-menu"
          initial={{ opacity: 0, scale: 0.95, y: -8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -8 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className={`absolute right-0 top-full mt-1 p-2 rounded-md shadow-lg z-10 backdrop-blur-md ${
            darkMode ? 'bg-gray-800/70' : 'bg-white/70'
          }`}
          style={{ width: '200px' }}
        >
          <div className="flex flex-col gap-1 transition-all">
            <button
              onClick={() => dispatch(setColorFilter(''))}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all ${
                colorFilter === ''
                  ? (darkMode ? 'bg-gray-600 text-white' : 'bg-gray-300 text-gray-800')
                  : (darkMode ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-600 hover:bg-gray-300')
              }`}
            >
              All colors
            </button>

            {colorOptions.map((color) => (
              <button
                key={color.value}
                onClick={() => dispatch(setColorFilter(color.value))}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all ${
                  colorFilter === color.value
                    ? (darkMode ? 'bg-gray-600 text-white' : 'bg-gray-300 text-gray-800')
                    : (darkMode ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-600 hover:bg-gray-300')
                }`}
              >
                <span
                  className={`inline-block w-4 h-4 rounded-full border transition-all ${
                    darkMode ? 'border-gray-300' : 'border-gray-500'
                  }`}
                  style={{ backgroundColor: darkMode ? color.darkValue : color.value }}
                ></span>
                {color.name}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
