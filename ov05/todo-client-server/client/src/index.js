// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Row, Column, Form, Button } from './widgets';
import taskService, { type Task } from './task-service';

class TaskList extends Component {
  tasks: Task[] = [];

  render() {
    return (
      <Card title="Tasks">
        <Row>
          <Column width={8}>
            <b>Title</b>
          </Column>
          <Column width={2}>
            <b>Done</b>
          </Column>
          <Column width={2}></Column>
        </Row>
        {this.tasks.map((task) => (
          <Row key={task.id}>
            <Column width={8}>{task.title}</Column>
            <Column width={2}>
              <Form.Input
                type="checkbox"
                value={task.done}
                onChange={() => {
                  taskService.toggleDone(task.done, task.id).then(() => {
                    TaskList.instance()?.mounted();
                  });
                }}
              ></Form.Input>
            </Column>
            <Column width={2}>
              <Button.Danger
                onClick={() => {
                  taskService.delete(task.id).then(() => {
                    // Reloads the tasks in the Tasks component
                    TaskList.instance()?.mounted(); // .? meaning: call Tasks.instance().mounted() if Tasks.instance() does not return null
                  });
                }}
              >
                x
              </Button.Danger>
            </Column>
          </Row>
        ))}
      </Card>
    );
  }

  mounted() {
    taskService.getAll().then((tasks) => (this.tasks = tasks));
  }
}

class TaskNew extends Component {
  title = '';

  render() {
    return (
      <Card title="New task">
        <Row>
          <Column width={1}>
            <Form.Label>Title:</Form.Label>
          </Column>
          <Column width={4}>
            <Form.Input
              type="text"
              value={this.title}
              onChange={(event) => (this.title = event.currentTarget.value)}
            ></Form.Input>
          </Column>
        </Row>
        <Button.Success
          onClick={() => {
            taskService.create(this.title).then(() => {
              // Reloads the tasks in the Tasks component
              TaskList.instance()?.mounted(); // .? meaning: call Tasks.instance().mounted() if Tasks.instance() does not return null
              this.title = '';
            });
          }}
        >
          Create
        </Button.Success>
      </Card>
    );
  }
}

const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <>
      <TaskList />
      <TaskNew />
    </>,
    root
  );
