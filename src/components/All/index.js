import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Images, Themes} from '../../constants';
import LinearGradient from 'react-native-linear-gradient';
import {PostBox, SuggestFriends} from '../../components';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {publicRequest, userRequest} from '../../makeRequest';
import {showToast} from '../../showToast';
import {State} from 'react-native-gesture-handler';

const AllMixed = ({
  props,
  feture,
  SuggestFriend,
  userId,
  savedPost,
  reload,
  setReload,
  home,
  featuredPost,
  isfocused,
}) => {
  const navigation = useNavigation();
  const user = useSelector(state => state.user.loggedInUser);
  // const isFocused = useIsFocused();
  // const [reload, setReload] = React.useState(false);
  const [state, setState] = React.useState([]);
  const statusData2 = [
    {
      id: 1,
      imgName: Images.Pictures.statusImg1,
      imgWidth: 59,
      imgHeight: 59,
      borderRadius: 19,
      borderColor: '#3729F2',
      borderWidth: 2,
      width: 61,
      height: 61,
      text: 'John',
      // Press: () => { navigation.navigate('contactUs') }
    },
    {
      id: 2,
      imgName: Images.Pictures.statusImg2,
      imgWidth: 59,
      imgHeight: 59,
      borderRadius: 19,
      borderColor: '#3729F2',
      borderWidth: 2,
      width: 61,
      height: 61,
      text: 'Veni',
      // Press: () => { navigation.navigate('') }
    },
    {
      id: 3,
      imgName: Images.Pictures.statusImg3,
      imgWidth: 59,
      imgHeight: 59,
      borderRadius: 19,
      borderColor: '#3729F2',
      borderWidth: 2,
      width: 61,
      height: 61,
      text: 'Bella',
      // Press: () => { navigation.navigate('') }
    },
    {
      id: 4,
      imgName: Images.Pictures.statusImg4,
      imgWidth: 59,
      imgHeight: 59,
      borderRadius: 19,
      borderColor: '#3729F2',
      borderWidth: 2,
      width: 61,
      height: 61,
      text: 'Saher',
    },
  ];
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      console.log('rerenderrr>>>>>>>>>>>>>>>>>>>>');
      try {
        let res;
        if (featuredPost) {
          res = await publicRequest.get(`/allFeaturedPosts/${user?._id}`);
        } else {
          if (userId) {
            res = await userRequest('get', `/getAllPostById/${userId}`);
          } else {
            if (savedPost) {
              res = await userRequest('get', `/getAllSavePost/${user?._id}`);
            } else {
              res = await userRequest('get', `/getallPost/${user?._id}`);
            }
          }
        }
        if (res.status === 200) {
          // console.log('alll>>>>>>>');
          setState([...res.data.data]);
          setReload && setReload(false);
        } else {
          showToast('error', res.data.message);
        }
      } catch (err) {
        console.log('error', err);
      }
    };

    fetchData();
  }, [reload]);
  // useEffect(()=>{
  //   console.log('rerenderrr')
  // },[isfocused])

  return (
    <View>
      {state?.length > 0 ? (
        state?.map((item, index) => {
          // console.log('postbox item>>>>>>>>>>>',item)
          return (
            <View key={index} style={{marginTop: 10}}>
              <PostBox
                home={home ? true : false}
                navigation={navigation}
                star={true}
                heart={
                  featuredPost
                    ? item?.postId?.talentName
                      ? true
                      : item?.postId?.caption
                      ? true
                      : false
                    : item?.talentName
                    ? true
                    : item?.caption
                    ? true
                    : false
                }
                keyExtractor={item => item.id}
                postId={featuredPost ? item?.postId?._id : item?._id}
                profileTitle={
                  featuredPost
                    ? item?.featuredBy?.firstName +
                      ' ' +
                      item?.featuredBy?.lastName
                    : item?.postedBy?.firstName + ' ' + item?.postedBy?.lastName
                }
                postTime={
                  featuredPost ? item?.postId?.createdAt : item?.createdAt
                }
                images={featuredPost ? item?.postId?.content : item?.content}
                reload={reload}
                setReload={setReload}
                boxTitle={
                  featuredPost
                    ? item?.postId?.productName
                      ? item?.postId?.productName
                      : item?.postId?.serviceName
                      ? item?.postId?.serviceName
                      : item?.postId?.talentName
                      ? item?.postId?.talentName
                      : ''
                    : item?.productName
                    ? item?.productName
                    : item?.serviceName
                    ? item?.serviceName
                    : item?.talentName
                    ? item?.talentName
                    : ''
                }
                likes={featuredPost ? item?.postId?.likes : item?.likes}
                rating={
                  featuredPost
                    ? item?.postId?.rating?.filter(
                        i => i?.user.toString() == user?._id.toString(),
                      )
                    : item?.rating?.filter(
                        i => i?.user.toString() == user?._id.toString(),
                      )
                }
                totalAvgRating={
                  featuredPost ? item?.postId?.totalRating : item?.totalRating
                }
                type={
                  featuredPost
                    ? item?.postId?.productName
                      ? 'product'
                      : item?.postId?.serviceName
                      ? 'service'
                      : item?.postId?.talentName
                      ? 'talent'
                      : 'general'
                    : item?.productName
                    ? 'product'
                    : item?.serviceName
                    ? 'service'
                    : item?.talentName
                    ? 'talent'
                    : 'general'
                }
                user={featuredPost ? item?.featuredBy : item?.postedBy}
                city={featuredPost ? item?.postId?.city : item.city}
                state={featuredPost ? item?.postId?.state : item.state}
                boxDetail={
                  featuredPost
                    ? item?.postId?.caption
                      ? item?.postId?.caption
                      : item?.description
                    : item?.caption
                    ? item.caption
                    : item?.description
                }
                profileImg={
                  featuredPost
                    ? item?.featuredBy?.profileImg
                    : item?.postedBy?.profileImg
                }
                price={
                  featuredPost
                    ? item?.postId?.price
                      ? item?.postId?.price
                      : ''
                    : item?.price
                    ? item?.price
                    : ''
                }
                priceInfo={
                  featuredPost
                    ? item?.postId?.pricingNote
                      ? item?.postId?.pricingNote
                      : ''
                    : item?.pricingNote
                    ? item.pricingNote
                    : ''
                }
                Press={item.Press1}
                GetFeture={
                  featuredPost ? item?.postId?.featured : item?.featured
                }
                feture={
                  featuredPost
                    ? user?._id.toString() == item?.featuredBy?._id.toString()
                      ? true
                      : false
                    : user?._id.toString() == item?.postedBy?._id.toString()
                    ? true
                    : false
                }
                post={item}
              />
            </View>
          );
        })
      ) : (
        <Text
          style={{
            textAlign: 'center',
            color: 'black',
            marginTop: 50,
            fontWeight: '600',
          }}>
          No Posts
        </Text>
      )}
      {/* {item.checkfollow == true ? ( */}
      <View>
        {/* {SuggestFriend == true ? ( */}
        {/* <View>
          <Text
            style={{
              color: 'grey',
              fontSize: 15,
              marginTop: 10,
              marginLeft: 10,
            }}>
            Sugguest For you
          </Text>
          <View
            style={{
              width: '100%',
              alignSelf: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              marginTop: 10,
            }}>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={statusData2}
              renderItem={({item}) => {
                return (
                  <View style={{marginLeft: 10}}>
                    <SuggestFriends
                      imgName={item.imgName}
                      width={item.width}
                      height={item.height}
                      imgWidth={item.imgWidth}
                      imgHeight={item.imgHeight}
                      text={item.text}
                      Press={item.Press}
                      keyExtractor={item => item.id}
                    />
                  </View>
                );
              }}
            />
          </View>
        </View> */}
        {/* ) : null} */}
      </View>
      {/* ) : null} */}
    </View>
  );
};
export {AllMixed};
