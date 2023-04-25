import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Policies = ({
  text,
  fontSize,
  fontWeight,
  color,
  termAndCondition,
  privacyPolicy,
}) => {
  return (
    <View style={{ width: '100%' }}>
      {termAndCondition && (
        <Text
          style={{
            fontSize: fontSize || 14,
            fontWeight: fontWeight || 'normal',
            color: color || '#000000',
            letterSpacing: 0.5,
            marginTop: 15,
          }}>
          {text}
        </Text>
      )}
      {privacyPolicy && (
        <Text
          style={{
            fontSize: fontSize || 14,
            fontWeight: fontWeight || 'normal',
            color: color || '#000000',

          }}>
          {text}
        </Text>
      )}
    </View>
  );
};

export { Policies };

const styles = StyleSheet.create({});
