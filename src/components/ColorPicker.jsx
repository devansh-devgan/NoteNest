import React from 'react'
import { colorOptions } from '../utils/colors'

export const ColorPicker = ({ selectedColor, onColorChange, isDarkMode = false }) => {
  return (
    <div className="flex gap-2 my-2 flex-wrap transition-all">
      {colorOptions.map(color => (
        <button
          key={color.value}
          onClick={(e) => {
            e.preventDefault();
            onColorChange(color.value);
          }}
          className={`w-6 h-6 rounded-full border transition-all ${
            selectedColor === color.value ? 'ring-2 ring-yellow-500' : ''
          }`}
          style={{ backgroundColor: isDarkMode ? color.darkValue : color.value }}
          title={color.name}
          aria-label={`Select ${color.name} color`}
        />
      ))}
    </div>
  )
}