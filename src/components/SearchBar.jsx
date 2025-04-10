import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchTerm, openColorMenu, closeColorMenu } from '../features/notes/noteSlice'
import { ColorMenu } from './ColorMenu'
import { colorOptions } from '../utils/colors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPalette, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useDebounce } from '../hooks/useDebounce'

export const SearchBar = ({ onToggleForm }) => {
  const dispatch = useDispatch()
  const { searchTerm, darkMode, colorFilter, isColorMenuOpen } = useSelector(state => state.notes)
  const selectedColor = colorFilter ? colorOptions.find(c => c.value === colorFilter) : null
  const paletteButtonRef = useRef(null)

  const [inputValue, setInputValue] = useState(searchTerm)
  const debouncedSearchTerm = useDebounce(inputValue, 300)

  useEffect(() => {
    dispatch(setSearchTerm(debouncedSearchTerm))
  }, [debouncedSearchTerm, dispatch])

  return (
    <div className="max-w-md mx-auto my-4 relative transition-all">
      <div className="flex items-center relative transition-all">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search notes..."
          className={`w-11/12 p-2 pl-4 pr-10 border rounded-lg shadow-sm transition-all ${
            darkMode 
              ? 'bg-gray-700 border-gray-600 text-white shadow-gray-400 placeholder-gray-400' 
              : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
          }`}
        />

        <div className="absolute right-10 flex items-center gap-1 transition-all">
          {colorFilter && (
            <span 
              className={`w-5 h-5 rounded-full border transition-all ${darkMode ? 'border-gray-300' : 'border-gray-500'}`}
              style={{ backgroundColor: darkMode ? selectedColor.darkValue : selectedColor.value }}
              title={`Filtering by ${selectedColor.name}`}
            ></span>
          )}

          <button 
            ref={paletteButtonRef}
            onClick={() => {
              if (isColorMenuOpen) {
                dispatch(closeColorMenu())
              } else {
                dispatch(openColorMenu())
              }
            }}
            className={`px-2 mx-2 scale-124 rounded-lg hover:bg-opacity-20 hover:bg-gray-300 transition-all ${
              darkMode 
                ? 'hover:text-gray-600 text-gray-100' 
                : 'text-gray-600'
            } ${isColorMenuOpen ? 'bg-gray-300 text-gray-600' : ''}`}
            aria-label="Filter by color"
            title="Filter by color"
          >
            <FontAwesomeIcon icon={faPalette} />
          </button>
        </div>

        <button 
          onClick={onToggleForm}
          className={`p-1.5 ml-2 border-2 rounded-lg hover:bg-opacity-20 hover:bg-gray-300 transition-all ${
            darkMode ? 'hover:text-gray-600 text-gray-100' : 'text-gray-600'
          }`}
          aria-label="Add note"
          title="Add a new note"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>

      <ColorMenu paletteButtonRef={paletteButtonRef} />
    </div>
  )
}