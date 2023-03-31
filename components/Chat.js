import { StyleSheet, View, Text } from 'react-native';
import { useEffect } from 'react';

// route is prop that is sent through navigation.
// This prop was set to all screen components listed under Stack.Navigator in App.js
// The navigation prop is passed to every component included in the Stack.Navigator in App.js
const Chat = ({ route, navigation }) => {
  // We can access the user’s name (from Screen 1 input) via route.params.name
  const { name, color } = route.params;

  useEffect(() => {
    // setOptions function of the navigation prop to set the navigation header’s title
    // [] - means it doesn't rely on any state changes of this component
    // code inside useEffect will be called only once, right after the component is mounted

    navigation.setOptions({ title: name });
  }, []);
  return (
    <View style={[styles.container, {backgroundColor: route.params.color}]}>
      <Text>Hello Chat!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Chat;
