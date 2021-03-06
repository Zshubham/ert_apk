import React, { useState } from 'react';
import { Text, TextInput, View, StatusBar, Pressable, ScrollView, ActivityIndicator, } from 'react-native';
import { login } from '../Actions';
import { useDispatch } from 'react-redux';

const Login = (props) => {
    const Color = '#43D9BD';
    // this color veriable is used by all the textinput in user in put colors

    const [username, setUsename] = React.useState('');
    const [password, setPassword] = React.useState('');
    const dispatch = useDispatch();
    // this dispatch veriable is for using for all the action in dispatch finction 
    const [lodingIndicator, setloadingIndicator] = useState(false);
    // these all useState is for storing user credentials and post them over api calls

    const onPressLogin = () => {
        dispatch(login(username, password, (item) => setloadingIndicator(item)));
        // this used for show loading indicator in login screen

    }
    // all ui ui component use for user login screen
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#101726'
            }}>
            <StatusBar
                barStyle="light-content"
                backgroundColor="#101726"
                translucent={true}
            />
            {lodingIndicator ? <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                }}>
                <ActivityIndicator size="large" color="#43D9BD" />
                <Text
                    style={{
                        marginTop: 10,
                        alignSelf: 'center',
                        fontWeight: 'bold',
                        color: Color
                    }}
                >please wait...</Text>
            </View> : <ScrollView>
                <Text style=
                    {{
                        fontSize: 45,
                        fontWeight: 'bold',
                        marginStart: 45,
                        marginTop: 150,
                        color: '#43D9BD'

                    }} >Welcome</Text>
                <Text style=
                    {{
                        fontSize: 45,
                        fontWeight: 'bold',
                        // alignSelf: 'center',
                        marginTop: 0,
                        marginStart: 45,
                        color: '#43D9BD'

                    }} >Back</Text>
                {/* this textinput is for login user is here */}
                <TextInput
                    placeholder='Username'
                    placeholderTextColor='#43D9BD'
                    keyboardType='email-address'
                    underlineColorAndroid='#43D9BD'

                    style=
                    {{
                        alignSelf: 'center',
                        height: 60,
                        width: '75%',
                        marginTop: 150,
                        color: Color

                    }}
                    onChangeText={text => setUsename(text)}
                    value={username}
                />
                {/* and this one is used for user password */}
                <TextInput
                    placeholder='Password'
                    placeholderTextColor='#43D9BD'
                    underlineColorAndroid='#43D9BD'
                    style=
                    {{
                        alignSelf: 'center',
                        height: 60,
                        width: '75%',
                        color: Color

                    }}
                    onChangeText={text => setPassword(text)}
                    value={password}
                />
                {/* this button is for login user */}
                <Pressable
                    onPress={() => onPressLogin()}
                    style={{
                        height: 60,
                        width: '80%',
                        backgroundColor: '#2E3D59',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        marginTop: 20,
                        borderRadius: 30,
                        elevation: 5
                    }}>
                    <Text
                        style={{
                            alignSelf: 'center',
                            color: 'white',
                            fontWeight: 'bold'
                        }}
                    >Login</Text>
                </Pressable>
                {/* this one is used to sign in or register */}
                <Pressable
                    style={{
                        height: 60,
                        width: '80%',
                        alignSelf: 'center',
                        backgroundColor: '#2E3D59',
                        justifyContent: 'center',
                        marginTop: 20, marginBottom: 20,
                        borderRadius: 30, borderColor: '#43D9BD',
                        borderWidth: 2,
                    }}
                    onPress={() => props.navigation.navigate('Register')}
                >
                    <Text
                        style={{
                            alignSelf: 'center',
                            color: '#43D9BD',
                            fontWeight: 'bold'
                        }}
                    >Signup</Text>
                </Pressable>

            </ScrollView>}
        </View>

    )
}

export default Login;