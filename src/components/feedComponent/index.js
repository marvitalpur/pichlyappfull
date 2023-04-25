import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {AllMixed} from '../All';
import {Talent} from '../Talent';
import {Services} from '../Services';
import {Product} from '../Product';

const FeedComponent = ({userId, home, feture, isfocused}) => {
  const [check, setcheck] = useState({
    value: 'PITCHLY FEED',
  });
  // console.log('feed compoenent ', userId);
  console.log('feed component');
  return (
    <View>
      <View
        style={{
          width: '100%',
          height: 35,
          marginTop: 20,
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: '40%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
          }}>
          {/* PRODUCTS FEED */}
          <Text style={{color: 'black', fontWeight: 'bold'}}>
            {check.value}
          </Text>
        </View>
        <LinearGradient
          start={{x: 1.5, y: 1.0}}
          end={{x: 1.5, y: 2.5}}
          colors={['#28A9F61A', '#4C9BD2']}
          style={{
            width: '60%',
            height: '100%',
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'space-evenly',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => setcheck({...check, value: 'PITCHLY FEED'})}
            style={{
              // backgroundColor: 'red',
              paddingBottom: check.value == 'PITCHLY FEED' ? 2 : null,
              borderBottomWidth: check.value == 'PITCHLY FEED' ? 1 : null,
              borderColor: check.value == 'PITCHLY FEED' ? 'blue' : null,
            }}>
            <Text
              style={{
                fontSize: 11,
                fontWeight: 'bold',
                color: check.value == 'PITCHLY FEED' ? 'blue' : 'black',
              }}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setcheck({...check, value: 'TALENT FEED'})}
            style={{
              // backgroundColor: 'red',
              paddingBottom: check.value == 'TALENT FEED' ? 2 : null,
              borderBottomWidth: check.value == 'TALENT FEED' ? 1 : null,
              borderColor: check.value == 'TALENT FEED' ? 'blue' : null,
            }}>
            <Text
              style={{
                fontSize: 11,
                fontWeight: 'bold',
                color: check.value == 'TALENT FEED' ? 'blue' : 'black',
              }}>
              Talent
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setcheck({...check, value: 'SERVICES FEED'})}
            style={{
              // backgroundColor: 'red',
              paddingBottom: check.value == 'SERVICES FEED' ? 2 : null,
              borderBottomWidth: check.value == 'SERVICES FEED' ? 1 : null,
              borderColor: check.value == 'SERVICES FEED' ? 'blue' : null,
            }}>
            <Text
              style={{
                fontSize: 11,
                fontWeight: 'bold',
                color: check.value == 'SERVICES FEED' ? 'blue' : 'black',
              }}>
              Services
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setcheck({...check, value: 'PRODUCTS FEED'})}
            style={{
              // backgroundColor: 'red',
              paddingBottom: check.value == 'PRODUCTS FEED' ? 2 : null,
              borderBottomWidth: check.value == 'PRODUCTS FEED' ? 1 : null,
              borderColor: check.value == 'PRODUCTS FEED' ? 'blue' : null,
            }}>
            <Text
              style={{
                fontSize: 11,
                fontWeight: 'bold',
                color: check.value == 'PRODUCTS FEED' ? 'blue' : 'black',
              }}>
              Products
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
      {check.value === 'PITCHLY FEED' && (
        <AllMixed
          SuggestFriend={true}
          feture={feture}
          userId={userId}
          home={home}
          featuredPost={false}
        />
      )}
      {check.value === 'TALENT FEED' && (
        <Talent
          featuredPost={false}
          feture={feture}
          userId={userId}
          home={home}
        />
      )}
      {check.value === 'SERVICES FEED' && (
        <Services
          featuredPost={false}
          feture={feture}
          userId={userId}
          home={home}
        />
      )}
      {check.value === 'PRODUCTS FEED' && (
        <Product
          featuredPost={false}
          feture={feture}
          userId={userId}
          home={home}
        />
      )}
    </View>
  );
};

export default FeedComponent;

const styles = StyleSheet.create({});
