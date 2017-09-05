import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

const inputTarget = {
    drop(props, monitor){
        const letter = monitor.getItem();
        if(props.moveItem) props.moveItem(letter, props);
    },
    canDrop(props, monitor){
        const letter = monitor.getItem();
        return (props.accepts.some(accept => accept === letter.type && props.name != 'Location'))
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        canDrop: monitor.canDrop(),
        draggedItem: monitor.getItem()
    }
}

class Input extends Component {
    componentWillReceiveProps(nextProps){
        if(this.props.name === 'Are you sure?' && !nextProps.isSure){
            if(nextProps.text === 'yes') this.props.updateSure('yes');
            else if(nextProps.text === 'no') this.props.updateSure('no');
        }
    }

    componentWillUnmount(){
        this.props.positionInterval && clearInterval(positionInterval);
    }

    componentDidMount(){
        const { updatePosition } = this.props;
        if (updatePosition) {
            updatePosition()
            const positionInterval = setInterval(updatePosition, 5000);
            this.setState({positionInterval});
        }
    }

    render() {
        const { name, accepts } = this.props;

        //DnD
        const { connectDropTarget, canDrop, draggedItem, text, type, description, isPositionValid, validationError } = this.props;

        return connectDropTarget(
            <div className={ validationError ? "form-group animated wobble" : "form-group"}>
                <label htmlFor={ name }>{ name }</label>
                <input 
                    aria-describedby={`${type}Help`}
                    readOnly
                    id={ name } 
                    type={ type } 
                    name={ name } 
                    value={ text } 
                    className={ canDrop ? "bin green" : !canDrop && draggedItem ? "bin red" : "bin" } 
                    />
                { isPositionValid && <img src="http://diysolarpanelsv.com/images/check-mark-clipart-png-33.png"/> }
                { description && <small id={`${type}Help`} className="form-text text-muted">{ description }</small>}
                { validationError && <small id={`${type}Help`} className="form-text text-danger">{ `Not a valid ${name}. You will be punished. Good luck clicking on submit now.` }</small>}
            </div>
        );
    }
}

export default  DropTarget('LETTER', inputTarget, collect)(Input);