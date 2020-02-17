import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Clipboard, StyleSheet, Image } from 'react-native';
import io from 'socket.io-client';
import { GiftedChat, Bubble, Message, MessageImage } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-community/async-storage';
import ReplyToFooter from '../../components/ReplyChatFooter';
import ChatBubbleWithReply from '../../components/ChatBubbleWithReply';
import Feather from 'react-native-vector-icons/Feather'
import ImagePicker from 'react-native-image-picker';

const USER_ID = '@userId';

export default class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      userId: null,
      username: '',
      avatarSource: null,
      show_reply_to_footer: false,
      reply_msg_id: null,
      reply_to: null,
      reply_to_msg: null
    };

    this.determineUser = this.determineUser.bind(this);
    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.onSend = this.onSend.bind(this);
    this._storeMessages = this._storeMessages.bind(this);

    this.socket = io('http://192.168.0.34:3000');
    this.socket.on('message', this.onReceivedMessage);
    this.determineUser();
  }

  componentDidMount = async () => {
    const username = await AsyncStorage.getItem('@username')
    this.setState({ username })
  }

  componentWillUnmount() {
    this.socket.removeEventListener('message')
  }

  uploadImage = () => {
    const options = {
      title: 'Select Avatar',
      // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      // else if (response.customButton) {
      //   console.log('User tapped custom button: ', response.customButton);
      // } 
      else {
        const source = { uri: response.uri };
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: response.uri,
        });
      }
    });
  }

  determineUser() {
    AsyncStorage.getItem(USER_ID)
      .then((userId) => {
        if (!userId) {
          this.socket.emit('userJoined', null);
          this.socket.on('userJoined', (userId) => {
            AsyncStorage.setItem(USER_ID, userId);
            this.setState({ userId });
          });
        } else {
          this.socket.emit('userJoined', userId, this.props.navigation.getParam('selected'));
          this.setState({ userId });
        }
      })
      .catch((e) => alert(e));
  }

  onReceivedMessage(messages) { this._storeMessages(messages); }

  onSend(messages = []) {
    const { reply_msg_id, reply_to, reply_to_msg } = this.state;
    messages[0].reply = { reply_msg_id, reply_to, reply_to_msg }
    messages[0].image = this.state.avatarSource
    // this.socket.emit('message', messages[0], this.props.navigation.getParam('selected'));
    this._storeMessages(messages);
    this.closeReplyToFooter()
  }

  _storeMessages(messages) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
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
      name: this.state.username,
      avatar: require('../../assets/user.png'),
    };
    const { messages, reply_to, reply_to_msg } = this.state;
    return (
      <GiftedChat
        messages={messages}
        onSend={this.onSend}
        user={user}
        renderUsernameOnMessage={true}
        timeTextStyle={{ left: { color: 'white' } }}
        scrollToBottom={true}
        renderBubble={this.renderBubble}
        renderChatFooter={this.renderChatFooter}
        onLongPress={this.onLongPress}
        renderActions={() => (
          <TouchableOpacity style={styles.uploadImage} onPress={this.uploadImage}>
            <Feather name='image' size={25} color='#0084ff' />
          </TouchableOpacity>
        )}
      // renderMessage={this.renderMessage}
      />
    );
  }

  getColor(username) {
    let sumChars = 0;
    for (let i = 0; i < username.length; i++) sumChars += username.charCodeAt(i)

    const colors = ['#e67e22', '#2ecc71', '#3498db', '#8e44ad', '#e74c3c', '#1abc9c', '#2c3e50',];
    return colors[sumChars % colors.length];
  }


  renderMessage = (msg) => {
    const { reply_to, reply_to_msg } = this.state;
    const renderBubble = (reply_to && reply_to_msg) ? this.renderPreview : null;

    let modified_msg = {
      ...msg,
      renderBubble
    };

    return <Message {...modified_msg} />
  }

  renderPreview = (bubbleProps) => {
    const { reply_to, reply_to_msg } = this.state;
    return (
      <ChatBubbleWithReply reply_to={reply_to} reply_to_msg={reply_to_msg} {...bubbleProps} />
    );
  }

  onLongPress = (context, message) => {
    const options = ['Copy Text', 'Reply Message', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    context.actionSheet().showActionSheetWithOptions({
      options,
      cancelButtonIndex
    }, (buttonIndex) => {
      switch (buttonIndex) {
        case 0:
          Clipboard.setString(message.text);
          break;
        case 1:
          this.setState({
            reply_msg_id: message._id,
            reply_to: message.user.name,
            reply_to_msg: message.text,
            show_reply_to_footer: true,
          });
          break;
      }
    })

  }

  renderChatFooter = () => {
    const { show_reply_to_footer, reply_to, reply_to_msg } = this.state;
    if (show_reply_to_footer) { // only render if it's set to visible
      return (
        <ReplyToFooter
          reply_to={reply_to}
          reply_to_msg={reply_to_msg}
          closeFooter={this.closeReplyToFooter} />
      );
    } else return null;
  }

  closeReplyToFooter = () => {
    this.setState({
      show_reply_to_footer: false,
      reply_to: null,
      reply_to_msg: null
    });
  }
}

const styles = StyleSheet.create({
  uploadImage: {
    padding: 10,
    paddingRight: 0
  }
})