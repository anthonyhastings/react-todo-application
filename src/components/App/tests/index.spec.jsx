import React from 'react';
import {shallow} from 'enzyme';
import App from '../index';
import TodoForm from '../../TodoForm';
import TodoList from '../../TodoList';

describe('App component', function() {
    beforeEach(function() {
        this.sinonSandbox = sinon.sandbox.create();
        this.wrapper = shallow(<App />);
        this.dummyItem = {
            id: 1234567890,
            text: 'Test Entry #4',
            completed: false
        };
    });

    afterEach(function() {
        this.sinonSandbox.restore();
    });

    it('should render its two sub-components', function() {
        expect(this.wrapper.find(TodoForm).length).to.equal(1);
        expect(this.wrapper.find(TodoList).length).to.equal(1);
    });

    context('deleteItem()', function() {
        it('should remove an item from the stack', function() {
            expect(this.wrapper.state('items').indexOf(this.dummyItem)).to.equal(-1);
            this.wrapper.instance().addItem(this.dummyItem);
            expect(this.wrapper.state('items').indexOf(this.dummyItem)).to.be.above(-1);
            this.wrapper.instance().deleteItem(this.dummyItem);
            expect(this.wrapper.state('items').indexOf(this.dummyItem)).to.equal(-1);
        });

        it('should essentially no-op if an item is not found', function() {
            let itemsCount = this.wrapper.state('items').length;

            this.wrapper.instance().deleteItem('hello');
            expect(this.wrapper.state('items').length).to.equal(itemsCount);
        });
    });

    it('addItem() should append given item onto stack', function() {
        expect(this.wrapper.state('items').length).to.equal(3);
        this.wrapper.instance().addItem(this.dummyItem);
        expect(this.wrapper.state('items').length).to.equal(4);
        expect(this.wrapper.state('items')[3]).to.deep.equal(this.dummyItem);
    });

    it('toggleCompleted() should flip boolean accordingly', function() {
        this.wrapper.instance().addItem(this.dummyItem);
        expect(this.wrapper.state('items')[3].completed).to.equal(false);

        this.wrapper.instance().toggleCompleted(this.dummyItem);
        expect(this.wrapper.state('items')[3].completed).to.equal(true);

        this.wrapper.instance().toggleCompleted(this.dummyItem);
        expect(this.wrapper.state('items')[3].completed).to.equal(false);
    });
});
