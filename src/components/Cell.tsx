import React from 'react'

interface CellProps {
    children?: React.ReactNode;
    className?: string;
}

const Cell: React.FC<CellProps> = ({children, className}) => {
  return (
    <p className={'flex h-full justify-center items-center ' + className}>
        {children}
    </p>
  )
}

export default Cell
