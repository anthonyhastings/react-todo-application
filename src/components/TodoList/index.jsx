import React from 'react';

class TodoList extends React.Component {
    /**
     * Creates and returns a tree of React components that will eventually be
     * rendered into HTML.
     *
     * Uses a variable to house a dynamic node name. This is used in the JSX
     * template where interpolating a node name isn't possible.
     *
     * @return {Object}
     */
    render() {
        let ListType = `${this.props.listType}`;

        return (
            <div>
                <ListType>
                    {this.props.items.map((item) => {
                        return (
                            <li key={item.id} className={(item.completed) ? 'item--completed' : '' }>
                                {item.text}
                                <br />
                                <button onClick={this.props.onToggleCompleted.bind(null, item)}>
                                    {(item.completed) ? 'Uncomplete' : 'Complete'}
                                </button>
                            </li>
                        );
                    })}
                </ListType>
                <span>{this.props.items.length} item(s).</span>
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
    listType: React.PropTypes.string,
    items: React.PropTypes.array.isRequired,
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
