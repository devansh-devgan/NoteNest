import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  notes: [],
  searchTerm: '',
  colorFilter: '',
  darkMode: false,
  isColorMenuOpen: false
}

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: {
      reducer(state, action) {
        state.notes.push(action.payload)
      },
      prepare(title, content, color = '#ffffff', isPinned = false) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            color,
            isPinned,
            createdAt: new Date().toISOString(),
          },
        }
      },
    },
    updateNote(state, action) {
      const { id, ...updates } = action.payload
      const note = state.notes.find(note => note.id === id)
      if (note) {
        Object.assign(note, updates)
      }
    },
    deleteNote(state, action) {
      const index = state.notes.findIndex(note => note.id === action.payload)
      if (index !== -1) {
        state.notes.splice(index, 1)
      }
    },
    togglePin(state, action) {
      const note = state.notes.find(note => note.id === action.payload)
      if (note) {
        note.isPinned = !note.isPinned
      }
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload
    },
    setColorFilter(state, action) {
      state.colorFilter = action.payload
    },
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode
    },
    openColorMenu(state) {
      state.isColorMenuOpen = true
    },
    closeColorMenu(state) {
      state.isColorMenuOpen = false
    },
    toggleColorMenu(state) {
      state.isColorMenuOpen = !state.isColorMenuOpen
    },
    
  }
})

export const { 
  addNote, 
  updateNote, 
  deleteNote, 
  togglePin, 
  setSearchTerm,
  setColorFilter,
  toggleDarkMode,
  openColorMenu,
  closeColorMenu,
  toggleColorMenu
} = noteSlice.actions

export default noteSlice.reducer