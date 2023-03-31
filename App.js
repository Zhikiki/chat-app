import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Start from './components/Start';
import Chat from './components/Chat';

/* returns an object containing two components, Navigator and Screen, which you’ll use to create the navigation stack */
const Stack = createNativeStackNavigator();

const App = () => {
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
        <Stack.Screen name='Chat' component={Chat} />
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
