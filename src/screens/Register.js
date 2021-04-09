import axios from 'axios';
import React, { useState } from 'react';
import { Text, TextInput, View, StatusBar, Pressable, ScrollView } from 'react-native';

const Register = () => {
    const Color = '#43D9BD';
    const [username, setUsename] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [confirmpassword, setConfirmPassword] = React.useState('');
    const [phone, setPhone] = React.useState('');

    const onPressSignup = () => {
        let data = new FormData()
        data.append('username', username)
        data.append('password', password)
        data.append('email', email)
        data.append('confirm_password', confirmpassword)
        data.append('server_key', '5bda6652fe66a3e69331fb4d655db3ba')
        data.append('phone_num', phone)

        const url = 'https://notifyx.site/hivedin6/api/create-account'
        axios.post(url, data)
            .then((res) => {
                console.log(res.data)
            })
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#101726' }}>
            <StatusBar barStyle="light-content" backgroundColor="#101726" translucent={true} />
            <ScrollView>
                <Text style=
                    {{
                        fontSize: 45,
                        fontWeight: 'bold',
                        // alignSelf: 'center',
                        marginTop: 100,
                        marginStart: 45,
                        color: '#43D9BD'

                    }} >Create</Text>
                <Text style=
                    {{
                        fontSize: 45,
                        fontWeight: 'bold',
                        // alignSelf: 'center',
                        marginStart: 45,
                        color: '#43D9BD'

                    }} >Account</Text>
                <TextInput
                    placeholder='Username'
                    placeholderTextColor='#43D9BD'
                    underlineColorAndroid='#43D9BD'
                    style=
                    {{
                        alignSelf: 'center',
                        height: 60,
                        width: '80%',
                        marginTop: '20%',
                        color: Color

                    }}
                    onChangeText={text => setUsename(text)}
                    value={username}
                />
                <TextInput
                    placeholder='Email'
                    placeholderTextColor='#43D9BD'
                    underlineColorAndroid='#43D9BD'
                    style=
                    {{
                        alignSelf: 'center',
                        height: 60,
                        width: '80%',
                        color: Color

                    }}
                    onChangeText={text => setEmail(text)}
                    value={email}
                />
                <TextInput
                    placeholder='Password'
                    placeholderTextColor='#43D9BD'
                    underlineColorAndroid='#43D9BD'
                    style=
                    {{
                        alignSelf: 'center',
                        height: 60,
                        width: '80%',
                        color: Color

                    }}
                    onChangeText={text => setPassword(text)}
                    value={password}
                />
                <TextInput
                    placeholder='Confirm password'
                    placeholderTextColor='#43D9BD'
                    underlineColorAndroid='#43D9BD'
                    style=
                    {{
                        alignSelf: 'center',
                        height: 60,
                        width: '80%',
                        color: Color

                    }}
                    onChangeText={text => setConfirmPassword(text)}
                    value={confirmpassword}
                />
                <TextInput
                    placeholder='Phone number'
                    placeholderTextColor='#43D9BD'
                    underlineColorAndroid='#43D9BD'
                    keyboardType='phone-pad'
                    style=
                    {{
                        alignSelf: 'center',
                        height: 60,
                        width: '80%',
                        color: Color

                    }}
                    onChangeText={text => setPhone(text)}
                    value={phone}
                />
                <Pressable onPress={() => onPressSignup()} style={{ height: 60, width: '80%', backgroundColor: '#2E3D59', alignSelf: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 20, borderRadius: 30, elevation: 5, }}>
                    <Text style={{ alignSelf: 'center', color: '#43D9BD', fontWeight: 'bold' }}>Register</Text>
                </Pressable>
            </ScrollView>


        </View>

    )
}

export default Register;