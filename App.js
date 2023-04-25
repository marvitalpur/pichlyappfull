import React, { useEffect } from 'react';

import MyStack from './src/navigation/stack';
import Toast from 'react-native-toast-message';
import socket from './src/socket';
import { publicRequest } from './src/makeRequest';
// import messaging from '@react-native-firebase/messaging';
// import PushNotification from 'react-native-push-notification';
import { useSelector } from 'react-redux';
const App = props => {
  // const user = useSelector(state => state.user.loggedInUser);

  // const sendFcmToken = async () => {
  //   try {
  //     console.log('presssss')
  //     await messaging().registerDeviceForRemoteMessages();
  //     const token = await messaging().getToken();
     
  //     const res = await publicRequest.post('/registerToken', {token,id:user._id});
  //     console.log('eeeeeeeeeeeeeeeeeeeeee>>>>>>>>>>>',res.data);
  //   } catch (err) {
  //     //Do nothing
  //     console.log(err.response.data);
  //     return;
  //   }
  // };
  // useEffect(()=>{
  //   sendFcmToken();
  // },[])
  
  return (
    <>
      <MyStack {...props} />
      <Toast />
    </>
  );
};

export default App;
