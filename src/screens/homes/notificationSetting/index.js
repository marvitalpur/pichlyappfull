
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
    ScrollView,
    StatusBar,
    Switch,
    FlatList,
    statusBarStyle, statusBarTransition, hidden
} from 'react-native'
import React, { useState } from 'react'
import { Images } from '../../../constants'
import { Box, Header, Switch1 } from '../../../components'
import { Textarea } from 'native-base'


const NotificationSetting = (props) => {



    const data = [



        { text: "Posts" },
        { text: "Stories" },

        { text: "Comments & Mention" },

        { text: "Following" },

        { text: "Messages" },



    ]

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
                            text="Notifications Setting"
                            onPress={() => {
                                props.navigation.goBack();
                            }}
                        />
                    </View>
                    <View style={styles.screenBody}>

                        <View style={styles.whitebox}>
                            <View>

                                <View style={{ width: '90%', alignSelf: 'center', paddingTop: 15, marginVertical: 10 }}>
                                    <Text style={{
                                        fontWeight: 'bold', color: '#000',
                                        fontSize: 18
                                    }}>In App notification</Text>
                                </View>

                                <FlatList
                                    data={data}
                                    renderItem={({ item }) => {
                                        return (
                                            <View>
                                                <Switch1
                                                    text={item.text}
                                                />
                                            </View>
                                        )
                                    }}
                                />
                                <View style={{ width: '90%', alignSelf: 'center', paddingTop: 15, marginVertical: 10 }}>
                                    <Text style={{
                                        fontWeight: 'bold', color: '#000',
                                        fontSize: 18
                                    }}>Email Notification</Text>
                                </View>

                                <FlatList
                                    data={data}
                                    renderItem={({ item }) => {
                                        return (
                                            <View>
                                                <Switch1
                                                    text={item.text}
                                                />
                                            </View>
                                        )
                                    }}
                                />
                            </View>
                        </View>
                    </View>

                </View>
            </ScrollView>
        </ImageBackground >
    )
}

export default NotificationSetting

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingBottom: 10
    },

    screenHeader: {
        width: '90%',
        height: 80,
        marginTop: 10,
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
        height: '100%'
        // alignSelf: 'center',


    },
    whitebox: {
        width: '90%',
        height: '100%',
        borderRadius: 10,
        backgroundColor: '#fff',
        alignSelf: 'center',
        elevation: 2,
        // paddingVertical: 30


        // justifyContent: 'space-around'

    },



})  