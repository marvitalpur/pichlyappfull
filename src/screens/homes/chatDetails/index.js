import {
    StyleSheet, Text, View, ImageBackground,
    Image,
    ScrollView, StatusBar, Switch, hidden, statusBarTransition, statusBarStyle
} from 'react-native'
import React, { useState } from 'react'
import { Images } from '../../../constants'
import { Box, Header } from '../../../components'
const ChatDetails = ({ onSwitch, navigation }) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
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
                            header2={true}
                            hiddinText1
                            text1="Details"
                            headertext2={true}
                            onPress1={() => {
                                navigation.goBack();
                            }}
                        />
                    </View>
                    <View style={styles.screenBody}>
                        <View style={styles.profileImageContainer}>
                            <View style={styles.profileImage}>
                                <Image
                                    source={Images.Pictures.statusImg2}
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </View>
                            <View style={styles.profileText}>
                                <Text style={styles.profilename}>Vani</Text>
                                <Text style={styles.profiletext}>@veni_official</Text>
                            </View>
                        </View>
                        <View style={styles.whitebox}>
                            <View
                                style={{
                                    width: '75%',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                }}>
                                <View style={{ paddingLeft: 15 }}>
                                    <Text style={{
                                        color: '#323232',
                                        fontSize: 15, fontWeight: 'bold'
                                    }}>Mute Messages
                                    </Text>
                                </View>
                            </View>
                            <View style={{ width: '20%', marginTop: 10 }}>
                                <Switch
                                    disabled={false}
                                    value={isEnabled}
                                    onValueChange={toggleSwitch}
                                    onChange={onSwitch}
                                    trackColor={{
                                        true: '#3109FB',
                                        false: '#C2C2C2',
                                    }}
                                    thumbColor={'#FFFFFF'}
                                    size="lg"
                                />
                            </View>
                        </View>
                        <View style={[styles.whitebox1]}>
                            <View style={{
                                width: '90%', flexDirection: 'row',
                                justifyContent: 'space-between', alignSelf: 'center'
                            }}>
                                <View style={{}}>
                                    <Text style={{
                                        color: '#323232',
                                        fontSize: 18, fontWeight: '700'
                                    }}>Shared
                                    </Text>
                                </View>
                                <View style={{}}>
                                    <Text style={{
                                        color: '#3109FB',
                                        fontSize: 12, fontWeight: 'bold'
                                    }}> See all
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                <View style={styles.ItemImage}>
                                    <Image
                                        source={Images.Pictures.item1}
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                </View>
                                <View style={styles.ItemImage}>
                                    <Image
                                        source={Images.Pictures.item2}
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                </View>
                                <View style={styles.ItemImage}>
                                    <Image
                                        source={Images.Pictures.item3}
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                </View>
                                <View style={styles.ItemImage}>
                                    <Image
                                        source={Images.Pictures.item4}
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.whitebox3}>
                            <View
                                style={{
                                    width: '75%',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                }}>
                                <View style={{ paddingLeft: 15 }}>
                                    <Text style={{
                                        color: '#323232',
                                        fontSize: 14, fontWeight: 'bold'
                                    }}>
                                        Report
                                    </Text>
                                    <Text style={{
                                        color: 'red',
                                        fontSize: 12, fontWeight: 'bold'
                                    }}>
                                        Block
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground >
    )
}

export default ChatDetails

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
    },

    screenHeader: {
        width: '90%',
        height: 50,
        marginTop: 30,
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
        height: '20%',
        alignSelf: 'center',

    },
    profileImageContainer: {
        width: 100,
        height: 82,
        alignSelf: 'center',
        alignItems: 'center'
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 100,
        overflow: 'hidden',
        alignItems: 'center',

    },

    profileText: {
        width: '100%',
        marginTop: 10
    },
    profilename: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center'
    },
    profiletext: {
        fontSize: 14,
        color: 'black',
        textAlign: 'center'

    },
    whitebox: {
        width: '90%',
        height: 52, borderRadius: 20,
        backgroundColor: '#fff',
        alignSelf: 'center',
        elevation: 2,
        marginTop: 150,
        flexDirection: 'row',
        justifyContent: 'space-around'

    },
    whitebox1: {
        width: '90%',
        height: 143, borderRadius: 20,
        backgroundColor: '#fff',
        alignSelf: 'center',
        elevation: 2,
        marginTop: 30,
        justifyContent: 'space-around'
    },
    ItemImage: {
        width: 82,
        height: 82,
        borderRadius: 10,
        padding: 2,
        overflow: 'hidden',
        alignItems: 'center',

    },
    whitebox3: {
        width: '90%',
        height: 91, borderRadius: 20,
        backgroundColor: '#fff',
        alignSelf: 'center',
        elevation: 5,
        marginTop: 30,
        justifyContent: 'space-around',
        marginBottom: 30
    },

})  