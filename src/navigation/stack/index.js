import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import splash from '../../screens/auth/splash';
import login from '../../screens/auth/login';
import home from '../../screens/homes/home';
import signup from '../../screens/auth/signup';
import mainAuth from '../../screens/auth/mainAuth';
import MyTabs from '../bottomTab';
import TermsAndCondition from '../../screens/homes/terms&conditons';
import PrivacyPolicy from '../../screens/homes/privacyPolicy';
import ContactUs from '../../screens/auth/contactUs';
import ForgetPassword from '../../screens/auth/forgetPassword';
import ForgetConfirm from '../../screens/auth/forgetConfirm';
import HavingTouble from '../../screens/auth/havingTouble';
import MessageScreen from '../../screens/homes/MessageScreen';
import ChatScreen1 from '../../screens/homes/chatscreen1';
import Notification from '../../screens/homes/Notifications';
import AddServices from '../../screens/homes/AddServices';
import AccountSetting from '../../screens/homes/AccountSetting';
import Profile from '../../screens/homes/profile';
import EditProfile from '../../screens/homes/EditProfile';
import PremiumMemberScreen from '../../screens/homes/PremiumMemberScreen';
import ChatScreen from '../../screens/homes/ChatScreen';
import GetFeaturedPost from '../../screens/homes/Get_It_Featured';
import GetFeatured from '../../screens/homes/GetFeatured';
import AccountDeactivation from '../../screens/homes/AccountDeactivation';
import ChangePassword from '../../screens/homes/ChangePassword';
import Blocked from '../../screens/homes/Blocked';
import Language from '../../screens/homes/Language';
import Payment from '../../screens/homes/PAyment';
import ThankYouScreen from '../../screens/homes/thank you';
import DeactivateAccount from '../../screens/homes/DeactivateAccount';
import DeleteAccount from '../../screens/homes/DeleteAccount';
import Settings from '../../screens/homes/settings';
import Productdetails from '../../screens/homes/ProductDetails';
import ChatDetails from '../../screens/homes/chatDetails';
import PictureSlider from '../../screens/homes/PictureSlider';
import HomeScreensix from '../../screens/homes/home6';
import AddPost from '../../screens/homes/Addpost';
import NotificationSetting from '../../screens/homes/notificationSetting';
import AddTelent from '../../screens/homes/AddTelent';
import Addproduct from '../../screens/homes/Addproduct';
import SearchScreen from '../../screens/homes/SearchbyScreen';
import FeaturedPost from '../../screens/homes/FeaturedPost';
import Home11 from '../../screens/homes/home11';
import Followers from '../../screens/homes/followers';
import Following from '../../screens/homes/following';
import SavedStatus from '../../screens/homes/savedstatus';
import TalentScreen from '../../screens/homes/TalentScreen';
import CameraStorie from '../../screens/homes/CameraStorie';
import Search from '../../screens/homes/Search';
import Viewstatus from '../../screens/homes/viewstatus';
import SavedPost from '../../screens/homes/savedPost';
import StorieCreate from '../../screens/homes/Storiecreate';
import Account from '../../screens/homes/account';
import StorieView from '../../screens/homes/storieview';
import Storyreplay from '../../screens/homes/storyReplay';
import Picview from '../../screens/homes/picView';
import Main from '../../screens/auth/main';
// import AddTelent from '../../screens/homes/AddTelent'
import {useSelector} from 'react-redux';
import {publicRequest} from '../../makeRequest';
import Gallary from '../../screens/homes/gallary';
import PreviewComponent from '../../screens/homes/previewComponent';
import HighlightView from '../../screens/homes/HighlightView';

const Stack = createNativeStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="main"
        component={Main}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="splash"
        component={splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="mainAuth"
        component={mainAuth}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="login"
        component={login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="signup"
        component={signup}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="forgetPassword"
        component={ForgetPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="forgetConfirm"
        component={ForgetConfirm}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="contactUs"
        component={ContactUs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="havingTouble"
        component={HavingTouble}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="addServices"
        component={AddServices}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export const Homes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="savedpost"
        component={SavedPost}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="createstorie"
        component={StorieCreate}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Viewstatus"
        component={Viewstatus}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="homesix"
        component={HomeScreensix}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="camerastorie"
        component={CameraStorie}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Savedstatus"
        component={SavedStatus}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="talentscreen"
        component={TalentScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="followers"
        component={Followers}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="previewComponent"
        component={PreviewComponent}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="following"
        component={Following}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="home11"
        component={Home11}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="homescreensix"
        component={HomeScreensix}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="highlightView"
        component={HighlightView}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="notificationsettings"
        component={NotificationSetting}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="featuredpost"
        component={FeaturedPost}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="productdetails"
        component={Productdetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="settings"
        component={Settings}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="getfeatured"
        component={GetFeatured}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="fututerdpost"
        component={FeaturedPost}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="thankyouscreen"
        component={ThankYouScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="payment"
        component={Payment}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="language"
        component={Language}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Accountdeactivation"
        component={AccountDeactivation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="account"
        component={Account}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="chatdetails"
        component={ChatDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="getfeaturePost"
        component={GetFeaturedPost}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="editprofile"
        component={EditProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="accountsettings"
        component={AccountSetting}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="premium"
        component={PremiumMemberScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="chatscreen"
        component={ChatScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="chatScreen1"
        component={ChatScreen1}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="messageScreen"
        component={MessageScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="termsAndCondition"
        component={TermsAndCondition}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="pictureslider"
        component={PictureSlider}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="privacyPolicy"
        component={PrivacyPolicy}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="changepassword"
        component={ChangePassword}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="blocked"
        component={Blocked}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="deactivateaccount"
        component={DeactivateAccount}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="deleteaccount"
        component={DeleteAccount}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="addpost"
        component={AddPost}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="addservices"
        component={AddServices}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="addtelent"
        component={AddTelent}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="addproduct"
        component={Addproduct}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="searchscreen"
        component={SearchScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="storieview"
        component={StorieView}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="storyreplay"
        component={Storyreplay}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Picview"
        component={Picview}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Gallary"
        component={Gallary}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Auth'}>
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Homes"
          component={Homes}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MyTabs"
          component={MyTabs}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
