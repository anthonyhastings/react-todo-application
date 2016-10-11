import React from 'react';
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
    }

    /**
     * Creates and returns a tree of React components that will eventually be
     * rendered into HTML.
     *
     * @return {Object}
     */
    render() {
        return (
            <div>
                <h1>React: Todo List</h1>
                <TodoForm onAddItem={this.addItem} />
                <TodoList items={this.state.items} onToggleCompleted={this.toggleCompleted} />
            </div>
        );
    }

    /**
     * Creates a new array by concatenating the old array with the new item
     * that was passed to this function, then updates state.
     *
     * @param {Object} newItem
     */
    addItem(newItem) {
        this.setState({
            items: this.state.items.concat(newItem)
        });
    }

    /**
     * Toggles the `completed` boolean inside the item and then triggers an
     * update of state to re-render the relevant DOM nodes.
     *
     * @param {Object} item
     */
    toggleCompleted(item) {
        item.completed = !item.completed;

        this.setState({
            items: this.state.items
        });
    }
}

export default App;
