import Toast from 'react-native-toast-message';
export const showToast = (type, text) => {

  Toast.show({  
    type: type,
    position: 'top',
    text1: text,
    visibilityTime: 5000,
  });

};
