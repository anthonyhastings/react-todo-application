import React from 'react';
import {mount} from 'enzyme';
import TodoForm from '../index';

describe('TodoForm component', function() {
    beforeEach(function() {
        this.sinonSandbox = sinon.sandbox.create();

        this.addItem = this.sinonSandbox.stub();

        this.wrapper = mount(<TodoForm onAddItem={this.addItem} />);
    });

    afterEach(function() {
        this.sinonSandbox.restore();
    });

    it('should render the right amount of list items', function() {
        console.log(this.wrapper);
        console.log(this.wrapper.instance().onInputChanged);
        console.log(this.wrapper.prop('onAddItem'));
        console.log(this.wrapper.state());
        console.log(this.wrapper.find('input').length);

        expect(1).to.equal(2);
    });
});
