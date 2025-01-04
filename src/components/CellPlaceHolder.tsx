import React from 'react'
import Cell from './Cell';

const CellPlaceHolder: React.FC = () => {
  return (
    <>
        {
            new Array(28).fill('').map((_, index) => {
                return <Cell key={index}></Cell>;
            })
        }
    </>
  )
}

export default CellPlaceHolder
