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
} from 'react-native';
import React, {useState} from 'react';
import {HomeHeader} from '../../../components';
import {Avatar} from 'react-native-elements';
import {Images} from '../../../constants';
import {TabView, SceneMap} from 'react-native-tab-view';
import {publicRequest} from '../../../makeRequest';
import {useSelector} from 'react-redux';

const FlatListComponent = props => {
  return (
    <FlatList
      data={data}
      renderItem={({item}) => (
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
              : item.userName}
          </Text>
        </View>
      )}
    />
  );
};
export default FlatListComponent;
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
