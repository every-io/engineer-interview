import React from 'react'
import './Board.css'

interface Props {
  
}

const Board = (props: React.PropsWithChildren<Props>) => {
  return (
    <div className="board">
      {props.children}
    </div>
  )
}

export default Board
