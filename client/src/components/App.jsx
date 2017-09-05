import React, { Component } from 'react';
import Letter from './Letter';
import Input from './Input';
import { connect } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import getPosition from '../position';


const mapStateToProps = state => {
  return {
    data: state
  }
}

function getClass(error, superSpeed){
                 if (error && !superSpeed)  {
                                return "btn btn-primary animated infinite slideOutRight"
                            }
                            else if(error && superSpeed) {
                                return  "btn btn-primary animated infinite slideOutRight"
                            }
                            else {
                                return "btn btn-primary"
                            }
}

const mapDispatchToProps = dispatch => {
  return {
    moveItem: (dropSource, props) => dispatch({ type:'ADD_LETTER', letter: dropSource.letter, input: props.name}),
    updatePosition: () => { getPosition() },
    updateSure: (value) => dispatch({ type:'UPDATE_SURE', value: value}),
    submit: (e) => {
        e.preventDefault();
        dispatch({type: 'SUBMIT'});
    }
  }
}

class App extends Component {

    renderContent(letters) {
        return letters.map((item, index) => {
            return <Letter key={ index } letter={ item.letter } icon={ item.icon } type={ item.type } />
        })
    }

    render() {
        const { letters, inputs, showSure, requirePosition, sureInput, locationInput, isPositionValid, error, superSpeed, finished } = this.props.data
        return (
            <div className={ finished && "animated flip"}>
                { finished && <iframe width="420" height="315" src="https://www.youtube.com/embed/oHg5SJYRHA0?autoplay=1&showinfo=0&controls=0"></iframe>}
                <div className="items">
                    { this.renderContent(letters) }
                </div>
                <div className="bins">
                    <form>
                        { inputs.map((input, index) => {
                            return <Input 
                                moveItem={ this.props.moveItem } 
                                description={ input.description } 
                                type={ input.type } 
                                key={ index } 
                                name={ input.name } 
                                text={ input.text } 
                                validationError={ input.validationError } 
                                accepts={ input.accepts }>
                            </Input> }
                        )}
                        { showSure && <Input 
                                updateSure={this.props.updateSure}
                                moveItem={ this.props.moveItem } 
                                type={ sureInput.type } 
                                name={ sureInput.name } 
                                text={ sureInput.text }
                                description={ sureInput.description }
                                accepts={ sureInput.accepts }> 
                            </Input> }
                        { requirePosition && <Input 
                                updatePosition={ this.props.updatePosition }
                                type={ locationInput.type } 
                                name={ locationInput.name } 
                                text={ locationInput.text }
                                description={ locationInput.description }
                                isPositionValid={isPositionValid}
                                isSure={this.props.isSure}
                                accepts={ locationInput.accepts }> 
                            </Input> }
                        <button type="submit" className={ getClass(error, superSpeed)} onClick={ this.props.submit }>Submit</button>
                    </form>
                </div>                
            </div>
        );
    }  
}

export default connect(mapStateToProps, mapDispatchToProps)(DragDropContext(HTML5Backend)(App));