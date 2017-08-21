import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import reducer from '../reducer.js';
import {store} from '../index';
import { connect } from 'react-redux'

const binTarget = {
    drop(props, monitor){
        const item = monitor.getItem();
        props.moveItem(item, props);
    },
    canDrop(props, monitor){
        const item = monitor.getItem();
        return (props.accepts === item.type)
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        draggedItem: monitor.getItem()
    }
}

class Bin extends Component {
    render() {
        const {name, accepts} = this.props;

        //DnD
        
        const { isOver, connectDropTarget, canDrop, draggedItem } = this.props;

        return connectDropTarget(
            <div className="bin">
                <h2> {name} </h2>
                <img 
                    className={canDrop ? "bin green" : !canDrop && draggedItem && "bin red"} 
                    src="https://openclipart.org/download/228877/Layer-1.svg"/>
                <span> Accepts: {accepts} </span>  
                {this.props.children}     
            </div>
        );
    }
}

export default  DropTarget('ITEM', binTarget, collect)(Bin);