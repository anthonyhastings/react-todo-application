import React from 'react';
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
     * @return {Object}
     */
    render() {
        return (
            <div>
                <h1>React: Todo List</h1>

                <TodoForm onAddItem={this.addItem} />

                <TodoList items={this.state.items}
                          onToggleCompleted={this.toggleCompleted}
                          onDeleteItem={this.deleteItem} />
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
     * Toggles the `completed` boolean inside the item and then triggers an
     * update of state to re-render the relevant DOM nodes.
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

export default App;
