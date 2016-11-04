import React from 'react';
import {shallow} from 'enzyme';
import App from '../index';
import TodoForm from '../../TodoForm';
import TodoList from '../../TodoList';
import TodoAPIActionCreator from '../../../flux/action-creator';

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

        this.sinonSandbox.stub(TodoAPIActionCreator, 'createTodo');

        expect(TodoAPIActionCreator.createTodo.callCount).to.equal(0);
        this.wrapper.instance().handleTodoAdd(testValue);
        expect(TodoAPIActionCreator.createTodo.callCount).to.equal(1);
        expect(TodoAPIActionCreator.createTodo.lastCall.args[0].text).to.equal(testValue);
        expect(this.wrapper.instance().context.router.push.callCount).to.equal(1);
    });

    it('handleTodoRemove() should call appropriate action creator method', function() {
        let testValue = {id: '123456789', text: 'Pick up milk.', completed: false};

        this.sinonSandbox.stub(TodoAPIActionCreator, 'removeTodo');

        expect(TodoAPIActionCreator.removeTodo.callCount).to.equal(0);
        this.wrapper.instance().handleTodoRemove(testValue);
        expect(TodoAPIActionCreator.removeTodo.callCount).to.equal(1);
        expect(TodoAPIActionCreator.removeTodo.lastCall.args[0].todo.id).to.equal(testValue.id);
    });

    it('handleTodoToggle() should call appropriate action creator method', function() {
        let testValue = {id: '123456789', text: 'Pick up milk.', completed: false};

        this.sinonSandbox.stub(TodoAPIActionCreator, 'updateTodo');

        expect(TodoAPIActionCreator.updateTodo.callCount).to.equal(0);
        this.wrapper.instance().handleTodoUpdate(testValue);
        expect(TodoAPIActionCreator.updateTodo.callCount).to.equal(1);
        expect(TodoAPIActionCreator.updateTodo.lastCall.args[0].todo.id).to.equal(testValue.id);
    });
});
