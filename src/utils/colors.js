export const colorOptions = [
    { value: '#ffffff', name: 'White', darkValue: '#d3d3d3' },
    { value: '#ffa1a1', name: 'Red', darkValue: '#9b3f38' },
    { value: '#ffd666', name: 'Orange', darkValue: '#9c7128' },
    { value: '#fff475', name: 'Yellow', darkValue: '#9c8d2a' },
    { value: '#ccff90', name: 'Green', darkValue: '#578a34' },
    { value: '#a7ffeb', name: 'Teal', darkValue: '#2d7c76' },
    { value: '#cbf0f8', name: 'Blue', darkValue: '#4590a0' },
    { value: '#d7aefb', name: 'Purple', darkValue: '#764298' },
    { value: '#fdcfe8', name: 'Pink', darkValue: '#9a3d6c' },
  ]
  
  export const getColorForTheme = (colorValue, isDarkMode) => {
    const colorOption = colorOptions.find(color => color.value === colorValue)
    return isDarkMode ? colorOption.darkValue : colorOption.value
  }