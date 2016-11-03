import React from 'react';
import Immutable from 'immutable';
import {shallow} from 'enzyme';
import TodoList from '../index';

describe('TodoList component', function() {
    beforeEach(function() {
        this.todos = Immutable.fromJS([
            {id: '1475673921806', text: 'Test Entry #1', completed: true},
            {id: '1475673936180', text: 'Test Entry #2', completed: false},
            {id: '1475673946340', text: 'Test Entry #3', completed: false}
        ]);

        this.sinonSandbox = sinon.sandbox.create();
        this.deleteItem = this.sinonSandbox.stub();
        this.updateItem = this.sinonSandbox.stub();

        this.wrapper = shallow(<TodoList todos={this.todos}
                                         onDeleteItem={this.deleteItem}
                                         onUpdateItem={this.updateItem} />);
    });

    afterEach(function() {
        this.sinonSandbox.restore();
    });

    it('should render the right amount of list items', function() {
        let renderedListItems = this.wrapper.find('.todo-list__list-item');
        let firstItemsText = renderedListItems.first().text();

        expect(renderedListItems.length).to.equal(this.todos.size);
        expect(firstItemsText.indexOf(this.todos.first().get('text'))).to.be.above(-1);
    });

    it('should output correct overall count', function() {
        let renderedCount = this.wrapper.find('.todo-list__count');

        expect(renderedCount.text()).to.include(`${this.todos.size} item(s).`);
    });

    it('delete button should trigger supplied click handler when button is clicked', function() {
        let deleteButton = this.wrapper.find('[data-action="delete"]').first();

        expect(this.deleteItem.callCount).to.equal(0);
        deleteButton.simulate('click');
        expect(this.deleteItem.callCount).to.equal(1);
    });

    it('toggle button should trigger supplied click handler when button is clicked', function() {
        let toggleButton = this.wrapper.find('[data-action="toggle"]').first();

        expect(this.updateItem.callCount).to.equal(0);
        toggleButton.simulate('click');
        expect(this.updateItem.callCount).to.equal(1);
    });
});
