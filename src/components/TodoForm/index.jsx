import React from 'react';
require('./styles/index.scss');

class TodoForm extends React.Component {
    /**
     * Defining initial state and binding functions on the prototype chain
     * directly to the component with their context correctly set.
     *
     * @param {Object} props
     */
    constructor(props) {
        super(props);

        this.state = {
            dirty: false,
            text: '',
            validity: null
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onInputChanged = this.onInputChanged.bind(this);
    }

    /**
     * Creates and returns a tree of React components that will eventually be
     * rendered into HTML.
     *
     * @return {React.Element}
     */
    render() {
        return (
            <form className="todo-list__form" ref="itemForm" onSubmit={this.onSubmit}>
                <label className="todo-list__form-label"
                       htmlFor="itemInput">
                    Enter item text:
                </label>

                <input id="itemInput"
                       className="todo-list__form-input"
                       type="text"
                       ref={(input) => {
                           if (input !== null) {
                               this.inputElement = this;
                               input.focus();
                           }
                       }}
                       onChange={this.onInputChanged}
                       value={this.state.text} />

                <button className="todo-list__form-button"
                        type="submit">
                    Add Item
                </button>

                <span className="todo-list__form-error">
                    {(this.state.dirty
                      && this.state.validity
                      && this.state.validity.valid === false) ?
                         this.state.validity.errorMessage : ''
                    }
                </span>
            </form>
        );
    }

    /**
     * Updates validity state after examining text state to see if it is
     * really valid, then returns accordingly.
     *
     * NOTE: This logic relates to data, and is probably best suited
     * running in a third-party data library such as a Backbone model.
     *
     * @return {Boolean}
     */
    setValidity() {
        let stateEntry = {validity: null};

        if (this.state.text.trim().length <= 0) {
            stateEntry.validity = {
                valid: false,
                errorMessage: 'Please enter a string.'
            };
        } else {
            stateEntry.validity = {
                valid: true,
                errorMessage: null
            };
        }

        this.setState(stateEntry);
        return stateEntry.validity.valid;
    }

    /**
     * Updates state to mark the component as dirty and used.
     */
    setDirty() {
        if (this.state.dirty === false) {
            this.setState({dirty: true});
        }
    }

    /**
     * Updates state to mark the component as clean and blank.
     */
    resetState() {
        this.setState({
            dirty: false,
            text: '',
            validity: null
        });
    }

    /**
     * Whenever the input is changed we mark it as dirty and remove any former
     * validation errors in the state, then store the new value to the state.
     *
     * @param {SyntheticEvent} event - Cross-browser wrapper for native event.
     */
    onInputChanged(event) {
        this.setDirty();
        this.setState({
            text: event.target.value,
            validity: null
        });
    }

    /**
     * Whenever the form is submitted we prevent default functionality and
     * check that the state is valid. If so, call the function passed down
     * from the parent component in order to store the new item.
     *
     * @param {SyntheticEvent} event - Cross-browser wrapper for native event.
     */
    onSubmit(event) {
        event.preventDefault();

        this.setDirty();

        if (this.setValidity()) {
            this.props.onAddItem({
                id: Date.now(),
                text: this.state.text,
                completed: false
            });

            this.resetState();
        }
    }
}

/**
 * Denoting which props this component should expect along with their types.
 * This allows react to validate all props used when creating a component.
 *
 * @type {Object}
 */
TodoForm.propTypes = {
    onAddItem: React.PropTypes.func.isRequired
};

export default TodoForm;
