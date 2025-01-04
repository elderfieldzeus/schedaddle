import React from 'react'

interface DayCheckboxProps {
    label: string;
    value: string;
}

const DayCheckbox: React.FC<DayCheckboxProps> = ({
    label,
    value
}) => {
  return (
    <div className='flex gap-1 items-center'>
        <p>{label}</p>
        <input type="checkbox" value={value}/>
    </div>
  )
}

export default DayCheckbox
