import 'jsdom-global/register';
import { expect } from 'chai';
import React, { Component }from 'react';
import TestUtils from 'react-dom/test-utils';
import TestBackend from 'react-dnd-test-backend';
import { DragDropContext } from 'react-dnd';
import Item from '../src/components/Item.jsx';
import Bin from '../src/components/Bin.jsx';
import App from '../src/components/App.jsx'

const error = "(╯°□°）╯︵ ┻━┻";

/**
 * Wraps a component into a DragDropContext that uses the TestBackend.
 */
function wrapInTestContext(DecoratedComponent) {
  return DragDropContext(TestBackend)(
    class TestContextContainer extends Component {
      render() {
        return <DecoratedComponent {...this.props} />;
      }
    }
  );
}

describe('Item', () => {
    it('can be rendered', () => {
        const OriginalItem = Item.DecoratedComponent;
        const identity = el => el;
        let root = TestUtils.renderIntoDocument(<OriginalItem name="test" type="testing" connectDragSource={ identity } />);
        let div = TestUtils.findRenderedDOMComponentWithTag(root, 'div');
        expect(div.style.opacity, `opacity is 1 - ${error}`).to.equal('1');
    });

    it('reacts to dragging', () => {
        const OriginalItem = Item.DecoratedComponent;
        const identity = el => el;
        let root = TestUtils.renderIntoDocument(<OriginalItem name="test" type="testing" connectDragSource={ identity } isDragging/>);
        let div = TestUtils.findRenderedDOMComponentWithTag(root, 'div');
        expect(div.style.opacity, `opacity is 0.5 - ${error}`).to.equal('0.5');
    });

    it('transfers data with drop', () => {

        class RootElement extends Component{
          render(){
            return <div>
                  <Item name='test' type="testing"/> 
                  <Bin name='test' accepts={["testing"]} moveItem={(data) => expect(data.name,  `Name equals test - ${error}`).to.equal('test')} />
              </div>
          }
        }

        // Render with the test context that uses the test backend
        const AppContext = wrapInTestContext(RootElement);
        const appContext = TestUtils.renderIntoDocument(<AppContext />);

        // Obtain a reference to the backend
        const backend = appContext.getManager().getBackend();

        // Find the drag source ID and use it to simulate the dragging operation
        const item = TestUtils.findRenderedComponentWithType(appContext, Item);
        const bin = TestUtils.findRenderedComponentWithType(appContext, Bin);
        backend.simulateBeginDrag([item.getHandlerId()]);
        backend.simulateHover([bin.getHandlerId()]);
        backend.simulateDrop();
        backend.simulateEndDrag();
    });
});

