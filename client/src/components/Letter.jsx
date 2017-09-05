import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

const letterSource = {
    beginDrag(props) {
        return {
            letter: props.letter,
            type: props.type
        }
    }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class Letter extends Component {
    render() {
        const { letter, icon, type, isDragging, connectDragSource, location } = this.props;
        return connectDragSource(
            <div style={ { opacity: isDragging ? 0.5 : 1 } } className={ "item " + type }>
                <p className="header"> {letter} </p>
                { !location && <img src={ icon }/> } 
            </div>
        );
    }
}

export default DragSource('LETTER', letterSource, collect)(Letter);