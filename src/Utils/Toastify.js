import { ToastAndroid, Platform } from 'react-native';
const showToastWithGravity = message => {
  if (Platform.OS == 'android') {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  }
};

export default showToastWithGravity;
