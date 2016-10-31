import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ImmutablePropTypes from 'react-immutable-proptypes';
require('./styles/index.scss');

/**
 * A stateless function which requires no lifecycle hooks or state.
 *
 * @param {Object} props
 * @return {React.Element}
 */
function TodoList(props) {
    let defaultClassName = 'todo-list__list-item';

    let listItems = props.todos.map((item) => {
        let className = defaultClassName += (item.get('completed')) ? ' item--completed' : '';

        return (
            <li key={item.get('id')}
                className={className}>
                {item.get('text')}
                <br />
                <button data-action="toggle"
                        onClick={props.onToggleCompleted.bind(null, item.get('id'))}>
                    {(item.get('completed')) ? 'Uncomplete' : 'Complete'}
                </button>
                <button data-action="delete"
                        onClick={props.onDeleteItem.bind(null, item.get('id'))}>
                    Delete
                </button>
            </li>
        );
    });

    return (
        <div>
            <ReactCSSTransitionGroup
                component={props.listType}
                className="todo-list__list"
                transitionName="todo-list__list-item"
                transitionEnterTimeout={0}
                transitionLeaveTimeout={0}>
                {listItems}
            </ReactCSSTransitionGroup>
            <span className="todo-list__count">
                {props.todos.size} item(s).
            </span>
        </div>
    );
};

/**
 * Denoting which props this component should expect along with their types.
 * This allows react to validate all props used when creating a component.
 *
 * @type {Object}
 */
TodoList.propTypes = {
    listType: React.PropTypes.oneOf(['ol', 'ul']),
    todos: ImmutablePropTypes.list.isRequired,
    onDeleteItem: React.PropTypes.func.isRequired,
    onToggleCompleted: React.PropTypes.func.isRequired
};

/**
 * Ensuring that certain props will have a default value if no value was
 * specified by the parent component.
 *
 * @type {Object}
 */
TodoList.defaultProps = {
    listType: 'ol'
};

export default TodoList;
