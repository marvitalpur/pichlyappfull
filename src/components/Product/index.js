import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList, Dimensions} from 'react-native';
import {Images, Themes} from '../../constants';
import {PostBox} from '../../components';
import {publicRequest} from '../../makeRequest';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
const Product = ({
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
  const [productPost, setProductPost] = useState([]);
  // const [reload, setReload] = useState(false);
  useEffect(() => {
    const getProductPost = async () => {
      try {
        let res;
        if (featuredPost) {
          res = await publicRequest.get(`/productFeaturedPosts/${user?._id}`);
        } else {
          if (userId) {
            res = await publicRequest.get(`/getProductPostById/${userId}`);
          } else {
            if (savedPost) {
              res = await publicRequest.get(`/getSaveProductPost/${user?._id}`);
              console.log('response', res.data.data);
            } else {
              res = await publicRequest.get(`/getProductPost/${user?._id}`);
            }
          }
        }

        setProductPost(res.data.data);
        setReload && setReload(false);
      } catch (err) {
        console.log(err.response.data.message);
      }
    };
    getProductPost();
  }, [reload]);

  return (
    <View>
      {productPost?.length > 0 ? (
        <FlatList
          data={productPost}
          keyExtractor={(item, index) => index}
          renderItem={({item}) => {
            return (
              <View style={{marginTop: 10}}>
                <PostBox
                  // staricon={true}
                  home={home ? true : false}
                  navigation={navigation}
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
                  postTime={item.createdAt}
                  boxTitle={
                    featuredPost ? item?.postId?.productName : item?.productName
                  }
                  boxDetail={
                    featuredPost ? item?.postId?.description : item.description
                  }
                  likes={featuredPost ? item?.postId?.likes : item?.likes}
                  rating={featuredPost ? item?.postId?.rating : item.rating}
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
                  price={
                    featuredPost
                      ? item?.postId?.price
                        ? item?.postId?.price
                        : ''
                      : item?.price
                      ? item?.price
                      : ''
                  }
                  images={featuredPost ? item?.postId?.content : item?.content}
                  user={featuredPost ? item?.featuredBy : item?.postedBy}
                  checksingle={item.checksingle}
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
                  heart={false}
                  city={featuredPost ? item?.postId?.city : item.city}
                  state={featuredPost ? item?.postId?.state : item.state}
                  post={item}
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
export {Product};
