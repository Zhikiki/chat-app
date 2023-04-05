import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  Text,
  Alert,
} from 'react-native';
import { useEffect, useState } from 'react';
import {
  GiftedChat,
  Bubble,
  SystemMessage,
  Day,
} from 'react-native-gifted-chat';

// import firebase functions for quering data
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  where,
  DocumentSnapshot,
} from 'firebase/firestore';

// route is prop that is sent through navigation.
// This prop was set to all screen components listed under Stack.Navigator in App.js
// The navigation prop is passed to every component included in the Stack.Navigator in App.js
const Chat = ({ route, navigation, db }) => {
  // the messages state initialization using useState() to send, receive, and display messages
  const [messages, setMessages] = useState([]);

  // We can access the user’s name (from Screen 1 input) via route.params.name
  const { name, color } = route.params;

  /* Setting the message state with useEffect()
  useEffect gets called right after component mounts
  useEffect() attaches listener only once, when component is mounted
  [] - dependency array is empty, we don't need to call useEffect more then once
  it will will be automatically run whenever there’s a change in the targeted database reference
  onSnapshot() - cheks whether there were any changes in collection and its documents. Arguments:
  - collection(db, 'messages') - reference that you attach the listener to
  - The callback function that’s called whenever there’s a change detected in the reference.
  In this case in callback function we get id and key/value of the items and push them to newMessages array
  then we set newMessages as a value for messages setMessages(newMessages);.*/
  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubMessages = onSnapshot(q, (documentsSnapshot) => {
      let newMessages = [];
      documentsSnapshot.forEach((doc) => {
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        });
      });
      setMessages(newMessages);
    });

    // code to execute when the component will be unmounted
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, []);

  useEffect(() => {
    // setOptions function of the navigation prop to set the navigation header’s title
    // [] - means it doesn't rely on any state changes of this component
    // code inside useEffect will be called only once, right after the component is mounted
    navigation.setOptions({ title: name });
  }, []);

  /** onSend is called when a user sends a message
   * setMessage() is called with a callback function passed into it
   * previousMessages - parameter represents a variable that refers to the latest value of the state
   * append() function provided by GiftedChat, appends the new message to the original list of messages from previousMessages
   */
  const onSend = (newMessages) => {
    // setMessages((previousMessages) =>
    //   GiftedChat.append(previousMessages, newMessages)
    // );
  };


  const rightBobbleBackground = (backgroundColor) => {
    if (backgroundColor === '#090c08') {
      return '#526675';
    }
    if (backgroundColor === '#474056') {
      return '#ba8bba';
    }
    if (backgroundColor === '#8a95a5') {
      return '#223C50';
    }
    if (backgroundColor === '#b9c6ae') {
      return '#2C4937';
    }
  };
  
  /**Customizing Bubbles
   * ...props - helps to inherit props
   * wrapperStyle - name of the style
   * right and left - targets right and left bubbles respectively
   */
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: `${rightBobbleBackground(color)}`,
          },
          left: { backgroundColor: '#FFF' },
        }}
      />
    );
  };

  const renderSystemMessage = (props) => {
    return (
      <SystemMessage
        {...props}
        textStyle={{ fontSize: 14, color: '#fff', fontWeight: 'bold' }}
      />
    );
  };

  const renderDay = (props) => {
    return (
      <Day
        {...props}
        textStyle={{ fontSize: 14, color: '#fff', fontWeight: 'bold' }}
      />
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: `${color}` }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderSystemMessage={renderSystemMessage}
        renderDay={renderDay}
        onSend={(messages) => onSend(messages)}
        user={{ _id: 1 }}
      />
      {/* If the platform’s OS is Android, add the component KeyboardAvoidingView;
      otherwise, insert nothing. */}
      {Platform.OS === 'android' ? (
        <KeyboardAvoidingView behavior='height' />
      ) : null}
      {/* // // <Text>Hello Chat!</Text>
      //{' '} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // padding: 20,
  },
});

export default Chat;
