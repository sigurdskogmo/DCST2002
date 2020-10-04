// @flow

import * as React from 'react';
import { TaskList, TaskNew, TaskDetails, TaskEdit } from '../src/task-components';
import { type Task } from '../src/task-service';
import { shallow } from 'enzyme';
import { Form, Button, Column } from '../src/widgets';
import { NavLink } from 'react-router-dom';

jest.mock('../src/task-service', () => {
  class TaskService {
    get() {
      return Promise.resolve([{ id: 1, title: 'Les leksjon', done: false, description: 'TEST' }]);
    }

    getAll() {
      return Promise.resolve([
        { id: 1, title: 'Les leksjon', done: false },
        { id: 2, title: 'Møt opp på forelesning', done: false },
        { id: 3, title: 'Gjør øving', done: false },
      ]);
    }

    update(id: number, title: string, done: boolean, description: string) {
      return Promise.resolve([{ id: 1, title: 'Les leksjon', done: false, description: 'TEST' }]);
    }

    create(title: string) {
      return Promise.resolve(4); // Same as: return new Promise((resolve) => resolve(4));
    }

    delete(id: number) {
      return Promise.resolve();
    }
  }
  return new TaskService();
});

describe('Task component tests', () => {
  test('TaskList draws correctly', (done) => {
    const wrapper = shallow(<TaskList />);

    // Wait for events to complete
    setTimeout(() => {
      expect(
        wrapper.containsAllMatchingElements([
          <NavLink to="/tasks/1">Les leksjon</NavLink>,
          <NavLink to="/tasks/2">Møt opp på forelesning</NavLink>,
          <NavLink to="/tasks/3">Gjør øving</NavLink>,
        ])
      ).toEqual(true);
      done();
    });
  });

  test('TaskList correctly sets location on new', (done) => {
    const wrapper = shallow(<TaskList />);

    wrapper.find(Button.Success).simulate('click');
    // Wait for events to complete
    setTimeout(() => {
      expect(location.hash).toEqual('#/tasks/new');
      done();
    });
  });

  test('TaskDetails correctly sets location on edit', (done) => {
    const wrapper = shallow(<TaskDetails match={{ params: { id: 1 } }} />);

    wrapper.find(Button.Success).simulate('click');
    // Wait for events to complete
    setTimeout(() => {
      expect(location.hash).toEqual('#/tasks/1/edit');
      done();
    });
  });

  test('TaskNew correctly sets location on create', (done) => {
    const wrapper = shallow(<TaskNew />);

    wrapper.find(Form.Input).simulate('change', { currentTarget: { value: 'Kaffepause' } });
    // $FlowExpectedError
    expect(wrapper.containsMatchingElement(<Form.Input value="Kaffepause" />)).toEqual(true);

    wrapper.find(Button.Success).simulate('click');
    // Wait for events to complete
    setTimeout(() => {
      expect(location.hash).toEqual('#/tasks/4');
      done();
    });
  });

  test('TaskNew draws correctly', (done) => {
    const wrapper = shallow(<TaskNew title="Kødd" />);

    wrapper.find(Form.Input).simulate('change', { currentTarget: { value: 'Matpause' } });
    wrapper.find(Button.Success).simulate('click');

    // $FlowExpectedError
    setTimeout(() => {
      expect(wrapper.containsMatchingElement(<Form.Input value="Matpause" />)).toEqual(true);
      done();
    });
  });

  test('TaskEdit correctly sets location on edit', (done) => {
    const wrapper = shallow(<TaskEdit match={{ params: { id: 1 } }} />);

    wrapper.find(Form.Input).simulate('change', { currentTarget: { value: 'Updated task!' } });
    // $FlowExpectedError
    expect(wrapper.containsMatchingElement(<Form.Input value="Updated task!" />)).toEqual(true);

    wrapper.find(Button.Success).simulate('click');
    // Wait for events to complete
    setTimeout(() => {
      expect(location.hash).toEqual('#/tasks');
      done();
    });
  });

  test('TaskEdit delete correctly sets location on edit', (done) => {
    const wrapper = shallow(<TaskEdit match={{ params: { id: 1 } }} />);

    wrapper.find(Button.Danger).simulate('click');

    setTimeout(() => {
      expect(location.hash).toEqual('#/tasks/');
      done();
    });
  });

  test('TaskDetails draws correctly', (done) => {
    const wrapper = shallow(<TaskDetails match={{ params: { id: 1 } }} />);

    setTimeout(() => {
      expect(
        wrapper.containsAllMatchingElements([<Column>Les leksjon</Column>, <Column>TEST</Column>])
      ).toEqual(true);
    });
    done();
  });

  test('TaskDetails draws correctly with snapshot', (done) => {
    const wrapper = shallow(<TaskDetails match={{ params: { id: 1 } }} />);

    setTimeout(() => {
      expect(wrapper).toMatchSnapshot();
    });
    done();
  });
});
