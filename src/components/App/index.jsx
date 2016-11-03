import React from 'react';
import {Link} from 'react-router';
import TodoStore from '../../flux/store';
import ActionCreator from '../../flux/action-creator';
import TodoForm from '../TodoForm';
import TodoList from '../TodoList';
require('./styles/index.scss');

export default React.createClass({
    /**
     * Denoting which props this component should expect along with their types.
     * This allows react to validate all props used when creating a component.
     *
     * @type {Object}
     */
    propTypes: {
        location: React.PropTypes.object
    },

    /**
     * Requests certain component contexts to be accessible to this component.
     *
     * @type {Object}
     */
    contextTypes: {
        router: React.PropTypes.object
    },

    /**
     * Adding mixins for every store this view depends on. For the most part,
     * only top level components will need to use FluxThis mixins.
     *
     * @type {Array}
     */
    mixins: [TodoStore.mixin],

    /**
     * Whenever the component is about to be mounted into the DOM we request
     * an action be triggered to fetch Todos.
     */
    componentWillMount() {
        ActionCreator.getTodos();
    },

    /**
     * Translates public store methods into internal component state.
     * This function will be called when dependant stores fire change events.
     *
     * @return {Object}
     */
    getStateFromStores() {
        return {
            todos: TodoStore.getTodos()
        };
    },

    /**
     * Triggers a call to the ActionCreator to add a Todo.
     *
     * @param {String} text
     */
    handleTodoAdd(text) {
        ActionCreator.createTodo({text});
        this.context.router.push('/list');
    },

    /**
     * Triggers a call to the ActionCreator to remove a Todo.
     *
     * @param {Object} todo
     */
    handleTodoRemove(todo) {
        ActionCreator.removeTodo({todo});
    },

    /**
     * Triggers a call to the ActionCreator to update a Todo.
     *
     * @param {Object} todo
     */
    handleTodoUpdate(todo) {
        ActionCreator.updateTodo({todo});
    },

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
                    <TodoForm onAddItem={this.handleTodoAdd} />
                );
                break;
            default:
                childComponent = (
                    <TodoList todos={this.state.todos}
                              onUpdateItem={this.handleTodoUpdate}
                              onDeleteItem={this.handleTodoRemove} />
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
});
