import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
  StatusBar,
  statusBarStyle,
  statusBarTransition,
  hidden,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {HomeHeader} from '../../../components';
import {Avatar} from 'react-native-elements';
import {Images} from '../../../constants';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {publicRequest} from '../../../makeRequest';
import {useSelector} from 'react-redux';

//Tabview
const Route = ({data, users, user, navigation}) => {
  // console.log('sadas', data);
  return (
    // <></>
    <View style={{flex: 1}}>
      {data?.length <= 0 ? (
        <Text
          style={{
            marginTop: 15,
            alignSelf: 'center',
            fontWeight: '600',
            color: 'black',
          }}>
          {users ? 'No Users' : 'No Posts'}
        </Text>
      ) : (
        <FlatList
          data={data}
          renderItem={({item}) => {
            // console.log('item', item);
            return (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  item.userName
                    ? navigation?.navigate('profile', {user: item})
                    : navigation?.navigate('Homes', {
                        screen: 'talentscreen',
                        params: {
                          profileImg: item.postedBy.profileImg,
                          profileTitle:
                            item.postedBy.firstName +
                            ' ' +
                            item.postedBy.lastName,
                          postTime: item.createdAt,
                          boxTitle: item?.talentName
                            ? item.talentName
                            : item.productName
                            ? item.productName
                            : item.serviceName
                            ? item.serviceNames
                            : '',
                          boxDetail: item.description,
                          price: item?.price ? item.price : '',
                          city: item.city,
                          state: item.state,
                          content: item.content,
                          navigation: navigation,
                          priceInfo: item?.priceInfo ? item?.priceInfo : '',
                          postId: item._id,
                          rating: item?.rating?.filter(
                            i => i.user.toString() == user._id.toString(),
                          ),
                          totalAvgRating: item.totalRating
                            ? item.totalRating
                            : 0,
                          postLikes: item?.likes,
                          // setPostLikes: setPostLikes,
                          type: item.productName
                            ? 'product'
                            : item.serviceName
                            ? 'service'
                            : item.talentName
                            ? 'talent'
                            : 'general',
                          heart: item.talentName
                            ? true
                            : item.caption
                            ? true
                            : false,
                        },
                      });
                }}>
                <View
                  style={{
                    // justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 15,
                    backgroundColor: 'white',
                    borderRadius: 20,
                    width: '80%',
                    alignSelf: 'center',
                    height: 63,
                    elevation: 3,
                    flexDirection: 'row',
                    marginBottom: 10,
                  }}>
                  <View style={{marginLeft: 15}}>
                    <Avatar
                      rounded
                      size={40}
                      source={{
                        uri: item.profileImg
                          ? item.profileImg
                          : item.productName
                          ? 'https://img.icons8.com/stickers/100/000000/p--v1.png'
                          : item.serviceName
                          ? 'https://img.icons8.com/stickers/100/000000/s--v1.png'
                          : item.talentName
                          ? 'https://img.icons8.com/stickers/100/000000/t.png'
                          : 'https://img.icons8.com/office/40/000000/user.png',
                      }}
                    />
                  </View>

                  <Text style={{marginLeft: 15}}>
                    {item.serviceName
                      ? item.serviceName
                      : item.productName
                      ? item.productName
                      : item.talentName
                      ? item.talentName
                      : item.firstName + ' ' + item.lastName}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
};

const Search = props => {
  const searchKey = props?.route?.params?.searchKey;
  const user = useSelector(state => state.user.loggedInUser);
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [tab, setTab] = useState(false);
  const layout = useWindowDimensions();
  const [ratingAvg, setRatingAvg] = useState(0);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'users', title: 'Users'},
    {key: 'services', title: 'Services'},
    {key: 'products', title: 'Products'},
    {key: 'talents', title: 'Talents'},
  ]);

  //Tab Render method
  const renderScene = ({route}) => {
    switch (route.key) {
      case 'users':
        return (
          <Route
            data={data.Users}
            users={true}
            user={user}
            navigation={props?.navigation}
          />
        );
      case 'services':
        return (
          <Route
            data={data.servicePosts}
            user={user}
            navigation={props?.navigation}
          />
        );
      case 'products':
        return (
          <Route
            data={data.productPosts}
            user={user}
            navigation={props?.navigation}
          />
        );
      case 'talents':
        return (
          <Route
            data={data.talentPosts}
            user={user}
            navigation={props?.navigation}
          />
        );
      default:
        return null;
    }
  };
  //SearchHandler
  const searchItem = async () => {
    try {
      let res;
      if (searchKey == 'talent') {
        res = await publicRequest.post(`/searchTalentPost/${user._id}`, {
          search,
        });
      } else if (searchKey == 'service') {
        res = await publicRequest.post(`/searchServicePost/${user._id}`, {
          search,
        });
      } else if (searchKey == 'product') {
        res = await publicRequest.post(`/searchProductPost/${user._id}`, {
          search,
        });
      } else {
        setTab(true);
        res = await publicRequest.post(`/searchAll/${user._id}`, {search});
      }
      setData(res.data.data);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  // console;
  return (
    <ImageBackground
      style={styles.imageContainer}
      source={Images.Pictures.homeMainBg}>
      <StatusBar
        animated={true}
        backgroundColor="#000"
        barStyle={statusBarStyle}
        showHideTransition={statusBarTransition}
        hidden={hidden}
      />

      <View style={{marginVertical: 30}}>
        <View style={styles.screenHeader}>
          <HomeHeader
            homeHeader2={true}
            visibleINPUT={true}
            setSearch={setSearch}
            searchValue={search}
            search={true}
            onSearchHandler={searchItem}
            onPress={() => {
              props.navigation.goBack();
            }}
            all={searchKey}
          />
        </View>
      </View>

      {tab == true ? (
        <TabView
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={{backgroundColor: 'black'}}
              style={{backgroundColor: '#F0FFFF'}}
              renderLabel={({route}) => (
                <Text style={{color: 'black'}}>{route.title}</Text>
              )}
            />
          )}
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
        />
      ) : (
        <FlatList
          data={data}
          renderItem={({item}) => {
            // console.log('item', item._id);
            return (
              <TouchableOpacity
                onPress={() => {
                  props?.navigation?.navigate('Homes', {
                    screen: 'talentscreen',
                    params: {
                      profileImg: item.postedBy.profileImg,
                      profileTitle:
                        item.postedBy.firstName + ' ' + item.postedBy.lastName,
                      postTime: item.createdAt,
                      boxTitle: item?.talentName
                        ? item.talentName
                        : item.productName
                        ? item.productName
                        : item.serviceName
                        ? item.serviceName
                        : '',
                      boxDetail: item.description,
                      price: item?.price ? item.price : '',
                      city: item.city,
                      state: item.state,
                      content: item.content,
                      navigation: props?.navigation,
                      priceInfo: item?.priceInfo ? item.priceInfo : '',
                      postId: item._id,
                      rating: item?.rating?.filter(
                        i => i.user.toString() == user._id.toString(),
                      ),
                      totalAvgRating: item.totalRating ? item.totalRating : 0,
                      postLikes: item?.likes,
                      // setPostLikes: setPostLikes,
                      type: item.productName
                        ? 'product'
                        : item.serviceName
                        ? 'service'
                        : item.talentName
                        ? 'talent'
                        : 'general',
                      heart: item.talentName
                        ? true
                        : item.caption
                        ? true
                        : false,
                    },
                  });
                }}>
                <View
                  style={{
                    // justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 15,
                    backgroundColor: 'white',
                    borderRadius: 20,
                    width: '80%',
                    alignSelf: 'center',
                    height: 63,
                    elevation: 3,
                    flexDirection: 'row',
                    marginBottom: 10,
                  }}>
                  <View style={{marginLeft: 15}}>
                    <Avatar
                      rounded
                      size={40}
                      source={{
                        uri: item.productName
                          ? 'https://img.icons8.com/stickers/100/000000/p--v1.png'
                          : item.serviceName
                          ? 'https://img.icons8.com/stickers/100/000000/s--v1.png'
                          : item.talentName
                          ? 'https://img.icons8.com/stickers/100/000000/t.png'
                          : item.profileImg,
                      }}
                    />
                  </View>

                  <Text style={{marginLeft: 15}}>
                    {item.serviceName
                      ? item.serviceName
                      : item.productName
                      ? item.productName
                      : item.talentName
                      ? item.talentName
                      : item.firstName + ' ' + item.lastName}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </ImageBackground>
  );
};
export default Search;
const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },
  screenHeader: {
    width: '90%',
    height: 30,
    marginTop: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
