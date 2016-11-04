import {ConstantCollection} from 'fluxthis';

/**
 * Create human-readable, minifier-friendly action constants, which are never
 * equal to anything but themselves.
 * @return {Object}
 */
export default new ConstantCollection(
    'ADD_TODO_FAILURE',
    'ADD_TODO_PENDING',
    'ADD_TODO_SUCCESS',
    'GET_TODOS_FAILURE',
    'GET_TODOS_PENDING',
    'GET_TODOS_SUCCESS',
    'UPDATE_TODO_FAILURE',
    'UPDATE_TODO_PENDING',
    'UPDATE_TODO_SUCCESS',
    'DELETE_TODO_FAILURE',
    'DELETE_TODO_PENDING',
    'DELETE_TODO_SUCCESS'
);
