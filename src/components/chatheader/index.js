import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';




const ChatHeader = ({ username, bio, picture, onlineStatus, onPress, borderRadius }) => {

    return (
        <View style={styles.container}>


            <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
                <LinearGradient
                    start={{ x: 1, y: 0.0 }}
                    end={{ x: 1, y: 1.9 }}
                    colors={['#5DF7B8', '#3109FB']}
                    style={{
                        width: 35,
                        height: 35,
                        borderRadius: borderRadius || 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Icon
                        type="AntDesign"
                        name="left"
                        style={{ color: 'white', fontSize: 24 }}
                    />
                </LinearGradient>
            </TouchableOpacity>

            <View style={styles.profileOptions}>
                <TouchableOpacity style={styles.profile}>
                    <Image style={styles.image} source={{ uri: picture }} />
                    <View style={styles.usernameAndOnlineStatus}>
                        <Text style={styles.username}>{username}</Text>
                        <Text style={styles.onlineStatus}>{onlineStatus}</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.options}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("ChatScreen1", {
                            username: username,
                            picture: picture
                        })}
                        style={{ paddingHorizontal: 5 }}
                    >

                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingHorizontal: 20 }}>

                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignSelf: 'center',
        flexDirection: "row",

        paddingTop: 40,
        paddingBottom: 10,
    },
    backButton: {
        alignSelf: "center",
        paddingHorizontal: 10,
    },
    profileOptions: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    profile: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#fff",
        flex: 4,
    },
    image: {
        height: 65,
        width: 65,
        borderRadius: 32.5,
    },
    usernameAndOnlineStatus: {
        flexDirection: "column",
        justifyContent: "center",
        paddingHorizontal: 10,
    },
    username: {

        fontSize: 18,
        fontWeight: "bold",
    },
    onlineStatus: {

        fontSize: 16,
    },
    options: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    },
});

export { ChatHeader }