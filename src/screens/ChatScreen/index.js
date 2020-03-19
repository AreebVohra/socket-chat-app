import React, { Component } from 'react';
import { TouchableOpacity, Clipboard, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import ReplyToFooter from '../../components/ReplyChatFooter';
import ImageToFooter from '../../components/ImageChatFooter';
import ChatBubbleWithReply from '../../components/ChatBubbleWithReply';
import { Endpoints, BaseURL } from '../../constants/Endpoints';

import io from 'socket.io-client';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import ImagePicker from 'react-native-image-picker';
import { GiftedChat, Bubble, Message, Day } from 'react-native-gifted-chat';
import { HeaderButtons, HeaderButton, Item } from 'react-navigation-header-buttons';

const IoniconsHeaderButton = passMeFurther => (
  <HeaderButton {...passMeFurther} IconComponent={MaterialCommunityIcons} iconSize={20} color="white" />
);

const { width, height } = Dimensions.get('window');

export default class ChatScreen extends Component {
  static navigationOptions = {
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
        <Item title="reply" iconName="reply" />
        <Item title="dots-vertical" iconName="dots-vertical" />
      </HeaderButtons>
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      userId: null,
      username: '',
      userImage: '',
      image: null,
      show_reply_to_footer: false,
      show_image_to_footer: false,
      reply: {
        reply_msg_id: null,
        reply_to: null,
        reply_to_msg: null
      },
    };

    this.determineUser = this.determineUser.bind(this);
    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.onSend = this.onSend.bind(this);
    this._storeMessages = this._storeMessages.bind(this);

    this.socket = io(BaseURL);
    this.socket.on('message', this.onReceivedMessage);
    this.determineUser();
  }

  componentDidMount = async () => {
    AsyncStorage.multiGet(['@username', '@userID', '@userImage'])
      .then(async response => {
        await this.setState({
          username: response[0][1],
          userId: response[1][1],
          userImage: response[2][1]
        })
      })
  }

  componentWillUnmount() {
    this.socket.removeEventListener('message')
  }

  uploadImage = () => {
    const options = {
      title: 'Select Option',
      maxHeight: 2000,
      // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      // storageOptions: {
      //   skipBackup: true,
      //   path: 'images',
      // },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = 'data:image/jpeg;base64,' + response.data;
        this.setState({ image: source, show_image_to_footer: true });
      }
    });
  }

  determineUser() {
    AsyncStorage.getItem('@userID')
      .then((userId) => {
        this.socket.emit('userJoined', userId, this.props.navigation.getParam('selected'));
        this.setState({ userId });
      })
      .catch((e) => alert(e));
  }

  onReceivedMessage(messages) { this._storeMessages(messages); }

  onSend(messages = []) {
    const { reply, image } = this.state;

    const new_msg = {
      ...messages[0],
      reply,
      image
    }

    this.socket.emit('message', new_msg, this.props.navigation.getParam('selected'));
    this._storeMessages(new_msg);
    this.closeReplyToFooter();
    this.closeImageToFooter();
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
        textStyle={{ right: { color: '#303030' }, left: { color: '#303030' } }}
        wrapperStyle={{
          left: { backgroundColor: '#ffffff', borderRadius: 8 },
          right: { backgroundColor: '#dcf8c6', borderRadius: 8 }
        }}

      />
    )
  }

  _action = () => { }

  render() {
    var user = {
      _id: this.state.userId,
      name: this.state.username,
      avatar: Endpoints.userImage + this.state.userImage
    };
    const { messages } = this.state;
    return (
      <ImageBackground
        resizeMode="cover"
        style={{ width, height: '100%' }}
        source={require('../../assets/background.png')}>
        <GiftedChat
          messages={messages}
          onSend={this.onSend}
          user={user}
          renderUsernameOnMessage={true}
          timeTextStyle={{ left: { color: '#aaa' }, right: { color: '#aaa' } }}
          scrollToBottom={true}
          renderChatFooter={this.renderChatFooter}
          onLongPress={this.onLongPress}
          renderActions={this.renderActions}
          renderMessage={this.renderMessage}
          renderDay={this.renderDay}
        />
      </ImageBackground>
    );
  }

  renderActions = () => {
    return (
      <TouchableOpacity style={styles.uploadImage} onPress={this.uploadImage}>
        <Feather name='image' size={25} color='#0084ff' />
      </TouchableOpacity>
    )
  }

  renderDay(props) {
    return (
      <Day
        {...props}
        textStyle={{ color: 'black' }}
        containerStyle={{
          backgroundColor: '#e1f3fb',
          padding: 5, width: '30%',
          alignSelf: 'center',
          borderRadius: 8
        }}
      />
    )
  }

  getColor(username) {
    let sumChars = 0;
    for (let i = 0; i < username.length; i++) sumChars += username.charCodeAt(i)

    const colors = ['#e67e22', '#2ecc71', '#3498db', '#8e44ad', '#e74c3c', '#1abc9c', '#2c3e50',];
    return colors[sumChars % colors.length];
  }


  renderMessage = (msg) => {
    const { reply_msg_id, reply_to, reply_to_msg } = msg.currentMessage.reply;
    const renderBubble = (reply_msg_id && reply_to && reply_to_msg) ? this.renderPreview : this.renderBubble;

    let modified_msg = {
      ...msg,
      renderBubble
    };

    return <Message {...modified_msg} />
  }

  renderPreview = (bubbleProps) => {
    return (
      <ChatBubbleWithReply {...bubbleProps} />
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
            reply: {
              reply_msg_id: message._id,
              reply_to: message.user.name,
              reply_to_msg: message.text
            },
            show_reply_to_footer: true,
          });
          break;
      }
    })

  }

  renderChatFooter = () => {
    const { show_image_to_footer, show_reply_to_footer, reply, image } = this.state;
    if (show_reply_to_footer) { // only render if it's set to visible
      return (
        <ReplyToFooter
          reply_to={reply.reply_to}
          reply_to_msg={reply.reply_to_msg}
          closeFooter={this.closeReplyToFooter} />
      );
    } else if (show_image_to_footer) {
      return (
        <ImageToFooter
          imageSend={image}
          sendButtom={this.closeImageToFooter}
          closeFooter={this.closeImageToFooter} />
      );
    } else return null;
  }

  closeReplyToFooter = () => {
    this.setState({
      show_reply_to_footer: false,
      reply: {
        reply_msg_id: null,
        reply_to: null,
        reply_to_msg: null
      }
    });
  }

  closeImageToFooter = () => {
    this.setState({
      show_image_to_footer: false,
      image: null
    });
  }
}

const styles = StyleSheet.create({
  uploadImage: {
    padding: 10,
    paddingRight: 0
  }
})