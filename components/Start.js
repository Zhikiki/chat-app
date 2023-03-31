import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  Pressable,
} from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { useState, useEffect } from 'react';

const backgroundColors = {
  black: { backgroundColor: '#090c08' },
  purple: { backgroundColor: '#474056' },
  grey: { backgroundColor: '#8a95a5' },
  green: { backgroundColor: '#b9c6ae' },
};

// The navigation prop is passed to every component included in the Stack.Navigator in App.js
const Start = ({ navigation }) => {
  useEffect(() => {
    // setOptions function of the navigation prop to hide the navigation header
    // [] - means it doesn't rely on any state changes of this component
    // code inside useEffect will be called only once, right after the component is mounted

    navigation.setOptions({ headerShown: false });
  }, []);

  const [name, setName] = useState('');
  const [userOption, setUserOption] = useState('');
  const [color, setColor] = useState('');

  const { black, purple, grey, green } = backgroundColors;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/background-image.png')}
        style={[styles.container, styles.backgroundImage]}
      >
        <Text style={styles.appTitle}>Chat App</Text>
        <View style={styles.userContainer}>
          <View style={styles.inputContainer}>
            <Ionicons name='person-outline' size={26} color='#757083' />
            <TextInput
              style={styles.nameInput}
              onChangeText={setName}
              value={name}
              placeholder='Enter your Name'
            />
          </View>

          <View style={styles.colorContainer}>
            <Text style={styles.colorText}>Choose your Background:</Text>

            <View style={styles.colorWrapper}>
              <TouchableOpacity
                style={[styles.color, black]}
                onPress={() => {
                  setColor(black.backgroundColor);
                }}
              >
                <View style={styles.innerColorSelected}></View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.color, purple]}
                onPress={() => {
                  setColor(purple.backgroundColor);
                }}
              >
                <View style={styles.innerColorSelected}></View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.color, grey]}
                onPress={() => {
                  setColor(grey.backgroundColor);
                }}
              >
                <View style={styles.innerColorSelected}></View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.color, green]}
                onPress={() => {
                  setColor(green.backgroundColor);
                }}
              >
                <View style={styles.innerColorSelected}></View>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.nameBox, styles.chatBox]}
            onPress={() =>
              navigation.navigate('Chat', { name: name, color: color })
            }
          >
            <Text style={[styles.colorText, styles.chatBoxText]}>
              Start Chatting
            </Text>
          </TouchableOpacity>
        </View>

        {/* when the text input is being changed, 
      setName function takes value and set it as a name */}

        {/* When Button is being pushed we call navigation method. 
      Here we say to which screen we want to navigate
      And also we send prop name (from input) */}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 35,
  },
  appTitle: {
    // flex: 1,
    fontSize: 45,
    fontWeight: '600',
    color: '#fff',
    marginTop: 60,
  },
  userContainer: {
    // flex: 1,
    backgroundColor: '#fff',
    height: '44%',
    minHeight: '44%',
    // flexGrow: 1,
    // minHeight: 'fit-content',
    width: '88%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 15,
    gap: 8,
    // overflow: 'auto',
    // marginBottom: 15,
  },

  inputContainer: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '88%',
    height: 50,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderColor: '#757083',
    borderRadius: 2,
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 50,
  },

  nameInput: {
    paddingLeft: 15,
  },

  colorContainer: {
    // flex: 1,
    alignItems: 'flex-start',
    width: '88%',
    gap: 8,
    // paddingHorizontal: 15,
  },

  nameBox: {
    height: 50,
    width: '88%',
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 50,
  },
  colorText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 100,
  },
  colorWrapper: {
    flexDirection: 'row',
  },
  color: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 10,
    // borderStyle: 'double',
    // borderColor: 'red',

    // borderWidth: 2,
  },
  innerColor: {
    // width: 36,
    // height: 36,
    // borderRadius: 20,
    // borderColor: 'white',
  },

  innerColorSelected: {
    width: 36,
    height: 36,
    borderRadius: 20,
    borderColor: 'white',
    borderWidth: 2,
  },

  chatBox: {
    backgroundColor: '#757083',
    justifyContent: 'center',
  },
  chatBoxText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default Start;

{
  /* <View style={styles.usernameSection}>
  <Ionicons name='person-outline' size={32} color='#0000ff' />
  <TextInput
    style={styles.textInput}
    value={name}
    onChangeText={setName}
    placeholder='Type your name here'
  />
</View>; */
}

// usernameSection: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   textInput: {
//     // width: '88%',
//     padding: 15,
//     borderWidth: 1,
//     marginTop: 15,
//     marginBottom: 15,
//   },
