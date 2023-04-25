import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  StatusBar,
  statusBarStyle,
  statusBarTransition,
  hidden,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {Images} from '../../../constants';
import {Header, AppButton} from '../../../components';

import LinearGradient from 'react-native-linear-gradient';
import {Icon} from 'native-base';

const Picview = ({color, navigation}) => {
  const data = [
    {
      image1: Images.Icons.Photoicon,
    },
    {
      image1: Images.Pictures.CarHigh,
    },
    {
      image1: Images.Pictures.status1,
    },
    {
      image1: Images.Pictures.Whitecar,
    },
    {
      image1: Images.Pictures.Devil,
    },
    {
      image1: Images.Pictures.Faram,
    },
    {
      image1: Images.Pictures.Friendship1,
    },
    {
      image1: Images.Pictures.Whitecar,
    },
    {
      image1: Images.Pictures.Devil,
    },
  ];

  return (
    <ImageBackground
      style={styles.imageContainer}
      source={Images.Pictures.homeMainBg}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <StatusBar
          animated={true}
          backgroundColor="#000"
          barStyle={statusBarStyle}
          showHideTransition={statusBarTransition}
          hidden={hidden}
        />
        <View style={{width: '100%', alignSelf: 'center'}}>
          <View style={styles.screenHeader}>
            <Header
              BAckButton
              hiddinText
              text="Select Photo or Video"
              onPress={() => {
                navigation.goBack();
              }}
            />
          </View>
          <View style={styles.screenBody}>
            <View
              style={{
                width: '100%',
                height: 180,
                backgroundColor: 'pink',
                borderRadius: 10,
                marginVertical: 10,
              }}>
              <Image
                source={Images.Pictures.CarHigh}
                resizeMode="cover"
                style={{height: '100%', width: '100%', borderRadius: 10}}
              />
            </View>

            <View
              style={{
                width: '100%',
                height: 40,
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 5,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontWeight: 'bold', color: '#000'}}>Gallery</Text>
                <Icon
                  type="Entypo"
                  name="chevron-small-down"
                  style={{color: '#000', fontSize: 24}}
                />
              </View>
              <View style={{}}>
                <Icon
                  type="Feather"
                  name="copy"
                  style={{color: '#000', fontSize: 24}}
                />
              </View>
            </View>
            <View style={{marginVertical: 10, flexWrap: 'wrap'}}>
              <FlatList
                numColumns={3}
                showsVerticalScrollIndicator={false}
                data={data}
                renderItem={({item}) => {
                  return (
                    <View style={styles.imgview}>
                      <TouchableOpacity
                        style={{
                          width: 110,
                          height: 110,
                        }}>
                        <Image
                          source={item.image1}
                          resizeMode="contain"
                          style={{width: '100%', height: '100%'}}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </View>
            <View
              style={{width: '70%', alignSelf: 'center', marginVertical: 10}}>
              <AppButton
                LinearColor1={'#5DF7B8'}
                LinearColor2={'#3109FB'}
                color={'white'}
                borderWidth={0.5}
                borderColor={'#707070'}
                backgroundColor={'#FFFFFF'}
                label="Done"
                onPress={() =>
                  navigation.navigate('MyTabs', {screen: 'home'})
                }
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Picview;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },

  screenHeader: {
    width: '90%',
    marginVertical: 20,
    alignSelf: 'center',
  },

  screenBody: {
    width: '90%',
    // height: '100%',
    paddingTop: 20,
    alignSelf: 'center',

    // alignSelf: 'center',
    // alignItems: 'center'
  },
  maibox: {
    width: '90%',
    // height: '100%'
  },
  imgview: {
    width: 115,
    height: 130,
    borderRadius: 15,
  },
  img: {
    // width: '100%',
    // height: '95%',
    // borderRadius: 10,
    paddingTop: 10,
    // marginLeft: 30,
    // alignSelf: 'center',
    // alignSelf: 'center',
  },
});
