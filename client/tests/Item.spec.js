import 'jsdom-global/register';
import { expect } from 'chai';
import React, { Component }from 'react';
import TestUtils from 'react-dom/test-utils';
import TestBackend from 'react-dnd-test-backend';
import { DragDropContext } from 'react-dnd';
import Item from '../src/components/Item.jsx';
import Bin from '../src/components/Bin.jsx';

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
        expect(div.style.opacity).to.equal('1');
    });

    it('reacts to dragging', () => {
        const OriginalItem = Item.DecoratedComponent;
        const identity = el => el;
        let root = TestUtils.renderIntoDocument(<OriginalItem name="test" type="testing" connectDragSource={ identity } isDragging/>);
        let div = TestUtils.findRenderedDOMComponentWithTag(root, 'div');
        expect(div.style.opacity).to.equal('0.5');
    });

    it('can be tested with the testing backend', () => {

        // Render with the test context that uses the test backend
        const ItemContext = wrapInTestContext(Item);
        let root = TestUtils.renderIntoDocument(<ItemContext name='test' type="testing" />);
        
        // Obtain a reference to the backend
        const backend = root.getManager().getBackend();
        
        // Test that the opacity is 1
        let div = TestUtils.findRenderedDOMComponentWithTag(root, 'div');
        expect(div.style.opacity).to.equal('1');

        // Find the drag source ID and use it to simulate the dragging operation
        const item = TestUtils.findRenderedComponentWithType(root, Item);
        backend.simulateBeginDrag([item.getHandlerId()]);

        // Verify that the div changed its opacity
        div = TestUtils.findRenderedDOMComponentWithTag(root, 'div');
        expect(div.style.opacity).to.equal('0.5');

    });
});

