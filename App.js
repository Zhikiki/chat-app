import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert } from 'react-native';

import { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import firebase functions for initialisation Cloud Firestore
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// import package to verify internet connection
import { useNetInfo } from '@react-native-community/netinfo';

// import firebase functions that disable/enable connection to DB when internet connection lost/exist
import { disableNetwork, enableNetwork } from 'firebase/firestore';

import Start from './components/Start';
import Chat from './components/Chat';

/* returns an object containing two components, Navigator and Screen, which you’ll use to create the navigation stack */
const Stack = createNativeStackNavigator();

const App = () => {
  // Definition of a state that represents the network connectivity status
  const connectionStatus = useNetInfo();

  /* Checks if user is connected to the internet 
  if false - alert mesage and disable reconnecting to Firestore DB
  if true - enable reconnecting to Firestore DB
  connectionStatus.isConnected - is useEffect() dependency []
  useEffect will be re-executed every time when value of dependency changes
  */
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert('Connection Lost!');
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  // chat_app Firebase configuration
  const firebaseConfig = {
    apiKey: 'AIzaSyCVLj54jAkYZuEm2pOFXmZGT3SZoGhOU68',
    authDomain: 'chat-app-db-cfc15.firebaseapp.com',
    projectId: 'chat-app-db-cfc15',
    storageBucket: 'chat-app-db-cfc15.appspot.com',
    messagingSenderId: '971427698123',
    appId: '1:971427698123:web:7fa8f968b3c50c5e55d24e',
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (
    /* Navigation Container is responsible for managing your app state and 
     linking your top-level navigator to the app environment.*/
    <NavigationContainer>
      {/* initialRouteName - the first screen to load upon starting your app */}
      <Stack.Navigator initialRouteName='Start'>
        {/* Stack.Screen needsat least two this.props. 
        component: The component you want to display as the screen; 
        name: The handler that you’ll use to open or navigate to the screen */}
        <Stack.Screen name='Start' component={Start} />
        <Stack.Screen name='Chat'>
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              {...props}
            />
          )}
        </Stack.Screen>
        {/* <Stack.Screen name='Chat' component={Chat} /> */}
      </Stack.Navigator>
      {/* <View style={styles.container}>
        <Text>I'm building Navigation</Text>
        <StatusBar style='auto' />
      </View> */}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default App;
