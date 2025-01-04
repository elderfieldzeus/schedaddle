import React from 'react'

interface CellProps {
    children?: React.ReactNode;
    className?: string;
    level?: number
    slots?: number;
    empty?: boolean;
}

const Cell: React.FC<CellProps> = ({children, className, level = 0, slots, empty = true}) => {
  return (
    <div 
      className={'flex justify-center items-center text-center overflow-hidden ' + className + (empty || ' bg-blue-200')}
      style={(slots) ? {
        gridRowStart: level + 2,
        gridRowEnd: level + slots + 2
      } : {}}
    >
      {children}
    </div>
  )
}

export default Cell
