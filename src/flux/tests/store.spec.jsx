import Immutable from 'immutable';
import TodoStore from '../store';
import ActionTypes from '../actions';

describe('TodoStore', function() {
    beforeEach(function() {
        TodoStore.TestUtils.reset();
    });

    describe('todos', function() {
        const todos = () => {
            return TodoStore.getTodos();
        };

        const createTodo = (todo) => {
            TodoStore.TestUtils.mockDispatch({
                type: ActionTypes.ADD_TODO,
                payload: todo
            });
        };

        const removeTodo = (todo) => {
            TodoStore.TestUtils.mockDispatch({
                type: ActionTypes.REMOVE_TODO,
                payload: todo
            });
        };

        const toggleTodo = (todo) => {
            TodoStore.TestUtils.mockDispatch({
                type: ActionTypes.TOGGLE_TODO,
                payload: todo
            });
        };

        it('should have no todos by default', function() {
            expect(TodoStore.getTodos().size).to.equal(0);
        });

        describe('getting todos', function() {
            it('will return an immutable list', function() {
                expect(Immutable.List.isList(todos())).to.equal(true);
            });
        });

        describe('adding a todo', function() {
            beforeEach(function() {
                createTodo({
                    id: '1',
                    text: 'buy cheese'
                });
            });

            it('only adds one todo', function() {
                expect(todos().size).to.equal(1);
            });

            it('stores the new todo id', function() {
                expect(todos().first().get('id')).to.equal('1');
            });

            it('stores the new todo text', function() {
                expect(todos().first().get('text')).to.equal('buy cheese');
            });

            it('stores the new todo as uncompleted by default', function() {
                expect(todos().first().get('completed')).to.equal(false);
            });
        });

        describe('removing a todo', function() {
            beforeEach(function() {
                createTodo({
                    id: '1',
                    text: 'buy cheese'
                });

                removeTodo({
                    id: '1'
                });
            });

            it('will delete it from the stack', function() {
                expect(todos().size).to.equal(0);
            });

            describe('will no-op', function() {
                beforeEach(function() {
                    removeTodo({
                        id: '123'
                    });
                });

                it('when a non-existent is supplied', function() {
                    expect(TodoStore.getTodos().size).to.equal(0);
                });
            });
        });

        describe('toggling a todo', function() {
            beforeEach(function() {
                createTodo({
                    id: '1',
                    text: 'buy cheese'
                });

                this.preToggledValue = todos().first().get('completed');

                toggleTodo({
                    id: '1'
                });
            });

            it('will flip its value', function() {
                expect(todos().first().get('completed')).to.equal(!this.preToggledValue);
            });
        });
    });
});
