import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import {Images} from '../../constants';
import {Icon} from 'native-base';
const PostBoxCommentSection = ({postComments, staricon, heart}) => {
  useEffect(() => {}, [postComments]);
  return (
    <View
      style={{
        width: '90%',
        height: '100%',
        alignSelf: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          height: '100%',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 5,
            }}>
            <Image
              source={Images.Logos.msgColorIcon}
              style={{width: 19.07, height: 18.74}}
            />
            <Text style={{color: 'black', paddingLeft: 5}}>{postComments}</Text>
          </View>

          <View
            style={{
              marginLeft: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={Images.Logos.shareIcon}
              style={{width: 19.07, height: 18.74}}
            />
            <Text style={{color: 'black', paddingLeft: 5}}>2.4K</Text>
          </View>
          {staricon && (
            <View
              style={{
                marginLeft: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={Images.Icons.Star}
                style={{width: 19.07, height: 18.74}}
              />
              <Text style={{color: 'black', paddingLeft: 5}}>4.2K</Text>
            </View>
          )}

          <View
            style={{
              marginLeft: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {heart === true ? (
              <Icon
                type="AntDesign"
                name="heart"
                style={{
                  color: '#4059E4',
                  fontSize: 20,
                }}
              />
            ) : (
              <Icon
                type="AntDesign"
                name="star"
                style={{
                  color: '#4059E4',
                  fontSize: 20,
                }}
              />
            )}

            <Text style={{color: 'black', paddingLeft: 5}}>4.2K</Text>
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={Images.Logos.favoriteIcon}
            style={{width: 14, height: 17}}
          />
        </View>
      </View>
    </View>
  );
};

export default PostBoxCommentSection;

const styles = StyleSheet.create({});
