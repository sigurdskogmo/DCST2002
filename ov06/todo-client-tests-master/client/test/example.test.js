// @flow

import * as React from 'react';
import { shallow } from 'enzyme';
import { Button, Form } from '../src/widgets';
import { TaskList } from '../src/task-components';
import { taskService, type Task } from '../src/task-service';
import { NavLink } from 'react-router-dom';

describe('Button.Light widget tests', () => {
  test('Button.Light widget draws correctly with small property set', () => {
    // $FlowExpectedError
    const wrapper = shallow(<Button.Light small>Text</Button.Light>);

    expect(
      wrapper.containsMatchingElement(
        <button type="button" className="btn btn-light btn-sm py-0">
          Text
        </button>
      )
    ).toEqual(true);
  });

  test('Button.Light onClick property works', () => {
    let buttonClicked = false;
    const wrapper = shallow(
      <div>
        <Button.Light onClick={() => (buttonClicked = true)}>Text</Button.Light>
        <Button.Danger onClick={() => {}}></Button.Danger>
      </div>
    );

    expect(buttonClicked).toEqual(false);
    wrapper.find(Button.Light).simulate('click');
    expect(buttonClicked).toEqual(true);
  });
});

describe('Form.Input widget tests', () => {
  test('Form.Input widget draws correctly', () => {
    // $FlowExpectedError
    const wrapper = shallow(<Form.Input type="text" />);

    expect(wrapper.containsMatchingElement(<input type="text" />));
  });

  test('Form.Input widget draws correctly after onChange', () => {
    // $FlowExpectedError
    const wrapper = shallow(<Form.Input type="text" value="" />);

    wrapper.simulate('change', { currentTarget: { value: 'test' } });
    expect(wrapper.containsMatchingElement(<input type="text" value="test" />));
  });
});

jest.mock('../src/task-service', () => {
  class TaskService {
    getAll() {
      /* return new Promise(resolve => resolve()) */
      return Promise.resolve([
        { id: 1, title: 'Møt opp på forelesning', done: false },
        { id: 2, title: 'Gjør øving', done: false },
      ]);
    }
  }
});

describe('TaskList tests', () => {
  test('TaskList draws correctly', () => {
    // $FlowExpectedError
    const wrapper = shallow(<TaskList />);

    expect(
      wrapper.containsMatchingElement(<NavLink to={'/tasks/1'}>Møt opp på forelesning</NavLink>)
    );
    expect(wrapper.containsMatchingElement(<NavLink to={'/tasks/2'}>Gjør øving</NavLink>));
  });
});
