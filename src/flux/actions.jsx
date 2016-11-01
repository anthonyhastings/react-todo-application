import {ConstantCollection} from 'fluxthis';

/**
 * Create human-readable, minifier-friendly action constants, which are never
 * equal to anything but themselves.
 * @return {Object}
 */
export default new ConstantCollection(
    'ADD_TODO',
    'REMOVE_TODO',
    'TOGGLE_TODO'
);
