import React, { Component } from 'react';
import paper from 'paper'

export default class MasterpieceContainer extends React.Component {

  constructor(props){
    super(props)
    
    this.state = {
      path: {},
      paperSettings: {
        strokeWidth: 10,
        strokeCap: 'round',
        strokeJoin: 'round',
        strokeColor: 'black',
        opacity: 1,
      }
    }

    this.biggerBrushSize = this.biggerBrushSize.bind(this)
    this.smallerBrushSize = this.smallerBrushSize.bind(this)
    this.moreOpaque = this.moreOpaque.bind(this)
    this.lessOpaque = this.lessOpaque.bind(this)
    this.changeColor = this.changeColor.bind(this)
  }

  componentDidMount() {
    let path
    
    paper.setup(this.canvas)
    
    paper.view.onMouseDown = (event) => {
      path = new paper.Path(this.state.paperSettings);
    }

    paper.view.onMouseDrag = (event) => {
      path.add(event.point);
    }
  }

  biggerBrushSize(){
    const currentSettings = this.state.paperSettings
    const thickerStroke = currentSettings.strokeWidth + 5
    this.setState(Object.assign(currentSettings, { strokeWidth: thickerStroke }))
  }

  smallerBrushSize(){
    const currentSettings = this.state.paperSettings
    if(currentSettings.strokeWidth > 5){
      const thinnerStroke = currentSettings.strokeWidth - 5
      this.setState(Object.assign(currentSettings, { strokeWidth: thinnerStroke }))
    }
  }

  moreOpaque(){
    const currentSettings = this.state.paperSettings
    if(currentSettings.opacity < 1){
      const greaterOpacity = currentSettings.opacity + 0.1
      this.setState(Object.assign(currentSettings, { opacity: greaterOpacity }))
      console.log(currentSettings)
    }
  }

  lessOpaque(){
    const currentSettings = this.state.paperSettings
    if(currentSettings.opacity > 0.1){
      const lessOpacity = currentSettings.opacity - 0.1
      this.setState(Object.assign(currentSettings, { opacity: lessOpacity }))
      console.log(currentSettings)
    }
  }

  changeColor(color){
    console.log(color)
    const currentSettings = this.state.paperSettings
    this.setState(Object.assign(currentSettings, { strokeColor: color }))
  }

  saveDrawing(e){
    e.preventDefault()
    console.log(paper.project.exportJSON())
  }

  render(){
    return(
      <div className="container">
        <div className="col-xs-12">
          <h1>Now editing: Your masterpiece</h1>
        </div>
        <div className="col-xs-12 col-sm-4">
          <hr className="divider-rule"/>
          <span><h3>Size:&ensp;{this.state.paperSettings.strokeWidth}&ensp;<a onClick={this.biggerBrushSize}>+</a>/<a onClick={this.smallerBrushSize}>-</a></h3></span>
          <span><h3>Opacity:&ensp;{this.state.paperSettings.opacity.toFixed(1)}&ensp;<a onClick={this.moreOpaque}>+</a>/<a onClick={this.lessOpaque}>-</a></h3></span>
          <div className="palette">
            <a onClick={() => this.changeColor('red')}><div className="red"></div></a>
            <a onClick={() => this.changeColor('#ff5602')}><div className="orange"></div></a>
            <a onClick={() => this.changeColor('yellow')}><div className="yellow"></div></a>
            <a onClick={() => this.changeColor('#00ff00')}><div className="green"></div></a>
            <a onClick={() => this.changeColor('blue')}><div className="blue"></div></a>
            <a onClick={() => this.changeColor('#8500ff')}><div className="purple"></div></a>
            <a onClick={() => this.changeColor('black')}><div className="black"></div></a>
            <a onClick={() => this.changeColor('white')}><div className="white"></div></a>    
          </div>
        </div>  
        <div className="col-xs-12 col-sm-8">
          <div className="masterpiece-container">
            <canvas width="450" height="450" ref={(elem) => this.canvas = elem}></canvas>
          </div>
          <button type="button" id="save-button" className="btn btn-secondary" onClick={this.saveDrawing.bind(this)}>Save</button>
        </div> 
      </div>
    )
  }
}

// MasterpieceContainer.propTypes = {
//     json: React.PropTypes.array.isRequired,
// }