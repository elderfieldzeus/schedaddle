import React from 'react'
import Cell from './Cell';

const CellPlaceHolder: React.FC = () => {
  return (
    <>
        {
            new Array(28).fill('').map(() => {
                return <Cell></Cell>;
            })
        }
    </>
  )
}

export default CellPlaceHolder
