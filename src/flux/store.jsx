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
     *
     * @type {Function}
     */
    init() {
        this.defaultState = Immutable.fromJS({
            todos: [],
            status: {
                pendingUpdate: false,
                isFetched: false
            }
        });

        this.bindActions(
            ActionTypes.ADD_TODO_PENDING, this.setPending,
            ActionTypes.ADD_TODO_SUCCESS, this.addTodo,
            ActionTypes.GET_TODOS_PENDING, this.setPending,
            ActionTypes.GET_TODOS_SUCCESS, this.setTodos,
            ActionTypes.UPDATE_TODO_PENDING, this.setPending,
            ActionTypes.UPDATE_TODO_SUCCESS, this.updateTodo,
            ActionTypes.DELETE_TODO_PENDING, this.setPending,
            ActionTypes.DELETE_TODO_SUCCESS, this.removeTodo
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
        },

        /**
         * Returns the status object.
         *
         * @return {Object}
         */
        getStatus() {
            return this.state.get('status');
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
         * Pushes a Todo from the server onto a copy of the Todo stack then
         * updates state accordingly. It will also update the status object
         * to signify fetching is complete.
         *
         * @param {ImmutableMap} state
         * @param {Object} response
         * @returns {ImmutableMap}
         */
        addTodo(state, {response}) {
            const pushToStack = (todos) => todos.push(Immutable.fromJS(response.body));

            return (
                state.update('todos', pushToStack)
                     .setIn(['status', 'pendingUpdate'], false)
            );
        },

        /**
         * Fetches Todos from the server and sets them on the state. It will
         * also update the status object to signify fetching is complete.
         *
         * @param {ImmutableMap} state
         * @param {Object} response
         * @returns {ImmutableMap}
         */
        setTodos(state, {response}) {
            const newStatus = {pendingUpdate: false, isFetched: true};

            return (
                state.set('todos', Immutable.fromJS(response.body))
                     .set('status', Immutable.fromJS(newStatus))
            );
        },

        /**
         * Toggles the completed flag of the specified Todo which gets cloned
         * and placed into a new set of Todos. This gets set onto a copy of
         * the store's state.
         *
         * @param {ImmutableMap} state
         * @param {Object} response
         * @returns {ImmutableMap}
         */
        updateTodo(state, {response}) {
            const todoIndex = state.get('todos').findIndex((todo) => {
                return todo.get('id') === response.body.id;
            });

            return (
                state.setIn(['todos', todoIndex], Immutable.fromJS(response.body))
                     .setIn(['status', 'pendingUpdate'], false)
            );
        },

        /**
         * Removes the specified todo from a copy of the Todos stack and sets
         * this onto the state. It will also update the status object to
         * signify fetching is complete.
         *
         * @param {ImmutableMap} state
         * @param {Object} response
         * @returns {ImmutableMap}
         */
        removeTodo(state, {response}) {
            const filterTodo = (todos) => {
                return todos.filter((todo) => {
                    return todo.get('id') !== response.body.id;
                });
            };

            return (
                state.update('todos', filterTodo)
                     .setIn(['status', 'pendingUpdate'], false)
            );
        },

        /**
         * Updates the status object to signify that an update is pending
         * completion.
         *
         * @param {ImmutableMap} state
         * @returns {ImmutableMap}
         */
        setPending(state) {
            return state.setIn(['status', 'pendingUpdate'], true);
        }
    }
});
