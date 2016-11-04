import uuid from 'uuid';
import {APIActionCreator} from 'fluxthis';
import ActionTypes from './actions';

APIActionCreator.setDefaultBaseURL('http://localhost:4000');

export default new APIActionCreator({
    /**
     * Human-readable name for debugging.
     *
     * @type {String}
     */
    displayName: 'TodoAPIActionCreator',

    /**
     * Creates and dispatches an action that adds a Todo to the server.
     * Contains pre-process step to take initial payload and add a UUID.
     *
     * @type {Object}
     */
    createTodo: {
        route: '/api/todo',
        method: 'POST',
        pending: ActionTypes.ADD_TODO_PENDING,
        success: ActionTypes.ADD_TODO_SUCCESS,
        failure: ActionTypes.ADD_TODO_FAILURE,
        createRequest(payload) {
            return {
                body: {
                    id: uuid.v4(),
                    text: payload.text
                }
            };
        }
    },

    /**
     * Creates and dispatches an action that fetches Todos from the server.
     *
     * @type {Object}
     */
    getTodos: {
        route: '/api/todo',
        method: 'GET',
        pending: ActionTypes.GET_TODOS_PENDING,
        success: ActionTypes.GET_TODOS_SUCCESS,
        failure: ActionTypes.GET_TODOS_FAILURE
    },

    /**
     * Creates and dispatches an action that updates a Todo on the server.
     *
     * @type {Object}
     */
    updateTodo: {
        route: '/api/todo/:id',
        method: 'PUT',
        pending: ActionTypes.UPDATE_TODO_PENDING,
        success: ActionTypes.UPDATE_TODO_SUCCESS,
        failure: ActionTypes.UPDATE_TODO_FAILURE,
        createRequest(payload) {
            const todo = payload.todo.toJS();

            todo.completed = !todo.completed;

            return {
                body: todo,
                params: {id: todo.id}
            };
        }
    },

    /**
     * Creates and dispatches an action that removes a Todo from the server.
     *
     * @type {Object}
     */
    removeTodo: {
        route: '/api/todo/:id',
        method: 'DELETE',
        pending: ActionTypes.DELETE_TODO_PENDING,
        success: ActionTypes.DELETE_TODO_SUCCESS,
        failure: ActionTypes.DELETE_TODO_FAILURE,
        createRequest(payload) {
            return {
                params: {id: payload.todo.get('id')}
            };
        }
    }
});
