import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
require('./styles/index.scss');

class TodoList extends React.Component {
    /**
     * Creates and returns a tree of React components that will eventually be
     * rendered into HTML.
     *
     * @return {Object}
     */
    render() {
        let listItems = this.props.items.map((item) => {
            let className = 'todo-list__list-item';

            className += (item.completed) ? ' item--completed' : '';

            return (
                <li key={item.id}
                    className={className}>
                    {item.text}
                    <br />
                    <button data-action="toggle"
                            onClick={this.props.onToggleCompleted.bind(null, item)}>
                        {(item.completed) ? 'Uncomplete' : 'Complete'}
                    </button>
                    <button data-action="delete"
                            onClick={this.props.onDeleteItem.bind(null, item)}>
                        Delete
                    </button>
                </li>
            );
        });

        return (
            <div>
                <ReactCSSTransitionGroup
                    component={this.props.listType}
                    className="todo-list__list"
                    transitionName="todo-list__list-item"
                    transitionEnterTimeout={0}
                    transitionLeaveTimeout={0}>
                    {listItems}
                </ReactCSSTransitionGroup>
                <span className="todo-list__count">
                    {this.props.items.length} item(s).
                </span>
            </div>
        );
    }
}

/**
 * Denoting which props this component should expect along with their types.
 * This allows react to validate all props used when creating a component.
 *
 * @type {Object}
 */
TodoList.propTypes = {
    listType: React.PropTypes.oneOf(['ol', 'ul']),
    items: React.PropTypes.array.isRequired,
    onDeleteItem: React.PropTypes.func.isRequired,
    onToggleCompleted: React.PropTypes.func.isRequired
};

/**
 * Ensuring that certain props will have a default value if none was specified
 * by the parent component.
 *
 * @type {Object}
 */
TodoList.defaultProps = {
    listType: 'ol'
};

export default TodoList;
