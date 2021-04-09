import React, { useState } from 'react';
import { CreateNewPost } from '../Actions/index';
import { useDispatch } from 'react-redux';
import {
    ToastAndroid,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    SafeAreaView,
    Image,
    Pressable,
    ActivityIndicator,
    ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    BottomSheet,
    ListItem
} from 'react-native-elements';
//import ImagePicker from 'react-native-image-picker';
import {
    launchCamera,
    launchImageLibrary
} from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import axios from 'axios';


const options = {
    title: 'Select Image',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};






const CreatePost = (props) => {

    const token = useSelector(state => state.auth.token)
    const dispatch = useDispatch();
    const getUserId = useSelector(state => state.auth.userid)


    const [postText, setPostText] = useState('')
    const [getimage, setimage] = useState('https://image.cnbcfm.com/api/v1/image/105992231-1561667465295gettyimages-521697453.jpeg?v=1561667497&w=1600&h=900');
    const [isVisible, setIsVisible] = useState(false);
    const [response, setresponse] = useState('response');
    const [lodingIndicator, setloadingIndicator] = useState(false);






    const openPicker = () => {
        launchCamera(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = { uri: response.uri };
                setimage(response.uri)
                setresponse(response)
            };

        });
    };


    const openPicker1 = () => {
        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = { uri: response.uri };
                setimage(response.uri)
                setresponse(response)
            };

        });
    };





    //for camera picur




    //for launching image galleri






    const list = [
        {
            title: 'Camera', titleStyle: { fontWeight: 'bold' },
            containerStyle: { backgroundColor: 'slateblue' },
            titleStyle: { color: 'white' },
            onPress: () => { openPicker(), setIsVisible(false) }



        },
        {
            title: 'choose from file',
            titleStyle: { fontWeight: 'bold' },
            containerStyle: { backgroundColor: 'slateblue' },
            titleStyle: { color: 'white' },
            onPress: () => { openPicker1(), setIsVisible(false) }
        },
        {
            title: 'Cancel',
            containerStyle: { backgroundColor: 'red' },
            titleStyle: { color: 'white' },
            onPress: () => setIsVisible(false),
        },
    ];



    const onPressPost = () => {
        dispatch(CreateNewPost(postText, response, token, getUserId, (item) => setloadingIndicator(item), () => props.navigation.goBack()));
    }





    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#101726' }}>
            {lodingIndicator ? <View style={{ flex: 1, justifyContent: 'center', }}>
                <ActivityIndicator size="large" color="slateblue" />
            </View>
                : <ScrollView>
                    <View>

                        <View
                            style={{
                                marginTop: 20,
                                alignItems: 'center'
                            }} >
                            <Image source={
                                { uri: getimage }
                            }
                                style={{
                                    height: 320,
                                    width: '90%',
                                    borderRadius: 10
                                }} />
                            <TouchableOpacity
                                onPress={() => setIsVisible(true)}
                                style={{
                                    backgroundColor: '#2E3D59',
                                    width: 255,
                                    height: 55,
                                    position: 'absolute',
                                    bottom: -25,
                                    alignSelf: 'center',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 10,
                                    elevation: 5
                                }}>
                                <Icon name='camera' size={25} color='#49F2C2' />
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            placeholder='Text'
                            placeholderTextColor='#49F2C2'
                            underlineColorAndroid='#49F2C2'
                            multiline={true}
                            style={{
                                alignSelf: 'center',
                                height: 90,
                                width: '80%',
                                color: '#49F2C2',
                                fontWeight: 'bold',
                                fontSize: 25,
                                marginTop: 20,
                            }}
                            onChangeText={text => setPostText(text)}
                            value={postText}
                        />

                        <BottomSheet
                            isVisible={isVisible}
                            containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
                        >
                            {list.map((l, i) => (
                                <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
                                    <ListItem.Content>
                                        <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
                                    </ListItem.Content>
                                </ListItem>
                            ))}
                        </BottomSheet>
                        <Pressable
                            onPress={() => onPressPost()}
                            style={{
                                height: 60,
                                width: '60%',
                                backgroundColor: '#2E3D59',
                                alignSelf: 'center',
                                justifyContent: 'center',
                                marginTop: 20,
                                marginBottom: 20,
                                borderRadius: 30,
                                elevation: 5
                            }}>
                            <Text
                                style={{
                                    alignSelf: 'center',
                                    color: '#49F2C2',
                                    fontWeight: 'bold'
                                }}
                            >Post</Text>
                        </Pressable>
                    </View>
                </ScrollView>}
        </SafeAreaView>
    )
}

export default CreatePost;