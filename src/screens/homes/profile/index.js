import React, {useState, useMemo, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ImageBackground,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  statusBarStyle,
  hidden,
  statusBarTransition,
  RefreshControl,
} from 'react-native';
import {
  Header,
  Highlight,
  AllMixed,
  HomeHeader,
  Product,
  Services,
  Talent,
  UserData,
} from '../../../components';
import {Images} from '../../../constants';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector, useDispatch} from 'react-redux';
import {useRoute, useIsFocused} from '@react-navigation/native';
import FeedComponent from './../../../components/feedComponent/index';
import {publicRequest} from '../../../makeRequest';
import {Highlights} from '../../../components/highlights';
import HighlightStatusComponent from '../../../components/highlightStatusComponent';
const Profile = props => {
  const route = useRoute();
  const params = route?.params?.user;
  const [state, setState] = useState();

  const user = useSelector(state => state.user.loggedInUser);

  const isFocused = useIsFocused();

  const [followUser, setFollowUser] = useState({});
  const [showUser, setShowUser] = useState(params ? params : user);

  useEffect(() => {
    const gerUser = async () => {
      try {
        const res = await publicRequest.get(
          `/getUser/${params ? params?._id : user?._id}`,
        );
        setShowUser(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    gerUser();
  }, [isFocused]);

  const [refreshing, setRefreshing] = useState(false);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    console.log('first');
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const feedMemo = useMemo(() => {
    return (
      <FeedComponent
        userId={params?._id ? params?._id : user?._id}
        feture={true}
      />
    );
  }, []);
  return (
    <ImageBackground
      style={styles.imageContainer}
      source={Images.Pictures.appBg}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}
        ListHeaderComponent={() => (
          <>
            <StatusBar
              animated={true}
              backgroundColor="#000"
              barStyle={statusBarStyle}
              showHideTransition={statusBarTransition}
              hidden={hidden}
            />

            <View style={{}}>
              <View style={styles.screenHeader}>
                <Header
                  onPress={() =>
                    props.navigation.navigate('Homes', {screen: 'settings'})
                  }
                  HeaderText
                  hiddinText1
                  informationtext
                  barICon
                  text1="Profile"
                  press={() => props.navigation.goBack()}
                />
              </View>
              <View style={styles.screenBody}>
                {/* <View style={{height: '100%'}}> */}
                <UserData
                  marginTop={10}
                  marginLeft={20}
                  editoption={
                    params ? (params._id == user?._id ? true : false) : true
                  }
                  Bio
                  // editicon
                  Image1={
                    params
                      ? {uri: params?.profileImg}
                      : user?.profileImg
                      ? {uri: user?.profileImg}
                      : Images.Pictures.profile1
                  }
                  UserName={
                    params
                      ? params?.firstName + ' ' + params?.lastName
                      : user?.firstName + ' ' + user?.lastName
                  }
                  UserEmail={
                    params ? `@${params?.userName}` : `@${user?.userName}`
                  }
                  Post={111}
                  informationtext
                  setFollowUser={setFollowUser}
                  followUser={followUser}
                  Followers={
                    // params ? params?.followers?.length : user?.followers?.length
                    showUser?.followers?.length
                  }
                  Following={
                    // params
                    //   ? params?.followings?.length
                    //   : user?.followings?.length
                    showUser?.followings?.length
                  }
                  onPress1={() =>
                    props.navigation.navigate('Homes', {
                      screen: 'followers',
                      params: {
                        userId: params ? params?._id : user?._id,
                        navigation: props.navigation,
                      },
                    })
                  }
                  onPress2={() =>
                    props.navigation.navigate('Homes', {
                      screen: 'following',
                      params: {
                        userId: params ? params?._id : user?._id,
                        navigation: props.navigation,
                      },
                    })
                  }
                  Bios={params ? params?.bio : user?.bio}
                  params={params}
                  user={user}
                  Contact1="Contact"
                  hideEmail={user?.hideEmail}
                  hidePhoneNo={user?.hidePhoneNo}
                  Contact={user?.phoneno?.toString()}
                  Email1="Email"
                  Email={user?.email}
                  Location1="Location"
                  Location={user?.location}
                  navigation={props.navigation}
                  pressme={() => {
                    props.navigation.navigate('Homes', {
                      screen: 'editprofile',
                    });
                  }}
                />
                {/* </View> */}

                {/* HIGHTLIGHTS SECTION */}
                {/* <Highlights navigation={props?.navigation} userId={user?._id} /> */}
                <HighlightStatusComponent navigation={props?.navigation} />
                {/* <FeedComponent userId={params?._id ? params?._id : user?._id} /> */}
                {feedMemo}
              </View>
            </View>
          </>
        )}
      />
    </ImageBackground>
  );
};

export default Profile;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  screenHeader: {
    width: '90%',
    height: 80,
    marginTop: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBoxView: {
    width: '86%',
    marginTop: 20,
    marginLeft: -10,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  statusAddView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
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

  headingText: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  headingTextView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  screenBody: {
    width: '100%',
    height: '100%',
    // backgroundColor: 'pink',
    alignSelf: 'center',
  },
});
