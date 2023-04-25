import { StyleSheet, Text, View, statusBarStyle, StatusBar, hidden, statusBarTransition } from 'react-native';
import React from 'react';
import { AppButton, Box, Header, Row, Post } from '../../../components';
import Headerchat from '../../../components/Headerchat';
import { Images } from '../../../constants';
import { ScrollView } from 'react-native-gesture-handler';
import { Homes } from '../../../navigation/stack';
const Productdetails = (props) => {
  const  type = props?.route?.params?.type;
  const  postId  = props?.route?.params?.postId;
  const  post  = props?.route?.params?.post;
  console.log('routeeee>>>>>>>>>>>>',post)
  return (
    <View>
      <ScrollView>
        <View style={{ marginLeft: 10, marginTop: 10 }}>
          <StatusBar
            animated={true}
            backgroundColor="#000"
            barStyle={statusBarStyle}
            showHideTransition={statusBarTransition}
            hidden={hidden} />
          <View style={styles.screenHeader}>
            <Header
              BAckButton={true}
              hiddinText
              text="Featured Post"
              onPress={() => 
                // props?.navigation.replace("MyTabs", { screen: "profile" })
                props.navigation.goBack()
              
              }
            />
          </View>
        </View>
        <View style={{ width: '100%' }}>
          <Post
            Image1={post?.postId?post?.postId?.content[0].uri :post?.content[0].uri}
            TalentName={post?.postId?post?.postId?.talentName?post?.postId?.talentName:
              post?.postId?.productName?post?.postId?.productName:post?.postId?.serviceName 
              :
              post?.talentName?post?.talentName:
              post?.productName?post?.productName:post?.serviceName 
            }
            City={post?.postId?post?.postId?.city :post?.city }
            state={post?.postId?post?.postId?.state :post?.state }
            startDate={post?.postId?post?.postId?.featuredDate :post?.featuredDate }
            expiryDate={post?.postId?post?.postId?.expiryDate :post?.expiryDate }
            Duration={true}
            Press1={() => {
              props?.navigation.navigate('Homes', { screen: 'pictureslider' });
            }}
          />
          <View style={{ width: '60%', alignSelf: 'center' }}>
            <View style={{ marginVertical: 5 }}>
              <AppButton
                LinearColor1={'#5DF7B8'}
                LinearColor2={'#3109FB'}
                color={'white'}
                borderWidth={0.5}
                borderColor={'#707070'}
                backgroundColor={'#FFFFFF'}
                label="Renew"
                onPress={() => {
                  props?.navigation?.navigate('Homes', {
                    screen: 'getfeatured',
                    params:{
                      type:
                      post?.postId?
                      post?.postId?.productName
                      ? 'product'
                      : post?.postId?.serviceName
                      ? 'service'
                      : post?.postId?.talentName
                      ? 'talent'
                      : 'general'
                      :
                      post?.productName
                      ? 'product'
                      : post?.serviceName
                      ? 'service'
                      : post?.talentName
                      ? 'talent'
                      : 'general'
                      ,
                      postId:post?.postId?post?.postId?._id : post?._id 
                    }
                  })
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default Productdetails;

const styles = StyleSheet.create({
  screenBody: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  screenHeader: {
    width: '90%',
    height: 50,
    marginTop: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// <ImageBackground
// source={singleImg}
// style={{ width: '100%', height: '100%' }}
// resizeMode="stretch"></ImageBackground>
// )}