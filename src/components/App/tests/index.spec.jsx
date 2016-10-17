import React from 'react';
import {shallow} from 'enzyme';
import App from '../index';
import TodoForm from '../../TodoForm';
import TodoList from '../../TodoList';

describe('App component', function() {
    /**
     * Creates an Application component with faked location and context data.
     *
     * @param {String} pathname
     * @return {ShallowWrapper}
     */
    let createWrapper = function(pathname = '') {
        let fakeLocation = {pathname: pathname};
        let shallowOptions = {context: {router: {push: sinon.stub()}}};

        return shallow(<App location={fakeLocation} />, shallowOptions);
    };

    beforeEach(function() {
        this.sinonSandbox = sinon.sandbox.create();

        this.dummyItem = {
            id: 1234567890,
            text: 'Test Entry #4',
            completed: false
        };

        this.wrapper = createWrapper();
    });

    afterEach(function() {
        this.sinonSandbox.restore();
    });

    context('render()', function() {
        it('should render TodoForm component on particular route', function() {
            expect(createWrapper('/add').find(TodoForm).length).to.equal(1);
        });

        it('should render TodoList component on particular route', function() {
            expect(this.wrapper.find(TodoList).length).to.equal(1);
        });
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
        expect(this.wrapper.instance().context.router.push.callCount).to.equal(1);
    });

    it('toggleCompleted() should flip boolean accordingly', function() {
        this.wrapper.instance().addItem(this.dummyItem);
        expect(this.wrapper.state('items')[3].completed).to.equal(false);

        this.wrapper.instance().toggleCompleted(this.wrapper.state('items')[3]);
        expect(this.wrapper.state('items')[3].completed).to.equal(true);

        this.wrapper.instance().toggleCompleted(this.wrapper.state('items')[3]);
        expect(this.wrapper.state('items')[3].completed).to.equal(false);
    });
});
