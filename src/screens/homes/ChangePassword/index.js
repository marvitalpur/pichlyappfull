import {
    StyleSheet, Text, View, ImageBackground,
    Image,
    ScrollView, StatusBar, Switch, TextInput, hidden, statusBarStyle, statusBarTransition
} from 'react-native'
import React, { useState } from 'react'
import { Images } from '../../../constants'
import { Box, Header, AppButton } from '../../../components'
import { color } from 'react-native-elements/dist/helpers'
import { userRequest } from '../../../makeRequest';
import { useSelector } from 'react-redux'
import { showToast } from '../../../showToast'



const ChangePassword = (props) => {

    const user = useSelector(state =>state.user.loggedInUser);
    const [state,setState] = useState({
        password:'',
        confirmpassword:'',
        currentpassword:''
    })
    const [isLoading,setIsLoading] = useState(false);

    const onChangePasswordHandler = async() =>{
        
        try{
            const data = {
                currentpassword: state.currentpassword,
                password:state.password,
                confirmpassword:state.confirmpassword
            }
            setIsLoading(true);
            const res = await userRequest('put',`/updatePassword/${user._id}`,'',data,user.token);

            if(res.status == 200){
                showToast('success','Password Changed SuccessFully');
                setIsLoading(false);
                props.navigation.replace('Homes', { screen: 'accountsettings' })
            }
            else{
                showToast('error','something went wrong please try again')
                setIsLoading(false);
            }
        }
        catch(err){
            showToast('error',err.response.data.message)
            setIsLoading(false);
        }
    }

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
                            text="Change Password"
                            onPress={() => {
                                props.navigation.goBack();
                            }}
                        />
                    </View>
                    <View style={styles.screenBody}>

                        <View style={styles.inputView}>
                            <View style={styles.input}>
                                <TextInput value={state.currentpassword} onChangeText={(value)=>{
                                    setState({...state,currentpassword:value})
                                }} 
                                placeholder='Current Password' />
                            </View>
                            <View style={styles.input}>
                                <TextInput value={state.password} onChangeText={(value)=>{
                                    setState({...state,password:value})
                                }}  placeholder='New Password' />
                            </View>
                            <View style={styles.input}>
                                <TextInput value={state.confirmpassword} onChangeText={(value)=>{
                                    setState({...state,confirmpassword:value})
                                }}  placeholder='Confirm Password' />
                            </View>

                        </View>

                        <View style={{ width: '70%', alignSelf: 'center' }}>
                            <AppButton
                                isLoading={isLoading}
                                LinearColor1={'#5DF7B8'}
                                LinearColor2={'#3109FB'}
                                color={'white'}
                                borderWidth={0.5}
                                borderColor={'#707070'}
                                backgroundColor={'#FFFFFF'}
                                label="Done"
                                onPress={onChangePasswordHandler}
                            />
                        </View>

                    </View>

                </View>
            </ScrollView>
        </ImageBackground >
    )
}

export default ChangePassword

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
    },

    screenHeader: {
        width: '90%',
        height: 80,
        marginTop: 20,
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

    },
    cardbox: {
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: "space-between"

    },
    imageView: {
        width: 50, height: 30,

    },

    cardimg: {
        width: '100%',
        height: '100%',
    },

    inputView:
        { width: '80%', alignSelf: 'center', marginVertical: 35 },
    input: {
        backgroundColor: '#E9EBEF', paddingLeft: 6,
        borderRadius: 5, borderWidth: 0.25,
        borderColor: "#aaa", marginVertical: 10
    }


})  