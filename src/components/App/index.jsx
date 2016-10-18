import React from 'react';
import {Link} from 'react-router';
import update from 'react-addons-update';
import TodoForm from '../TodoForm';
import TodoList from '../TodoList';
require('./styles/index.scss');

class App extends React.Component {
    /**
     * Defining initial state and binding functions on the prototype chain
     * directly to the component with their context correctly set.
     *
     * @param {Object} props
     */
    constructor(props) {
        super(props);

        this.state = {
            items: [
                {id: 1475673921806, text: 'Test Entry #1', completed: true},
                {id: 1475673936180, text: 'Test Entry #2', completed: false},
                {id: 1475673946340, text: 'Test Entry #3', completed: false}
            ]
        };

        this.addItem = this.addItem.bind(this);
        this.toggleCompleted = this.toggleCompleted.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    /**
     * Creates and returns a tree of React components that will eventually be
     * rendered into HTML.
     *
     * Examines the route to determine which component needs to be rendered.
     * This complexity exists because the components need to be given props
     * that are functions of the App component, which is something that the
     * react <Route /> element cannot do.
     *
     * @return {React.Element}
     */
    render() {
        let childComponent;

        switch (this.props.location.pathname) {
            case '/add':
                childComponent = (
                    <TodoForm onAddItem={this.addItem} />
                );
                break;
            default:
                childComponent = (
                    <TodoList items={this.state.items}
                              onToggleCompleted={this.toggleCompleted}
                              onDeleteItem={this.deleteItem} />
                );
                break;
        }

        return (
            <div>
                <header>
                    <h1>React: Todo List</h1>
                    <nav>
                        <ul className="todo-list__nav-list">
                            <li className="todo-list__nav-list-item">
                                <Link to="/add"
                                      className="todo-list__nav-link"
                                      activeClassName="todo-list__nav-link--active">
                                      Add Todo
                                </Link>
                            </li>
                            <li className="todo-list__nav-list-item">
                                <Link to="/list"
                                      className="todo-list__nav-link"
                                      activeClassName="todo-list__nav-link--active">
                                      Todo Listings
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </header>
                {childComponent}
            </div>
        );
    }

    /**
     * Creates a new array by concatenating the old array with the new item
     * that was passed to this function, then updates state.
     *
     * @param {Object} item
     */
    addItem(item) {
        this.setState({
            items: this.state.items.concat(item)
        });

        this.context.router.push('/list');
    }

    /**
     * Creates a new array and splices the desired item from it then updates
     * state with the cloned, modified array.
     *
     * @param {Object} item
     */
    deleteItem(item) {
        let itemIndex = this.state.items.indexOf(item);

        if (itemIndex > -1) {
            let itemsCopy = this.state.items.slice();

            itemsCopy.splice(itemIndex, 1);

            this.setState({
                items: itemsCopy
            });
        }
    }

    /**
     * If item can be found in the stack, we create a deep copy of the items
     * then toggle the `completed` boolean inside the relevant item and trigger
     * a state update.
     *
     * @param {Object} item
     */
    toggleCompleted(item) {
        let itemIndex = this.state.items.indexOf(item);

        if (itemIndex > -1) {
            let newItemsState = update(this.state.items, {
                [itemIndex]: {
                    completed: {$set: !item.completed}
                }
            });

            this.setState({
                items: newItemsState
            });
        }
    }
}

/**
 * Denoting which props this component should expect along with their types.
 * This allows react to validate all props used when creating a component.
 *
 * @type {Object}
 */
App.propTypes = {
    location: React.PropTypes.object
};

/**
 * Requests certain component contexts to be accesible within this component.
 *
 * @type {Object}
 */
App.contextTypes = {
    router: React.PropTypes.object
};

export default App;
