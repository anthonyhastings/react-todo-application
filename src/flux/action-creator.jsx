import uuid from 'uuid';
import {ActionCreator} from 'fluxthis';
import ActionTypes from './actions';

export default new ActionCreator({
    /**
     * Human-readable name for debugging.
     *
     * @type {String}
     */
    displayName: 'Todo',

    /**
     * Creates and triggers an action for adding a Todo. Contains pre-process
     * step to take initial payload and output one containing a UUID.
     *
     * @type {Object}
     */
    createTodo: {
        type: ActionTypes.ADD_TODO,
        payload: ActionCreator.PayloadTypes.shape({
            id: ActionCreator.PayloadTypes.string.isRequired,
            text: ActionCreator.PayloadTypes.string.isRequired
        }).isRequired,
        createPayload: function(initialPayload) {
            return {
                id: uuid.v4(),
                text: initialPayload.text
            };
        }
    },

    /**
     * Creates and triggers an action for removing a Todo.
     *
     * @type {Object}
     */
    removeTodo: {
        type: ActionTypes.REMOVE_TODO,
        payload: ActionCreator.PayloadTypes.shape({
            id: ActionCreator.PayloadTypes.string.isRequired
        }).isRequired
    },

    /**
     * Creates and triggers an action for toggling a Todo.
     *
     * @type {Object}
     */
    toggleTodo: {
        type: ActionTypes.TOGGLE_TODO,
        payload: ActionCreator.PayloadTypes.shape({
            id: ActionCreator.PayloadTypes.string.isRequired
        }).isRequired
    }
});
