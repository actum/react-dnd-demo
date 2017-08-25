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
        return (props.accepts.some(accept => accept === item.type))
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
            <div className={canDrop ? "bin green" : !canDrop && draggedItem ? "bin red" : "bin"}>
                <h2> {name} </h2>
                <img src="https://openclipart.org/download/228877/Layer-1.svg"/>
                <span className="accepts"> Accepts: {accepts.map(accept => <p key={accept}>{accept}</p>)} </span>  
                {this.props.children}     
            </div>
        );
    }
}

export default  DropTarget('ITEM', binTarget, collect)(Bin);