import {Icon} from 'native-base';
import React from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const AppButton = ({
  onPress,
  label,
  iconBG,
  iconN,
  iconT,
  iconL,
  iconR,
  buttonStyle,
  color,
  backgroundColor,
  borderColor,
  borderWidth,
  LinearColor1,
  LinearColor2,
  height,
  Radius,
  borderRadius,
  right,
  left,
  isLoading,
}) => {
  const icon = iconL || iconR;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      disabled={isLoading}>
      <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 1.1, y: 0.0}}
        colors={[LinearColor1 || '#ffffff', LinearColor2 || '#ffffff']}
        style={
          buttonStyle || {
            width: '100%',
            height: height || 51,
            borderRadius: borderRadius || 10,
            borderColor: borderColor || '#707070',
            borderWidth: borderWidth || 0,
            backgroundColor: backgroundColor || '#FFFFFF',
            justifyContent: 'center',
            alignItems: 'center',
          }
        }>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            colors={[LinearColor1 || '#ffffff', LinearColor2 || '#ffffff']}
            animating={isLoading}
          />
        ) : (
          <Text style={{color: color || 'white',fontSize:10}}> {label} </Text>
        )}
        {icon && (
          <View
            style={{
              width: 35,
              height: 35,
              backgroundColor: iconBG || 'pink',
              borderRadius: Radius || 8,
              position: 'absolute',
              right: iconR ? 15 : null,
              left: iconL ? 15 : null,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: right || 0,
              marginLeft: left || 0,
            }}>
            <Icon
              name={iconN || 'right'}
              type={iconT || 'AntDesign'}
              style={{fontSize: 20, color: '#fff'}}
            />
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export {AppButton};
