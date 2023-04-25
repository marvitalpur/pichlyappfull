import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  ScrollView,
  StatusBar,
  Switch,
  FlatList,
  hidden,
  statusBarTransition,
  statusBarStyle,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Images} from '../../../constants';
import {Followbtn, Header} from '../../../components';
import {userRequest} from '../../../makeRequest';
// import {UserData} from '../../../components/usersdata';

const Following = props => {
  // const [state, setState] = useState('follow');
  const [state, setState] = useState([]);
  const userId = props.route.params.userId;
  // console.log('userId', userId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let res;
        res = await userRequest('get', `/getFollowings/${userId}`);
        if (res.status === 200) {
          setState(res.data.data);
          // console.log(res.data.data);
        } else {
          //   showToast('error', res.data.message);
          console.log('user followings', res.data.message);
        }
      } catch (err) {
        console.log('error', err.response.data.message);
      }
    };
    fetchData();
  }, []);

  console.log('state', state);
  return (
    <ImageBackground
      style={styles.imageContainer}
      source={Images.Pictures.appBg}>
      <ScrollView
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
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
              hiddinText
              BAckButton
              text="Following"
              onPress={() => {
                props.navigation.goBack();
              }}
            />
          </View>
          <View style={styles.screenBody}>
            <View style={styles.whitebox}>
              {state?.length == 0 ? (
                <View style={{alignSelf: 'center'}}>
                  <Text style={{color: 'black'}}> No Followings</Text>
                </View>
              ) : (
                <View style={{marginVertical: 10}}>
                  <FlatList
                    data={state}
                    renderItem={({item}) => {
                      return (
                        <>
                          <View style={{}}>
                            <Followbtn
                              followbutton
                              userprofile
                              borderWidth={0.75}
                              color1="#eee"
                              color2="#3109FB"
                              color3="#000"
                              color4="#fff"
                              User
                              item={item}
                              follow="unfollow"
                              unfollow="follow"
                              Image1={{uri: item.profileImg}}
                              BoldText={item.firstName + ' ' + item.lastName}
                              userName={item.userName}
                              LighterText={item.description}
                              navigation={props.navigation}
                            />
                          </View>
                        </>
                      );
                    }}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};
export default Following;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  screenHeader: {
    width: '90%',
    height: 80,
    marginTop: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    alignSelf: 'center',
  },
  whitebox: {
    width: '90%',
    height: '80%',
    borderRadius: 10,
    backgroundColor: '#fff',
    alignSelf: 'center',
    elevation: 2,
  },
});
