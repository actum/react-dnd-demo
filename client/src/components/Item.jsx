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
        const {name, icon, type, isDragging, connectDragSource} = this.props;
        return connectDragSource(
            <div style={{ opacity: isDragging ? 0.5 : 1, cursor: isDragging ? 'grabbing' : 'grab' }} className={"item " + type}>
                <h5> {name} </h5>
                <img src={icon}/>    
            </div>
        );
    }
}

export default DragSource('ITEM', itemSource, collect)(Item);