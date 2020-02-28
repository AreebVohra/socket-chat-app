import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MessageText, MessageImage, Time } from 'react-native-gifted-chat';

const ChatBubbleWithReply = (props) => {
  const { position, children, currentMessage } = props;
  const reply_header = (position == 'right') ? `you replied to ${currentMessage.reply.reply_to}` : `${currentMessage.user.name} replied to you`;
  const reply_to_color = (position == 'right') ? '#303030' : '#303030';
  const reply_to_msg_color = (position == 'right') ? '#303030' : '#303030';

  return (
    <View style={styles[`${position}_container`]}>
      <View style={styles[`${position}_wrapper`]}>
        <View style={styles.reply_to_container}>
          <Text style={[styles.reply_to, { color: reply_to_color }]}>{reply_header}:</Text>
          <View style={styles.reply_to_msg_container}>
            <Text style={[styles.reply_to_msg, { color: reply_to_msg_color }]}>"{currentMessage.reply.reply_to_msg}"</Text>
          </View>
        </View>
        <MessageText textStyle={{ left: { color: '#303030' }, right: { color: '#303030' } }} {...props} />
        {
          currentMessage.image &&
          <MessageImage {...props} />
        }
        {children}
        <Time {...props} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  left_container: {
    flex: 1,
    alignItems: 'flex-start',
  },
  left_wrapper: {
    borderRadius: 8,
    backgroundColor: '#ffffff',
    marginRight: 60,
    minHeight: 20,
    justifyContent: 'flex-end',
  },
  right_container: {
    flex: 1,
    alignItems: 'flex-end',
  },
  right_wrapper: {
    borderRadius: 15,
    backgroundColor: '#dcf8c6',
    marginLeft: 60,
    minHeight: 20,
    justifyContent: 'flex-end',
  },
  reply_to_container: {
    marginRight: 5,
    marginLeft: 5,
    marginTop: 5
  },
  reply_to: {
    fontSize: 11,
    marginHorizontal: 5,
  },
  reply_to_msg_container: {
    marginHorizontal: 5,
    padding: 5,
    marginTop: 3
  },
  reply_to_msg: {
    fontStyle: 'italic',
    fontSize: 14
  }
});

export default ChatBubbleWithReply;