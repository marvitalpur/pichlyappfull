import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {AppButton} from '../../../components';

const MainAuth = props => {
  const {navigation} = props;
  return (
    <>
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />
      <SafeAreaView style={styles.screenContainer}>
        <View style={styles.screenBody}>
          <View
            style={{
              width: '100%',
              height: 200,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 24,
                color: 'black',
                fontWeight: 'bold',
                letterSpacing: 0.5,
              }}>
              Welcome
            </Text>
          </View>
          <View style={styles.authButtonContainer}>
            <View style={styles.authButton}>
              <AppButton
                label="Login"
                onPress={() => navigation.navigate('login')}
              />
            </View>
            <View style={styles.authButton}>
              <AppButton
                label="Signup"
                onPress={() => navigation.navigate('signup')}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default MainAuth;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: 'white',
  },

  screenBody: {
    width: '90%',
    height: '100%',
    alignSelf: 'center',
    position: 'relative',
  },

  authButtonContainer: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
  },

  authButton: {
    width: '48%',
    backgroundColor: 'black',
    borderRadius: 8,
  },
});
