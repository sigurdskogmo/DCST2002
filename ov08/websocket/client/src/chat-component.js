// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import chatService from './chat-service';
import { Alert, Button, Card, Form, Row, Column } from './widgets';

export class Chat extends Component {
  subscription = null;
  connected = false;
  username = '';
  message = { user: '', text: ''};
  messages = [['Ole', 'Hei Per! Hvordan går det?']];
  connectedUsers = [];

  render() {
    return (
      <Card title={`Chat (${this.connected ? 'Connected' : 'Not Connected'})`}>
        <Card title="Connected users">
          {this.connectedUsers.map(user => <div>{user}</div>)}
        </Card>
        <Card title="Messages">
          {this.messages.map(message => <div>{message[0]}: {message[1]}</div>)}
        </Card>
        <Card title="New message">
          <Row>
            <Column width={8}>
              <Form.Input placeholder="Username" onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  this.username = event.currentTarget.value;        // Set username locally
                  chatService.send(this.username);                  // Send message object to server
                }
              }}/>
            </Column>
            <Column width={4}>
            {
              this.username === '' 
              ?
              <Button.Danger>
                Disconnected
              </Button.Danger>
              :
              <Button.Success>
                Connected
              </Button.Success>
            }
            </Column>
          </Row>
          <Row>
            <Column width={12}>
              <Form.Input placeholder="Message" onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  if (this.username !== '') {
                    this.message.text = event.currentTarget.value;
                    this.message.user = this.username;
                    chatService.send(this.message);
                    event.currentTarget.value = ''; // Clear the input field after sending message
                  } else {
                    alert("Enter a username first!")
                  }
                }
              }}/>
            </Column>
          </Row>
        </Card>
        <div>{this.connected ? 'Connected' : 'Not connected'}</div>
      </Card>
    );
  }

  mounted() {
    // Subscribe to chatService to receive events from Chat server in this component
    this.subscription = chatService.subscribe();

    // Called when the subscription is ready
    this.subscription.onopen = () => {
      this.connected = true;
    };

    // Called on incoming message
    this.subscription.onmessage = (message) => {
      if (message.user === undefined) {
        this.connectedUsers.push(message);
      }
      else if (message.text !== '' && message.user !== '') {
        this.messages.push([message.user, message.text]);
      }
      console.log(message);
    };

    // Called if connection is closed
    this.subscription.onclose = (code, reason) => {
      this.connected = false;
      Alert.danger('Connection closed with code ' + code + ' and reason: ' + reason);
    };

    // Called on connection error
    this.subscription.onerror = (error) => {
      this.connected = false;
      Alert.danger('Connection error: ' + error.message);
    };
  }

  // Unsubscribe from chatService when component is no longer in use
  beforeUnmount() {
    chatService.unsubscribe(this.subscription);
  }
}
