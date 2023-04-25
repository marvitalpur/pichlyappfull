import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'native-base';
import home from '../../screens/homes/home';
import profile from '../../screens/homes/profile';
import {TabBar} from '../../components';
import ChatScreen1 from '../../screens/homes/chatscreen1';
import Notification from '../../screens/homes/Notifications';
import settings from '../../screens/homes/settings';
import TooltipScreen from '../../screens/homes/ToolTipScreen';
import Home11 from '../../screens/homes/home11';
import HomeScreensix from '../../screens/homes/home6';
import Account from '../../screens/homes/account';

const Tab = createBottomTabNavigator();
const MyTabs = props => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'transparent',
        },
      }}
      tabBarPosition="bottom"
      barStyle={{backgroundColor: '#0000'}}
      tabBar={props => <TabBar ar {...props} />}>
      <Tab.Screen name="home" component={home} options={{headerShown: false}} />
      <Tab.Screen
        name="ChatScreen1"
        component={ChatScreen1}
        options={{headerShown: false, unmountOnBlur: true}}
      />
      <Tab.Screen
        name="TooltipScreen"
        component={TooltipScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{headerShown: false, unmountOnBlur: true}}
      />
      <Tab.Screen
        name="profile"
        component={profile}
        options={{headerShown: false}}
      />
      {/* <Tab.Screen
        name="home11"
        component={Home11}
        options={{ headerShown: false }}
      /> */}
      <Tab.Screen
        name="homescreensix"
        component={HomeScreensix}
        options={{headerShown: false}}
      />

      <Tab.Screen
        name="account"
        component={Account}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default MyTabs;
