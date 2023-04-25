import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList, Dimensions} from 'react-native';
import {Images, Themes} from '../../constants';
import LinearGradient from 'react-native-linear-gradient';
import {PostBox} from '../../components';
import {publicRequest} from '../../makeRequest';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const Talent = ({
  feture,
  userId,
  savedPost,
  reload,
  setReload,
  home,
  featuredPost,
}) => {
  const navigation = useNavigation();
  const user = useSelector(state => state.user.loggedInUser);
  const [talentPost, setTalentPost] = useState([]);
  // const [reload, setReload] = useState(false);

  useEffect(() => {
    const getTalentPost = async () => {
      try {
        let res;
        if (featuredPost) {
          res = await publicRequest.get(`/talentFeaturedPosts/${user?._id}`);
        } else {
          if (userId) {
            res = await publicRequest.get(`/getTalentPostById/${userId}`);
          } else {
            if (savedPost) {
              res = await publicRequest.get(`/getTalentSavedPost/${user?._id}`);
            } else {
              res = await publicRequest.get(`/getTalentPost/${user?._id}`);
            }
          }
        }
        if (res.status == 200) {
          console.log('ressss>>>>>', res.data.data);
          setTalentPost(res.data.data);
          setReload && setReload(false);
        }
      } catch (err) {
        console.log('errr>', err.response.data.message);
      }
    };

    getTalentPost();
  }, [reload]);

  // console.log(talentPost, 'talentPost');
  return (
    <View>
      {talentPost?.length > 0 ? (
        <FlatList
          data={talentPost}
          keyExtractor={(item, index) => index}
          renderItem={({item}) => {
            return (
              <View style={{marginTop: 10}}>
                <PostBox
                  home={home ? true : false}
                  navigation={navigation}
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
                  profileImg={
                    featuredPost
                      ? item?.featuredBy?.profileImg
                      : item?.postedBy?.profileImg
                  }
                  profileTitle={
                    featuredPost
                      ? item?.featuredBy?.firstName +
                        ' ' +
                        item?.featuredBy?.lastName
                      : item?.postedBy?.firstName +
                        ' ' +
                        item?.postedBy?.lastName
                  }
                  postId={featuredPost ? item?.postId?._id : item?._id}
                  reload={reload}
                  setReload={setReload}
                  postTime={
                    featuredPost ? item?.postId?.createdAt : item?.createdAt
                  }
                  boxTitle={
                    featuredPost ? item?.postId?.talentName : item?.talentName
                  }
                  boxDetail={
                    featuredPost ? item?.postId?.description : item.description
                  }
                  likes={featuredPost ? item?.postId?.likes : item?.likes}
                  rating={featuredPost ? item?.postId?.rating : item.rating}
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
                  images={featuredPost ? item?.postId?.content : item?.content}
                  checksingle={item.checksingle}
                  price={''}
                  user={featuredPost ? item?.featuredBy : item?.postedBy}
                  Press={item.Press}
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
                  star={true}
                  city={featuredPost ? item?.postId?.city : item.city}
                  state={featuredPost ? item?.postId?.state : item.state}
                  post={item}
                  // GetFeture={item.feture}
                  // feture={feture ? true : false}
                />
              </View>
            );
          }}
        />
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
    </View>
  );
};
export {Talent};
