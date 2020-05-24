import React from 'react'
import { useDrag } from 'react-dnd'

function Square({bgColor, id}) {
  const [{ isDragging }, drag] = useDrag({
    item: { 
      id,
      type: 'square',
      bgColor
    }
  })

  return (
    <div
      className="square"
      ref={drag}
      style={{backgroundColor: bgColor ? bgColor : 'black', width: '100%', height: '100%', cursor: 'move'}}>
    </div>
  )
}

export default Square