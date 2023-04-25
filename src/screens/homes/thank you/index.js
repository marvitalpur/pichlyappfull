import React from 'react';
import { useEffect } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    ImageBackground,
    StatusBar,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    hidden, statusBarStyle, statusBarTransition
} from 'react-native';
import { Images } from '../../../constants';
import { useRoute } from '@react-navigation/native';
import { AppButton } from '../../../components';
import MyTabs from '../../../navigation/bottomTab';
const height = Dimensions.get('window').height / 2.5;
const width = Dimensions.get('window').width;
const ThankYouScreen = ({ route, navigation }) => {
    // useEffect(() => {
    //   setTimeout(() => {
    //     navigation.replace('mainAuth');
    //   }, 1500);
    // }, []);




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
                <View style={styles.ScreenBody}>

                    <View style={[styles.connect]}>
                        <Image
                            source={Images.Icons.yes}
                            resizeMode={'contain'}
                            style={{ width: '100%', height: '100%' }}
                        />
                    </View>
                    <View style={styles.texts}>

                        <Text style={styles.headerText1}>
                            Thank You
                        </Text>
                        <Text style={styles.headerText2}>
                            Your Payment Processed
                        </Text>
                        <Text style={styles.headerText2}>
                            Your Premium Membership is under review now, you will be intimated once it is approved
                        </Text>
                    </View>
                    <View style={styles.authButtonContainer}>
                        <View style={styles.authButton}>
                            <AppButton
                                LinearColor1={'#5DF7B8'}
                                LinearColor2={'#3109FB'}
                                color={'white'}
                                borderWidth={0.5}
                                borderColor={'#707070'}
                                backgroundColor={'#FFFFFF'}
                                label=" Continue "
                                onPress={() => navigation.replace('MyTabs', { screen: 'profile' })}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>

    );
};

export default ThankYouScreen;

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },

    ScreenBody: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    connect: {
        width: 142,
        height: 141,
        // aspectRatio: 1,
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 15
    },
    connectImg: {
        width: '100%',
        height: '100%',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    texts: {
        marginVertical: 10,
        width: '90%'
    },

    headerText1: {
        fontSize: 22,
        fontWeight: 'bold', color: '#000000',
        textAlign: 'center',
        marginVertical: 5
    },
    headerText2: {
        marginTop: 5,
        fontSize: 15,
        fontWeight: '500',
        color: '#000000',
        textAlign: 'center',
        marginVertical: 10,
        letterSpacing: 1.5
    },
    authButtonContainer: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 30,
    },
    authButton: {
        width: '80%', alignSelf: 'center'
    }
});

