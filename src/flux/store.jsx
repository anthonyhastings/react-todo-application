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
            todos: []
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
         * @param {Object} payload
         * @returns {ImmutableMap}
         */
        addTodo(state, payload) {
            let todo = Immutable.fromJS({
                id: payload.id,
                text: payload.text,
                completed: false
            });

            return this.state.update('todos', (todos) => {
                return todos.push(todo);
            });
        },

        /**
         * Removes the specified Todo from a copy of the state data then the
         * copy is returned to be used as the new state.
         *
         * @param {ImmutableMap} state
         * @param {String} id
         * @returns {ImmutableMap}
         */
        removeTodo(state, id) {
            let index = this.state.get('todos').findIndex((todo) => {
                return todo.get('id') === id;
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
         * Toggles the completed flag of the specified Todo which gets cloned
         * and placed into a new set of Todos. This gets set onto a copy of
         * the store's state.
         *
         * @param {ImmutableMap} state
         * @param {String} id
         * @returns {ImmutableMap}
         */
        toggleTodo(state, id) {
            let index = this.state.get('todos').findIndex((todo) => {
                return todo.get('id') === id;
            });

            return this.state.update('todos', (todos) => {
                return todos.update(index, (todo) => {
                    return todo.set('completed', !todo.get('completed'));
                });
            });
        }
    }
});
