import React from 'react';
import GridLayout from 'react-grid-layout';

const Settings = {
  cols: 8,
  rowHeight: 30,
  width: 240,
  margin: [1,1],
  saturationStart: 60,
  saturationEnd: 100,
  hueStart: 20,
  hueEnd: 360,
  lightnessStart: 30,
  lightnessEnd: 70
}

export default class Grid extends React.Component {
  
  onLayoutChange = layout => {
    // console.log(layout);
  }

  onDrop = (item,e) => {
    console.log('item ', item);
  }

  onDragStop = (layout, oldItem, newItem) => {
    console.log('old ', oldItem);
    console.log('new ', newItem);
  }

  render() {

    // generate color palette
    const { cols, width, rowHeight, margin, saturationStart, saturationEnd, hueStart, hueEnd, lightnessStart, lightnessEnd } = Settings;
    const incrementSaturationBy = (saturationEnd - saturationStart) / cols;
    const incrementHueBy = (hueEnd - hueStart) / cols;
    const incrementLightnessBy = (lightnessEnd - lightnessStart) / cols;
    const gridItems = []
    
    let hue = hueStart;
    let saturation = saturationStart;
    let lightness = lightnessStart;

    for(let i = 0; i < cols; i++) {

      gridItems.push([]);
      
      for(let j = 0; j < cols; j++) {

        gridItems[i].push(<div key={`${i}${j}`} style={{background:`hsl(${hue}, ${saturation}%, ${lightness}%)`}} data-grid={{x: j, y: i, w: 1, h: 1}}></div>)

        saturation+=incrementSaturationBy;
        lightness+=incrementLightnessBy;
      }
      saturation = saturationStart;
      lightness= lightnessStart;
      hue+=incrementHueBy;
    }

    return (
      <GridLayout 
        className="grid"
        cols={cols}
        rowHeight={rowHeight}
        maxRows={8}
        width={width}
        margin={margin}
        onLayoutChange={this.onLayoutChange}
        onDrop={this.onDrop}
        onDragStop={this.onDragStop}
        // preventCollision={true}
      >
        {gridItems}
      </GridLayout>
    )
  }
}


