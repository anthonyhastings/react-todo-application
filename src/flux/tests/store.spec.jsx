import Immutable from 'immutable';
import TodoStore from '../store';
import ActionTypes from '../actions';

const status = () => {
    return TodoStore.getStatus();
};

describe('TodoStore', function() {
    beforeEach(function() {
        TodoStore.TestUtils.reset();
    });

    describe('status', function() {
        const setPending = () => {
            TodoStore.TestUtils.mockDispatch({
                type: ActionTypes.ADD_TODO_PENDING
            });
        };

        it('should not be flagged as having an update pending by default', function() {
            expect(status().get('pendingUpdate')).to.equal(false);
        });

        it('should not be flagged as having been fetched by default', function() {
            expect(status().get('isFetched')).to.equal(false);
        });

        describe('setting status', function() {
            beforeEach(function() {
                setPending();
            });

            it('should flag as pending when triggered', function() {
                expect(status().get('pendingUpdate')).to.equal(true);
            });
        });
    });

    describe('todos', function() {
        const todos = () => {
            return TodoStore.getTodos();
        };

        const createTodo = (response) => {
            TodoStore.TestUtils.mockDispatch({
                type: ActionTypes.ADD_TODO_SUCCESS,
                payload: response
            });
        };

        const setTodos = (response) => {
            TodoStore.TestUtils.mockDispatch({
                type: ActionTypes.GET_TODOS_SUCCESS,
                payload: response
            });
        };

        const updateTodo = (response) => {
            TodoStore.TestUtils.mockDispatch({
                type: ActionTypes.UPDATE_TODO_SUCCESS,
                payload: response
            });
        };

        const deleteTodo = (response) => {
            TodoStore.TestUtils.mockDispatch({
                type: ActionTypes.DELETE_TODO_SUCCESS,
                payload: response
            });
        };

        it('should have no Todos by default', function() {
            expect(todos().size).to.equal(0);
        });

        describe('Creating a Todo', function() {
            beforeEach(function() {
                createTodo({
                    response: {
                        body: {
                            id: '1',
                            text: 'buy cheese',
                            completed: false
                        }
                    }
                });
            });

            it('only adds one todo', function() {
                expect(todos().size).to.equal(1);
            });

            it('stores the new Todo id', function() {
                expect(todos().first().get('id')).to.equal('1');
            });

            it('stores the new Todo text', function() {
                expect(todos().first().get('text')).to.equal('buy cheese');
            });

            it('stores the new Todo as uncompleted by default', function() {
                expect(todos().first().get('completed')).to.equal(false);
            });

            it('sets the status back to no longer pending an update', function() {
                expect(status().get('pendingUpdate')).to.equal(false);
            });
        });

        describe('Reading Todos', function() {
            beforeEach(function() {
                setTodos({
                    response: {
                        body: [
                            {
                                id: '1',
                                text: 'buy cheese',
                                completed: false
                            },
                            {
                                id: '2',
                                text: 'buy milk',
                                completed: true
                            }
                        ]
                    }
                });
            });

            it('will return an immutable list', function() {
                expect(Immutable.List.isList(todos())).to.equal(true);
            });

            it('sets the status back to no longer pending an update', function() {
                expect(status().get('pendingUpdate')).to.equal(false);
            });

            it('sets the status to signify fetching has occurred', function() {
                expect(status().get('isFetched')).to.equal(true);
            });

            it('saves all Todos', function() {
                expect(todos().size).to.equal(2);
            });

            it('stores the first Todo correctly', function() {
                expect(todos().first().toJS()).to.deep.equal({
                    id: '1',
                    text: 'buy cheese',
                    completed: false
                });
            });

            it('stores the second Todo correctly', function() {
                expect(todos().get(1).toJS()).to.deep.equal({
                    id: '2',
                    text: 'buy milk',
                    completed: true
                });
            });
        });

        describe('Updating a Todo', function() {
            beforeEach(function() {
                createTodo({
                    response: {
                        body: {
                            id: '1',
                            text: 'buy cheese',
                            completed: false
                        }
                    }
                });

                updateTodo({
                    response: {
                        body: {
                            id: '1',
                            text: 'buy cheese!!!',
                            completed: true
                        }
                    }
                });
            });

            it('sets the status back to no longer pending an update', function() {
                expect(status().get('pendingUpdate')).to.equal(false);
            });

            it('updates the Todo correctly', function() {
                expect(todos().first().toJS()).to.deep.equal({
                    id: '1',
                    text: 'buy cheese!!!',
                    completed: true
                });
            });
        });

        describe('Deleting a todo', function() {
            beforeEach(function() {
                createTodo({
                    response: {
                        body: {
                            id: '1',
                            text: 'buy cheese',
                            completed: false
                        }
                    }
                });

                createTodo({
                    response: {
                        body: {
                            id: '2',
                            text: 'buy milk',
                            completed: true
                        }
                    }
                });
            });

            it('Todos should be initially present', function() {
                expect(todos().size).to.equal(2);
            });

            describe('then upon triggering action', function() {
                beforeEach(function() {
                    deleteTodo({
                        response: {
                            body: {
                                id: '1',
                                text: 'buy cheese',
                                completed: false
                            }
                        }
                    });
                });

                it('sets the status back to no longer pending an update', function() {
                    expect(status().get('pendingUpdate')).to.equal(false);
                });

                it('will delete it from the stack', function() {
                    expect(todos().size).to.equal(1);
                });
            });
        });
    });
});
