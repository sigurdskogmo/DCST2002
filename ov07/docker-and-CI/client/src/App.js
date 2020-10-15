import * as React from 'react';
import { Component } from 'react-simplified';
import { Button, Card, Form } from './widgets';
import taskService from './task-service'; 

class App extends Component {
    command: string = '';

    stdout: string = '';
    stderr: string = '';
    code: number = 0;

    render() {
        return (
            <div>
                <Card title="app.js">
                    <Form.Textarea 
                        type="text"
                        value={this.command}
                        onChange={(event) => {
                            this.command = event.currentTarget.value;
                        }}
                    />
                    <Button.Success
                        onClick={() => {
                            taskService.cmd(this.command)
                                .then((response) => {
                                    this.stdout = response.stdout;
                                    this.stderr = response.stderr;
                                    this.code = response.code;
                                })
                                .finally(() => {
                                    console.log(this.stdout, this.stderr, this.code)
                                })
                        }}
                    >
                        Run
                    </Button.Success>
                </Card>
                <Card title="Standard output">
                    {this.stdout}
                </Card>
                <Card title="Standard error">
                    {this.stderr}
                </Card>
                <Card title={`Exit status: `}>
                    {this.code}
                </Card>
            </div>
        )
    }
}

export default App;
