import React from 'react';
import {shallow} from 'enzyme';
import TodoList from '../index';

describe('TodoList component', function() {
    beforeEach(function() {
        this.items = [
            {id: 1475673921806, text: 'Test Entry #1', completed: true},
            {id: 1475673936180, text: 'Test Entry #2', completed: false},
            {id: 1475673946340, text: 'Test Entry #3', completed: false}
        ];

        this.sinonSandbox = sinon.sandbox.create();

        this.toggleCompleted = this.sinonSandbox.stub();

        this.wrapper = shallow(<TodoList items={this.items} onToggleCompleted={this.toggleCompleted} />);
    });

    afterEach(function() {
        this.sinonSandbox.restore();
    });

    it('should render the right amount of list items', function() {
        let renderedListItems = this.wrapper.find('.todo-list__list-item');
        let firstItemsText = renderedListItems.first().text();

        expect(renderedListItems.length).to.equal(this.items.length);
        expect(firstItemsText.indexOf(this.items[0].text)).to.be.above(-1);
    });

    it('should output correct overall count', function() {
        let renderedCount = this.wrapper.find('.todo-list__count');

        expect(renderedCount.text()).to.equal(`${this.items.length} item(s).`);
    });

    it('should trigger supplied click handler when button is clicked', function() {
        let firstButton = this.wrapper.find('button').first();

        expect(this.toggleCompleted.callCount).to.equal(0);
        firstButton.simulate('click');
        expect(this.toggleCompleted.callCount).to.equal(1);
    });
});
