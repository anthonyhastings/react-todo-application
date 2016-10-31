import {ImmutableReducerStore} from 'fluxthis';
import ActionTypes from './actions';
const Immutable = ImmutableReducerStore.Immutable;

export default new ImmutableReducerStore({
    /**
     * Human-readable name for debugging.
     *
     * @type {String}
     */
    displayName: 'TodoStore',

    /**
     * Sets up default state of the store and binds actions to private methods.
     */
    init() {
        this.defaultState = Immutable.fromJS({
            todos: [
                {id: 1475673921806, text: 'Test Entry #1', completed: true},
                {id: 1475673936180, text: 'Test Entry #2', completed: false},
                {id: 1475673946340, text: 'Test Entry #3', completed: false}
            ]
        });

        this.bindActions(
            ActionTypes.ADD_TODO, this.addTodo,
            ActionTypes.REMOVE_TODO, this.removeTodo,
            ActionTypes.TOGGLE_TODO, this.toggleTodo
        );
    },

    /**
     * Holds accessor functions which can be used to get data inside the store.
     *
     * @type {Object}
     */
    public: {
        /**
         * Returns the Todo list.
         *
         * @return {Object}
         */
        getTodos() {
            return this.state.get('todos');
        }
    },

    /**
     * Internal reducer methods that respond to updates from the dispatcher.
     * These methods should return new immutable versions of the store's state.
     *
     * @type {Object}
     */
    private: {
        /**
         * Creates a new Todo, creates a new set of Todos which now contain the
         * new Todo, and then updates store state.
         *
         * @param {ImmutableMap} state
         * @param {Object} action
         * @returns {Object}
         */
        addTodo(state, action) {
            console.info('store::addTodo', state, action);

            let todo = Immutable.fromJS({
                id: action.id,
                text: action.text,
                completed: false
            });

            return this.state.update('todos', (todos) => {
                return todos.push(todo);
            });
        },

        /**
         * Removes the specified identifier from the ImmutableList (causing a
         * new list to be made).
         *
         * @param {ImmutableMap} state
         * @param {Object} action
         * @returns {Object}
         */
        removeTodo(state, action) {
            console.info('store::removeTodo', state, action);

            let index = this.state.get('todos').findIndex((todo) => {
                return todo.get('id') === action.id;
            });

            if (index > -1) {
                return this.state.update('todos', (todos) => {
                    return todos.remove(index);
                });
            } else {
                return this.state;
            }
        },

        /**
         * Toggles the completed flag of the specified Todo and saves the
         * resulting new ImmutableList of Todo Items.
         *
         * @param {ImmutableMap} state
         * @param {Object} action
         * @returns {Object}
         */
        toggleTodo(state, action) {
            console.info('store::toggleTodo', state, action);

            let index = this.state.get('todos').findIndex((todo) => {
                return todo.get('id') === action.id;
            });

            return this.state.update('todos', (todos) => {
                return todos.update(index, (todo) => {
                    return todo.set('completed', !todo.get('completed'));
                });
            });
        }
    }
});
