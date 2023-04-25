import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Icon} from 'native-base';
import {Images} from '../../constants';
import {TextInput} from 'react-native-gesture-handler';

const HomeHeader = ({
  left,
  right,
  text,
  visibleText,
  hiddinText,
  backgroundColor,
  color,
  fontSize,
  fontWeight,
  textAlign,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  borderRadius,
  borderWidth,
  borderColor,
  onPress,
  homeHeader2,
  search,
  homeHeader1,
  visibleINPUT,
  onPress1,
  searchValue,
  setSearch,
  onSearchHandler,
  all,
}) => {
  return (
    <>
      {homeHeader1 && (
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            activeOpacity={0.8}
            onPress={onPress}
            style={{
              width: 69.56,
              height: 43.5,
            }}>
            <Image
              source={Images.Logos.appLogo}
              style={{width: '100%', height: '100%'}}
            />
          </View>
          <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
            <LinearGradient
              start={{x: 1, y: 0.0}}
              end={{x: 1, y: 1.9}}
              colors={['#5DF7B8', '#3109FB']}
              style={{
                width: 35,
                height: 35,
                borderRadius: borderRadius || 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon
                type="AntDesign"
                name="search1"
                style={{color: 'white', fontSize: 24}}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}

      {homeHeader2 && (
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
            <LinearGradient
              start={{x: 1, y: 0.0}}
              end={{x: 1, y: 1.9}}
              colors={['#5DF7B8', '#3109FB']}
              style={{
                width: 35,
                height: 35,
                borderRadius: borderRadius || 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon
                type="AntDesign"
                name="left"
                style={{color: 'white', fontSize: 24}}
              />
            </LinearGradient>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              alignSelf: 'flex-end',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                width: '85%',
                height: '30%',
                borderRadius: 5,
              }}>
              {visibleINPUT === true ? (
                <TextInput
                  style={{
                    width: '100%',
                    backgroundColor: 'white',
                    elevation: 3,
                    height: 35,
                  }}
                  placeholder={`Search by ${all}`}
                  onChangeText={text => setSearch(text)}
                  value={searchValue}
                />
              ) : null}
            </View>
            {search && (
              <TouchableOpacity
                onPress={onPress1 ? onPress1 : onSearchHandler}
                activeOpacity={0.8}>
                <LinearGradient
                  start={{x: 1, y: 0.0}}
                  end={{x: 1, y: 1.9}}
                  colors={['#5DF7B8', '#3109FB']}
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: borderRadius || 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Icon
                    type="AntDesign"
                    name="search1"
                    style={{color: 'white', fontSize: 24}}
                  />
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </>
  );
};

export {HomeHeader};

const styles = StyleSheet.create({});
