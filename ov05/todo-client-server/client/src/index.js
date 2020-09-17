// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Row, Column, Form, Button } from './widgets';
import taskService, { type Task } from './task-service';

class Tasks extends Component {
  tasks: Task[] = [];

  render() {
    return (
      <Card title="Tasks">
        {this.tasks.map((task) => (
          <Row key={task.id}>
            <Column>{task.title}</Column>
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
              Tasks.instance()?.mounted(); // .? meaning: call Tasks.instance().mounted() if Tasks.instance() does not return null
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
      <Tasks />
      <TaskNew />
    </>,
    root
  );
