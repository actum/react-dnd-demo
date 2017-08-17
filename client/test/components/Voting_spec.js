import React from 'react';
import {mount, render, shallow} from 'enzyme'
import Voting from '../../src/components/Voting.jsx';
import {expect} from 'chai';

describe('Voting', () => {

    it('renders a pair of buttons', () => {
        const component = shallow(
            <Voting pair={["Trainspotting", "28 Days Later"]}/>
        );
        const buttons = component.find('button');

        expect(buttons.length).to.equal(2);
        expect(buttons.at(0).text()).to.equal('Trainspotting');
        expect(buttons.at(1).text()).to.equal('28 Days Later');

    });

    it('invokes a callback when a button is clicked', () => {
        let votedWith;
        const vote = (entry) => votedWith = entry;
        const component = shallow(
            <Voting pair={["Trainspotting", "28 Days Later"]}
                    vote={vote}/>
        );
        const buttons = component.find('button');
        buttons.at(0).simulate('click');
        expect(votedWith).to.equal('Trainspotting');
    });

});