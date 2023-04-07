import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// import to make ActionSheet avaliable to fetch
import { useActionSheet } from '@expo/react-native-action-sheet';

const CustomActions = ({ wrapperStyle, iconTextStyle, color }) => {
  //setting variable actionSheet value as useActionSheet() method, which returns a reference to Gifted Chat’s ActionSheet
  const actionSheet = useActionSheet();

  // onActionsPress renders additional actions for user
  const onActionPress = () => {
    // variable defines array of avaliable options
    const options = [
      'Choose image from library',
      'Take picture',
      'Send location',
      'Cencel',
    ];

    // variable defines index of option 'Cancel'
    const cancelButtonIndex = options.length - 1;

    actionSheet.showActionSheetWithOptions(
      { options, cancelButtonIndex },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            pickImage();
            console.log('User wants to pick an image');
            return;
          case 1:
            takePhoto();
            console.log('User wants to take a photo');
            return;
          case 2:
            getLocation();
            console.log('User wants to share location');
          default:
        }
      }
    );
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onActionPress}>
      <View
        style={[
          styles.wrapper,
          wrapperStyle,
          { backgroundColor: `${color}`, borderColor: `${color}` },
        ]}
      >
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    marginLeft: 12,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 50,
    borderWidth: 1,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  iconText: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});
export default CustomActions;
