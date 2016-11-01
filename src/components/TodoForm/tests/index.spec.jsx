import React from 'react';
import {mount} from 'enzyme';
import TodoForm from '../index';

describe('TodoForm component', function() {
    beforeEach(function() {
        this.sinonSandbox = sinon.sandbox.create();
        this.addItem = this.sinonSandbox.stub();

        this.wrapper = mount(<TodoForm onAddItem={this.addItem} />);
    });

    afterEach(function() {
        this.sinonSandbox.restore();
    });

    it('should render a label, input, button and error field', function() {
        expect(this.wrapper.find('.todo-list__form-label').length).to.equal(1);
        expect(this.wrapper.find('.todo-list__form-input').length).to.equal(1);
        expect(this.wrapper.find('.todo-list__form-button').length).to.equal(1);
        expect(this.wrapper.find('.todo-list__form-error').length).to.equal(1);
    });

    it('form should fire listener upon submission', function() {
        this.sinonSandbox.stub(TodoForm.prototype, 'onSubmit');

        let wrapper = mount(<TodoForm onAddItem={this.addItem} />);

        expect(TodoForm.prototype.onSubmit.callCount).to.equal(0);
        wrapper.find('.todo-list__form').simulate('submit');
        expect(TodoForm.prototype.onSubmit.callCount).to.equal(1);
    });

    it('input should fire listener when change is detected', function() {
        this.sinonSandbox.stub(TodoForm.prototype, 'onInputChanged');

        let wrapper = mount(<TodoForm onAddItem={this.addItem} />);

        expect(TodoForm.prototype.onInputChanged.callCount).to.equal(0);
        wrapper.find('.todo-list__form-input').simulate('change');
        expect(TodoForm.prototype.onInputChanged.callCount).to.equal(1);
    });

    it('input value should reflect state', function() {
        let input = this.wrapper.find('.todo-list__form-input');
        let initialValue = input.prop('value');
        let testValue = 'Hello World';

        expect(initialValue).to.not.equal(testValue);
        this.wrapper.setState({text: testValue});
        expect(input.prop('value')).to.equal(testValue);
    });

    it('span should reflect error messages when present', function() {
        let form = this.wrapper.find('.todo-list__form');
        let span = this.wrapper.find('.todo-list__form-error');

        expect(span.props().children.length).to.equal(0);

        this.wrapper.setState({text: ' '});
        form.simulate('submit');

        expect(span.props().children.length).to.be.above(0);

        this.wrapper.setState({text: 'Pick up milk'});
        form.simulate('submit');

        expect(span.props().children.length).to.equal(0);
    });

    it('setDirty() should flip boolean as required', function() {
        this.wrapper.setState({dirty: false});
        expect(this.wrapper.state('dirty')).to.equal(false);

        this.wrapper.instance().setDirty();
        expect(this.wrapper.state('dirty')).to.equal(true);

        // Checking a second call doesn't flip the boolean back to false.
        this.wrapper.instance().setDirty();
        expect(this.wrapper.state('dirty')).to.equal(true);
    });

    it('resetState() should bring state back to default values', function() {
        let initialState = this.wrapper.state();
        let newState = this.wrapper.setState({text: 'world'}).state();

        this.wrapper.instance().resetState();

        expect(initialState).to.not.equal(newState);
        expect(this.wrapper.state()).to.deep.equal(initialState);
    });

    it('onInputChanged() should mark field as dirty and save text', function() {
        let input = this.wrapper.find('.todo-list__form-input');
        let testValue = 'Nwij21n';

        expect(this.wrapper.state('dirty')).to.equal(false);
        expect(this.wrapper.state('text')).to.equal('');
        input.simulate('change', {target: {value: testValue}});
        expect(this.wrapper.state('dirty')).to.equal(true);
        expect(this.wrapper.state('text')).to.equal(testValue);
    });

    it('setValidity() should validate text state correctly', function() {
        expect(this.wrapper.state('validity')).to.equal(null);

        this.wrapper.setState({text: ' '});
        let invalidCall = this.wrapper.instance().setValidity();

        expect(invalidCall).to.equal(false);
        expect(this.wrapper.state('validity').valid).to.equal(false);

        this.wrapper.setState({text: 'Hello'});
        let validCall = this.wrapper.instance().setValidity();

        expect(validCall).to.equal(true);
        expect(this.wrapper.state('validity').valid).to.equal(true);
    });

    it('onSubmit() should call higher order component when valid', function() {
        let form = this.wrapper.find('.todo-list__form');
        let testValue = 'Pick up milk.';

        expect(this.addItem.callCount).to.equal(0);
        this.wrapper.setState({text: ' ', dirty: false});
        form.simulate('submit');
        expect(this.addItem.callCount).to.equal(0);
        expect(this.wrapper.state('dirty')).to.equal(true);
        expect(this.wrapper.state('text')).to.equal(' ');

        this.wrapper.setState({text: testValue});
        form.simulate('submit');
        expect(this.addItem.callCount).to.equal(1);
        expect(this.addItem.lastCall.args[0]).to.equal(testValue);
        expect(this.wrapper.state('text')).to.equal('');
    });
});
