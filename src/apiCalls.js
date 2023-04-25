import {publicRequest, userRequest} from './makeRequest';
import {addProduct} from './redux/cartRedux';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  updateUser,
  saveDeviceToken,
} from './redux/userRedux';
import {showToast} from './showToast';
import messaging from '@react-native-firebase/messaging';
const signUp = async (formData, navigate, setSingleFile, setIsLoading) => {
  try {
    // console.log(formData);
    setIsLoading(true);
    const res = await userRequest('post', '/register', formData);
    // console.log(res.status, 'user is created');
    // ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
    if (res.status == 201) {
      showToast('success', res.data.message);
      setIsLoading(false);
      setSingleFile(null);
      // navigate('Homes', {screen: 'PaymentMethod',params:{user:res.data.data}});
      navigate('login');
    }
    // navigate('Auth', {screen: 'login'});
  } catch (err) {
    console.log(err);
    setIsLoading(false);
    const {message} = err?.response?.data;
    // ToastAndroid.show(message, ToastAndroid.SHORT);
    showToast('success', message);
  }
};
const login = async (
  user,
  dispatch,
  navigate,
  setState,
  state,
  setIsLoading,
) => {
  dispatch(loginStart());
  try {
    setIsLoading(true);

    const res = await publicRequest.post('/login', user);

    dispatch(loginSuccess(res.data.data));
    
        await messaging().registerDeviceForRemoteMessages();
        const token = await messaging().getToken();
       
        const response = await publicRequest.post('/registerToken', {token,id:res.data.data._id});
        if(response.status == 200)  dispatch(saveDeviceToken(token));
        
        
    setState({...state, email: '', password: '', checked: false});
    // ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
    // showToast('success', res.data.message);
    navigate.replace('MyTabs', {screen: 'Home'});
  } catch (err) {
    setIsLoading(false);
    const {data, status} = err?.response;
    if (status >= 500) {
      // console.log(err);
      // ToastAndroid.show(err.message, ToastAndroid.SHORT);
      showToast('success', err.message);
    } else {
      // ToastAndroid.show(data?.message, ToastAndroid.SHORT);
      setIsLoading(false);
      showToast('success', data?.message);
    }
    // console.log(err.response);
    dispatch(loginFailure());
  }
};
const checkUser = async (token, navigation) => {
  try {
    let data = {token};
    // console.log('data',token);
    const res = await publicRequest.post('/checkuser', data);
    // console.log('respons',res);
    if (res.status === 200) {
      // console.log('ggg');
     
      navigation.replace('MyTabs', {screen: 'Home'});
    } else {
      navigation.replace('login');
    }
  } catch (err) {
    navigation.replace('login');
  }
};

const updateProfile = async (
  formData,
  userId,
  token,
  setSelectedImage,
  dispatch,
  setIsLoading,
) => {
  try {
    setIsLoading(true);
    const res = await userRequest(
      'put',
      `/updateProfile/${userId}`,
      formData,
      '',
      token,
    );
    if (res.status == 200) {
      dispatch;
      showToast('success', res.data.message);
      setSelectedImage(null);
      let user = {...res.data.data, token: token};
      // console.log('userrrrr', user);
      setIsLoading(false);
      dispatch(updateUser(user));
    }
  } catch (err) {
    console.log(err);
    // const {message} = err?.response?.data;
    console.log(err.response);
    if (err.response) {
      setIsLoading(false);
      showToast('error', message);
    } else {
      setIsLoading(false);

      showToast('error', 'Some thing Went wrong');
    }
  }
};

module.exports = {signUp, login, checkUser, updateProfile};
