import React, { Component } from 'react';
import { View, Text } from 'react-native';
import io from 'socket.io-client';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-community/async-storage';

const USER_ID = '@userId';

export default class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      userId: null
    };

    this.determineUser = this.determineUser.bind(this);
    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.onSend = this.onSend.bind(this);
    this._storeMessages = this._storeMessages.bind(this);

    this.socket = io('http://192.168.0.34:3000');
    this.socket.on('message', this.onReceivedMessage);
    this.determineUser();
  }

  /**
   * When a user joins the chatroom, check if they are an existing user.
   * If they aren't, then ask the server for a userId.
   * Set the userId to the component's state.
   */
  determineUser() {
    AsyncStorage.getItem(USER_ID)
      .then((userId) => {
        // If there isn't a stored userId, then fetch one from the server.
        if (!userId) {
          this.socket.emit('userJoined', null);
          this.socket.on('userJoined', (userId) => {
            AsyncStorage.setItem(USER_ID, userId);
            this.setState({ userId });
          });
        } else {
          this.socket.emit('userJoined', userId);
          this.setState({ userId });
        }
      })
      .catch((e) => alert(e));
  }

  // Event listeners
  /**
   * When the server sends a message to this.
   */
  onReceivedMessage(messages) {
    this._storeMessages(messages);
  }

  /**
   * When a message is sent, send the message to the server
   * and store it in this component's state.
   */
  onSend(messages = []) {
    this.socket.emit('message', messages[0]);
    this._storeMessages(messages);
  }

  // Helper functions
  _storeMessages(messages) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }

  getColor(username) {
    let sumChars = 0;
    for (let i = 0; i < username.length; i++) sumChars += username.charCodeAt(i)

    const colors = ['#e67e22', '#2ecc71', '#3498db', '#8e44ad', '#e74c3c', '#1abc9c', '#2c3e50',];
    return colors[sumChars % colors.length];
  }

  componentDidMount = async () => {

  }

  renderBubble = props => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: { color: 'white' },
          left: { color: 'white' },
        }}
        wrapperStyle={{
          left: { backgroundColor: '#2ecc71' }
        }}

      />
    )
  }

  render() {
    var user = {
      _id: this.state.userId || -1,
      name: 'user',
      avatar: require('../../assets/user.png'),
    };
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={user}
        renderBubble={this.renderBubble}
        renderUsernameOnMessage={true}
        timeTextStyle={{ left: { color: 'white' } }}
        scrollToBottom={true}
      />
    );
  }
}