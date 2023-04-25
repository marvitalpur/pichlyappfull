import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
  StatusBar,
  hidden,
  statusBarStyle,
  statusBarTransition,
} from 'react-native';
import {Icon} from 'native-base';
import React, {useState, useEffect} from 'react';
import {Images} from '../../../constants';
import {Tip, Header, HomeHeader} from '../../../components';
const SearchScreen = props => {
  return (
    <ImageBackground
      style={styles.imageContainer}
      source={Images.Pictures.homeMainBg}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <StatusBar
          animated={true}
          backgroundColor="#000"
          barStyle={statusBarStyle}
          showHideTransition={statusBarTransition}
          hidden={hidden}
        />
        <View style={{width: '90%', alignSelf: 'center'}}>
          <View style={styles.screenHeader}>
            <HomeHeader
              homeHeader2
              search={true}
              onPress={() => {
                props.navigation.goBack();
              }}
            />
          </View>
        </View>

        <View style={styles.Body}>
          <View style={{}}>
            <Tip
              tooltipdata2
              headingtext="Search"
              bottompoint
              bottom={140}
              left={200}
              Text1="All"
              Text2="Services"
              Text3="Talent"
              Text4="Products"
              onPress1={() => {
                props.navigation.navigate('Homes', {
                  screen: 'Search',
                  params: {searchKey: 'all'},
                });
              }}
              onPress2={() => {
                props.navigation.navigate('Homes', {
                  screen: 'Search',
                  params: {searchKey: 'service'},
                });
              }}
              onPress3={() => {
                props.navigation.navigate('Homes', {
                  screen: 'Search',
                  params: {searchKey: 'talent'},
                });
              }}
              onPress4={() => {
                props.navigation.navigate('Homes', {
                  screen: 'Search',
                  params: {searchKey: 'product'},
                });
              }}
              Icon1
              Image3={Images.Icons.user1}
              Image2={Images.Icons.setting1}
              Image4={Images.Icons.lock1}
            />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default SearchScreen;
const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },

  screenHeader: {
    width: '100%',
    height: 30,
    marginTop: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Body: {
    backgroundColorL: 'purple',
    width: '90%',
    // height: '100%',
    alignSelf: 'center',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});
