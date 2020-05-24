import React, { useState } from 'react'
import Square from './Square'
import { useDrop } from 'react-dnd'

const colorSettings = {
  saturationStart: 60,
  saturationEnd: 100,
  hueStart: 20,
  hueEnd: 360,
  lightnessStart: 30,
  lightnessEnd: 70,
  cols: 8,
  width: 328
}

function renderSquare(i, color) {
  return (
    <div
      key={i}
      id={i}
      style={{
        width: '10.5%',
        height: '10.5%',
        padding: '1%'
      }}>
      <Square id={i} bgColor={color}/>
    </div>
  )
}

const {
  hueStart,
  hueEnd,
  saturationStart,
  saturationEnd,
  lightnessStart,
  lightnessEnd,
  cols,
  width } = colorSettings;
const squares = []
const incrementHue = (hueEnd - hueStart) / cols
const incrementSaturation = (saturationEnd - saturationStart) / cols
const incrementLightness = (lightnessEnd - lightnessStart) / cols
let hue = hueStart
let saturation = saturationStart
let lightness = lightnessStart

for (let i = 0; i < 64; i++) {
  if( i % 8 === 0) {
    hue+= incrementHue
    saturation = saturationStart
    lightness = lightnessStart
  }

  squares.push(renderSquare(i, `hsl(${hue}, ${saturation}%, ${lightness}%)`))
  saturation += incrementSaturation
  lightness += incrementLightness
}

function Board(props) {
  const [ squaresState, setSquaresState ] = useState(squares)
  const [{ isOver }, drop] = useDrop({
    accept: 'square',
    drop: (item, monitor) => {
      const newItemOffset = monitor.getClientOffset()
      const newItemId = (cols * Math.ceil(newItemOffset.y/width * cols)) - (cols - Math.ceil(newItemOffset.x/width * cols))
      const oldItemId = monitor.getItem().id + 1
      swap(oldItemId, newItemId)
    }
  })

  function swap(oldItemId, newItemId) {
    let swapSquares = [...squaresState]
    let oldId = swapSquares.findIndex(v => v.props.id === oldItemId - 1)

    let temp = swapSquares[oldId]
    swapSquares[oldId] = swapSquares[newItemId-1]
    swapSquares[newItemId-1] = temp

    setSquaresState(swapSquares)
  }

  return (
    <div
      ref={drop}
      style={{
        width: width,
        height: width,
        display: 'flex',
        flexWrap: 'wrap'
      }}>
        {squaresState}
    </div>
  )
}

export default Board