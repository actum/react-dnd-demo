import React, { Component } from 'react';
import Item from './Item';
import Bin from './Bin';
import { connect } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';


const mapStateToProps = state => {
  return {
    data: state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    moveItem: (dropSource, props) => dispatch({ type:'MOVE_ITEM', item: dropSource.name, bin: props.name})
  }
}

class App extends Component {

    renderContent(content, name) {
        return content.map((item, index) => {
            return (item.location === name) && <Item key={index} name={item.name} icon={item.icon} type={item.type} location={item.location}/>
        })
    }

    render() {
        const {content, bins} = this.props.data
        return (
            <div>
                <div className="items">
                    {this.renderContent(content)}
                </div>
                <div className="bins">
                    {bins.map((bin, index) => {
                        return <Bin moveItem={this.props.moveItem} key={index} name={bin.name} accepts={bin.accepts}> {this.renderContent(content, bin.name)} </Bin>
                    })}
                </div>                
            </div>
        );
    }  
}

export default connect(mapStateToProps, mapDispatchToProps)(DragDropContext(HTML5Backend)(App));