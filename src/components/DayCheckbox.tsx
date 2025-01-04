import React from 'react'

interface DayCheckboxProps {
    label: string;
    value: string;
    days: Set<string>
    handleDay: React.ChangeEventHandler<HTMLInputElement>
}

const DayCheckbox: React.FC<DayCheckboxProps> = ({
    label,
    value,
    days,
    handleDay
}) => {
  return (
    <div className='flex gap-1 items-center'>
        <p>{label}</p>
        <input type="checkbox" value={value} onChange={handleDay} checked={days.has(value)}/>
    </div>
  )
}

export default DayCheckbox
