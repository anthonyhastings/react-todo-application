import React from 'react';
import {shallow} from 'enzyme';
import App from '../index';
import TodoForm from '../../TodoForm';
import TodoList from '../../TodoList';
import ActionCreator from '../../../flux/action-creator';

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

    it('handleTodoAdd() should call appropriate action creator method', function() {
        let testValue = 'Pick up milk.';

        this.sinonSandbox.stub(ActionCreator, 'createTodo');

        expect(ActionCreator.createTodo.callCount).to.equal(0);
        this.wrapper.instance().handleTodoAdd(testValue);
        expect(ActionCreator.createTodo.callCount).to.equal(1);
        expect(ActionCreator.createTodo.lastCall.args[0].text).to.equal(testValue);
        expect(this.wrapper.instance().context.router.push.callCount).to.equal(1);
    });

    it('handleTodoRemove() should call appropriate action creator method', function() {
        let testValue = '123456789';

        this.sinonSandbox.stub(ActionCreator, 'removeTodo');

        expect(ActionCreator.removeTodo.callCount).to.equal(0);
        this.wrapper.instance().handleTodoRemove(testValue);
        expect(ActionCreator.removeTodo.callCount).to.equal(1);
        expect(ActionCreator.removeTodo.lastCall.args[0].id).to.equal(testValue);
    });

    it('handleTodoToggle() should call appropriate action creator method', function() {
        let testValue = '123456789';

        this.sinonSandbox.stub(ActionCreator, 'toggleTodo');

        expect(ActionCreator.toggleTodo.callCount).to.equal(0);
        this.wrapper.instance().handleTodoToggle(testValue);
        expect(ActionCreator.toggleTodo.callCount).to.equal(1);
        expect(ActionCreator.toggleTodo.lastCall.args[0].id).to.equal(testValue);
    });
});
