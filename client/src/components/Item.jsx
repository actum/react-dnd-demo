import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

const itemSource = {
    beginDrag(props) {
        return {
            name: props.name,
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

class Item extends Component {
    render() {
        const { name, icon, type, isDragging, connectDragSource, location } = this.props;
        return connectDragSource(
            <div style={ { opacity: isDragging ? 0.5 : 1 } } className={ "item " + type }>
                <p className="header"> {name + " (" + type + ")"} </p>
                { !location && <img src={ icon }/> } 
            </div>
        );
    }
}

export default DragSource('ITEM', itemSource, collect)(Item);