
import {
    StyleSheet, Text, View, ImageBackground,
    Image,
    ScrollView, StatusBar, Switch, FlatList
} from 'react-native'
import React, { useState } from 'react'
import { Images } from '../../../constants'
import { Box, Header, Row, Switch1 } from '../../../components'
import { Textarea } from 'native-base'

const Language = (props) => {
    const data = [


        { text: 'English', Image2: Images.Icons.check, },
        { text: "Spanish", },
        { text: "French", },
        { text: "Portuguesgian" },
        { text: "Filipino", },
        { text: "Dansh" },
    ]

    return (
        <ImageBackground
            style={styles.imageContainer}
            source={Images.Pictures.appBg}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}>
                <StatusBar backgroundColor={'transparent'} translucent={true} />
                <View style={{}}>
                    <View style={styles.screenHeader}>
                        <Header

                            BAckButton
                            hiddinText
                            text="Language"
                            onPress={() => {
                                props.navigation.goBack();
                            }}
                        />
                    </View>
                    <View style={styles.screenBody}>
                        <View style={styles.whitebox}>
                            <FlatList
                                data={data}
                                renderItem={({ item }) => {
                                    return (
                                        <Row Row1
                                            text={item.text}
                                            ICON={item.ICON}
                                            Image2={item.Image2}
                                        />
                                    )
                                }}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground >
    )
}
export default Language

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    screenHeader: {
        width: '90%',
        height: 80,
        marginTop: 50,
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
    whitebox: {
        width: '90%',
        height: 774, borderRadius: 10,
        backgroundColor: '#fff',
        alignSelf: 'center',
        elevation: 2,
        // justifyContent: 'space-around'
    },
})  