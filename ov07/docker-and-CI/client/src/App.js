import * as React from 'react';
import { Button, Card, Form } from './widgets';

const App = () => {
    return (
        <div>
            <Card title="app.js">
                <Form.Textarea />
                <Button.Success
                    onClick={() => alert("RUN")}
                >
                    Run
                </Button.Success>
            </Card>
            <Card title="Standard output">

            </Card>
            <Card title="Standard error">

            </Card>
            <Card title={`Exit status: `}>

            </Card>
        </div>
    )
}

export default App;
