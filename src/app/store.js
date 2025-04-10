import { configureStore } from '@reduxjs/toolkit'
import noteReducer from '../features/notes/noteSlice'

export const store = configureStore({
    reducer: {
      notes: noteReducer
    }
})