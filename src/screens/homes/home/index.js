import React, {useState, useCallback, useMemo, useEffect} from 'react';
import {
  StatusBar,
  StyleSheet,
  ImageBackground,
  View,
  FlatList,
  statusBarStyle,
  statusBarTransition,
  hidden,
  RefreshControl,
  Text,
} from 'react-native';
import {Images} from '../../../constants';
import {HomeHeader} from '../../../components';

import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import StatusComponent from '../statusComponent';
import FeedComponent from './../../../components/feedComponent/index';
// import { showToast } from '../../../showToast';
import messaging from '@react-native-firebase/messaging';
import {showToast} from '../../../showToast';
import PushNotification from 'react-native-push-notification';
// import messaging from '@react-native-firebase/messaging';
import FeaturedPosts from '../../../components/FeaturedPosts';
import {TouchableOpacity} from 'react-native';
import VideoTimmer from '../../../components/VideoTrimmer';
const Home = props => {
  const user = useSelector(state => state.user.loggedInUser);
  const isfocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const statusMemo = useMemo(() => {
    return <StatusComponent navigation={props.navigation} />;
  }, []);

  const feedMemo = useMemo(() => {
    return (
      <FeedComponent
        home={true}
        feture={false}
        // isfocused={isfocused}
      />
    );
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // showToast('success', JSON.stringify(remoteMessage));
      PushNotification.createChannel(
        {
          channelId: 'Pitchly_secret',
          channelName: 'Pitchly',
          channelDescription: 'A channel to categorise your notifications',
          soundName: 'default',
          importance: 4,
          vibrate: true,
        },
        created => console.log(`createChannel returned '${created}'`),
      );
      const dat = {
        channelId: 'Pitchly_secret',
        channelName: 'Pitchly',
        message: remoteMessage.notification.body,
        title: remoteMessage.notification.title,
      };
      PushNotification.localNotification(dat);
    });
    // messaging().setBackgroundMessageHandler(async remoteMessage => {
    //   console.log('Message handled in the background!', remoteMessage);
    // });
    return unsubscribe;
  }, []);

  return (
    <>
      <ImageBackground
        style={styles.imageContainer}
        source={Images.Pictures.homeMainBg}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <>
              <StatusBar
                animated={true}
                backgroundColor="#000"
                barStyle={statusBarStyle}
                showHideTransition={statusBarTransition}
                hidden={hidden}
              />
              <View style={styles.body}>
                <View style={styles.headerView}>
                  <HomeHeader
                    homeHeader1
                    onPress={() =>
                      props.navigation.navigate('Homes', {
                        screen: 'searchscreen',
                      })
                    }
                  />
                </View>
                {/* <StatusComponent navigation={navigation} />
                 */}
                {statusMemo}
                {/* Pitchly Featured Posts Section*/}
                {/* <TouchableOpacity
                  onPress={() => {
                    
                  }}>
                  <View style={{width: 100, height: 100}}>
                    <Text> click video</Text>
                  </View>
                </TouchableOpacity> */}
                {/* <VideoTimmer />; */}
                <FeaturedPosts user={user} navigation={props.navigation} />
                {/* Post Feed Section */}
                {/* <FeedComponent
                  home={true}
                  feture={false}
                  // isfocused={isfocused}
                /> */}
                {feedMemo}
              </View>
            </>
          )}
        />
      </ImageBackground>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  body: {width: '90%', height: '100%', alignSelf: 'center', paddingBottom: 60},
  statusBoxView: {
    width: '110%',
    marginTop: 10,
    marginLeft: -10,
    flexDirection: 'row',
  },

  headerView: {width: '100%', marginVertical: 15},
  statusAddView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  statusAddView1: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  statusAddBox: {
    width: 65,
    height: 65,
    borderRadius: 19,
    borderColor: '#3729F2',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusAddIcon: {width: 24.63, height: 24.63},
  statusAddIcon1: {width: 60, height: 60, borderRadius: 10},
  pitchlyFeatured: {
    width: '100%',
    marginTop: 15,
    borderRadius: 25,
    // borderWidth: 2
  },
  appbg: {
    borderRadius: 25,
    marginVertical: 10,
    top: 5,
  },
  wrapper: {
    width: '100%',

    flexDirection: 'row',
  },
  image: {
    height: '60%',
    width: '20%',
    // backgroundColor: 'blue',
  },
});

// <PitchlyFeatured
// // onPress1={() => navigation.navigate('MyTabs', { screen: 'homescreensix' })}
// // onPress2={() => navigation.navigate('MyTabs', { screen: 'home11' })}
// />
