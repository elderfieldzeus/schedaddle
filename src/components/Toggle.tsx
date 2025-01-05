import React from 'react'

interface ToggleProps {
    checked: boolean;
    handleChange: () => void;
}

const Toggle: React.FC<ToggleProps> = ({checked, handleChange}) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
        <input type="checkbox" checked={checked} onChange={handleChange} className="sr-only peer" />
        <div className="relative w-7 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-blue-400"></div>
    </label>
  )
}

export default Toggle
