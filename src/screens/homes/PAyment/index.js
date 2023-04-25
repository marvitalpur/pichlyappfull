import {
    StyleSheet, Text, View, ImageBackground,
    Image,
    ScrollView, StatusBar, Switch, hidden, statusBarStyle, statusBarTransition
} from 'react-native'
import React, { useState } from 'react'
import { Images } from '../../../constants'
import { Box, Header, AppButton, FormInput } from '../../../components'
// import { Textarea } from 'native-base'
import { useRoute } from '@react-navigation/native';
import { showToast } from '../../../showToast';
import { publicRequest } from '../../../makeRequest';

const Payment = ({ route, navigation }) => {

    const { onPress1, onPress2 ,type,postId,plan} = route.params;
    // const route = useRoute();
    const getFeatured= async()=>{
        try{
          const res= await publicRequest.put(`/createFeaturedPost/${postId}`,{type,plan:plan});
        //   console.log(res.data.data);
          if(res.status == 200){
              showToast('success',res.data.message);
              navigation.replace('MyTabs', { screen: 'profile' });
            }
        }
        catch(err){
            console.log(err.response.data.message)
          showToast('error','Something went wrong')
        }
      };
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
                            text="Get Premium"
                            onPress={onPress2}
                        />
                    </View>
                    <View style={styles.screenBody}>
                        <View style={styles.cardbox}>
                            <View style={styles.imageView1}>
                                <Image source={Images.Icons.card2} style={styles.cardimg} />
                            </View>
                            <View style={styles.imageView}>
                                <Image source={Images.Icons.card1} style={styles.cardimg} />
                            </View>
                            <View style={styles.imageView}>
                                <Image source={Images.Icons.card3} style={styles.cardimg} />
                            </View>
                            <View style={styles.imageView}>
                                <Image source={Images.Icons.card4} style={styles.cardimg} />
                            </View>
                            <View style={styles.imageView}>
                                <Image source={Images.Icons.card5} style={styles.cardimg} />
                            </View>
                        </View>


                        <View style={styles.InfotextView}>
                            <View style={{ width: '90%', alignSelf: 'center', marginVertical: 5 }}>
                                <Text style={styles.Infotext}>Credit Card Info</Text>
                            </View>


                            <View style={{ width: '90%', alignSelf: 'center' }}>
                                <View>
                                    <Text style={styles.UserName}>CARD  NUMBER</Text>
                                    <FormInput borderWidth={0.5} placeHolder="0000  0000  0000  0000" />
                                </View>
                                <View>
                                    <Text style={styles.UserName}>CARDHOLDER  NAME</Text>
                                    <FormInput borderWidth={0.5} placeHolder="John Doe" />
                                </View>
                                <View>
                                    <Text style={styles.UserName}>EXPIRE  DATE</Text>
                                    <FormInput borderWidth={0.5} placeHolder="05/21" />
                                </View>
                                <View style={{ width: '50%' }}>
                                    <Text style={styles.UserName}>CVV</Text>
                                    <FormInput borderWidth={0.5} placeHolder="123" />
                                </View>
                            </View>

                        </View>
                        <View style={{ width: '70%', alignSelf: 'center', marginVertical: 10 }}>
                            <AppButton
                                LinearColor1={'#5DF7B8'}
                                LinearColor2={'#3109FB'}
                                color={'white'}
                                borderWidth={0.5}
                                borderColor={'#707070'}
                                backgroundColor={'#FFFFFF'}
                                label="Pay Now"
                                onPress={getFeatured}

                            />
                        </View>

                    </View>

                </View>
            </ScrollView>
        </ImageBackground >
    )
}

export default Payment

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    screenHeader: {
        width: '90%',
        height: 80,
        // marginTop: 20,
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
        // height: '20%',
        alignSelf: 'center',
        marginTop: 20

    },
    cardbox: {
        width: '80%',
        alignSelf: 'center',
        flexDirection: 'row',
        // justifyContent: "space-between"
        justifyContent: 'space-around'
    },
    imageView: {
        width: 50, height: 30,
        elevation: 4
    },
    imageView1: {
        width: 50, height: 30,
        borderWidth: 1,
        borderColor: 'blue',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },


        elevation: 4,
    },

    cardimg: {
        width: '100%',
        height: '100%',
    },

    InfotextView: {
        marginVertical: 30,
        width: '90%',
        alignSelf: 'center'
    },
    Infotext: {
        fontSize: 18,
        color: '#000',
        fontWeight: '700',
        marginVertical: 10
    },
    UserName: {
        fontSize: 16, color: '#000',
        fontWeight: '400', marginVertical: 5,
        marginTop: 10

    },





})  