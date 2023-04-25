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
  txt1,
  txt2,
  hidden, statusBarStyle, statusBarTransition
} from 'react-native';
import React, { useState } from 'react';
import { Images } from '../../../constants';
import { AppButton, Box, Header, Row, Switch1 } from '../../../components';
import { Item, Textarea } from 'native-base';
import { Icon } from 'react-native-elements';
import { showToast } from '../../../showToast';
import { publicRequest } from '../../../makeRequest';

const GetFeatured = ({ route, navigation }) => {

  const  type = route?.params?.type;
  const  postId  = route?.params?.postId;

  // const route = useRoute();
  // console.log('type>>>>>>>>>>>>>',type);


  const data = [
    {
      txt1: '1 Week',
      txt2: '$50',
      value:1,
    },
    {
      txt1: '2 Weeks',
      txt2: '$50',
      value:2,
    },
    {
      txt1: '3 Weeks',
      txt2: '$50',
      value:3,
    },
    {
      txt1: '4 Weeks',
      txt2: '$50',
      value:4,
    },
  ];

 

  return (
    <ImageBackground
      style={styles.imageContainer}
      source={Images.Pictures.appBg}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}>
        <StatusBar
          animated={true}
          backgroundColor="#000"
          barStyle={statusBarStyle}
          showHideTransition={statusBarTransition}
          hidden={hidden} />
        <View style={{}}>
          <View style={styles.screenHeader}>
            <Header
              BAckButton
              hiddinText
              text="Get it Featured"
              onPress={() =>
                //  navigation.replace("MyTabs", { screen: "profile" })
                navigation.goBack()
            }
            />
          </View>
          <View style={styles.screenBody}>
            <View style={styles.whitebox}>
              <View style={styles.textbox}>
                <Text style={styles.txt1}>Duration</Text>
                <Text style={styles.txt2}>
                  Lorem Ipsum Dolor Sit Amet , Consetetur Sadipscing Elitr, Sed
                  Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna
                  Aliquyam Erat, Sed Diam.
                </Text>
              </View>
              <View style={styles.textbox}>
                <Text style={styles.txt1}>Select You Package</Text>
              </View>
              <FlatList
                data={data}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.rowstyle}>
                      <View style={styles.texts}>
                        <Text style={styles.txt1}>{item.txt1}</Text>
                        <Text style={{ fontSize: 12, marginTop: -4 }}>
                          {item.txt2}
                        </Text>
                      </View>
                      <View style={styles.btns}>
                        <View
                          style={{
                            // paddingVertical: 2,
                            width: '100%',
                          }}>
                          <AppButton
                            LinearColor1={'#5DF7B8'}
                            LinearColor2={'#3109FB'}
                            color={'white'}
                            borderWidth={0.5}
                            height={30}
                            borderRadius={3}
                            borderColor={'#707070'}
                            backgroundColor={'#FFFFFF'}
                            label="Get Now"
                            onPress={() => 
                            //   {
                            //   getFeatured(item.value);
                            // }
                              navigation.navigate('payment',
                              {
                                onPress1: () => navigation.replace('MyTabs', { screen: 'profile' }),
                                onPress2: () => { navigation.goBack('') },
                                type:type?type:'',
                                postId:postId?postId:'',
                                plan:item.value
                              }

                            )
                          }
                          />
                        </View>
                      </View>
                    </View>
                  );
                }}
              />

              <View style={{ marginVertical: 30 }}></View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};
export default GetFeatured;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  screenHeader: {
    width: '90%',
    height: 80,
    // marginTop: 10,
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
  textbox: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 5,
  },
  txt1: {
    // marginVertical: 10,
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16,
  },
  txt2: {
    // marginVertical: 5,

    color: '#000',
    fontSize: 14,
  },
  rowstyle: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 5,
    paddingVertical: 5,
    borderBottomWidth: 0.7,
    borderBottomColor: '#aaa',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btns: {
    width: 91,
    height: 30,
    // borderRadius: 10,
    marginVertical: 5,
  },
});
