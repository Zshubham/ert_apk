import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, FlatList, SafeAreaView, Image, TextInput, ActivityIndicator } from 'react-native';
import { PostCommetsData, commentCountData, getProfileCommentData } from '../Actions/index';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Icon from 'react-native-vector-icons/AntDesign';
import { BottomSheet } from 'react-native-elements';

const CommentScreen = (props) => {



    const PostId = props.route.params.postId
    const token = useSelector(state => state.auth.token)
    const CommentData = useSelector(state => state.feed.postCommentData)
    const dispatch = useDispatch();
    const [Comment, setComment] = useState('');
    const Color = '#43D9BD'

    useEffect(() => {
        dispatch(PostCommetsData(''))
        const data = new FormData()
        data.append('server_key', '5bda6652fe66a3e69331fb4d655db3ba')
        data.append('type', 'fetch_comments')
        data.append('post_id', PostId)

        const url = 'https://notifyx.site/hivedin6/api/comments?access_token=' + token
        axios.post(url, data)
            .then(async (res) => {
                // console.log(res.data.data[0].publisher)
                if (res.data.api_status == 200) {
                    dispatch(PostCommetsData(res.data.data))
                    // console.log(res.data.data)
                }
            })

    }, [])

    const onPressComment = () => {
        const data = new FormData()
        data.append('server_key', '5bda6652fe66a3e69331fb4d655db3ba')
        data.append('type', 'create')
        data.append('post_id', PostId)
        data.append('text', Comment)

        const url = 'https://notifyx.site/hivedin6/api/comments?access_token=' + token
        axios.post(url, data)
            .then(async (res) => {
                // console.log(res.data.data[0].publisher)
                if (res.data.api_status == 200) {
                    dispatch(commentCountData(PostId, res.data.data))
                    dispatch(getProfileCommentData(PostId, res.data.data))
                    // renderLetestPost()
                    setComment('')
                    //dispatch(PostCommetsData(res.data.data))
                    console.log(res.data.data)
                }
            })
    }



    // console.log(CommentData)
    return (
        <SafeAreaView style={{ flex: 2, backgroundColor: '#101726' }}>
            {CommentData ?
                <View>
                    <FlatList
                        keyExtractor={(item, index) => String(index)}
                        data={CommentData}
                        renderItem={({ item }) => {
                            return <View style={{
                                backgroundColor: 'white',
                                marginTop: 10,
                                width: '95%',
                                height: 70,
                                padding: 5,
                                alignSelf: 'center',
                                borderRadius: 10,
                            }}>
                                <View flexDirection="row" alignItems="center">
                                    <Image
                                        source={{
                                            uri: item.publisher.avatar

                                        }}
                                        style={{
                                            marginTop: 10,
                                            marginLeft: 10,
                                            height: 40,
                                            width: 40,
                                            borderRadius: 35,
                                        }} />
                                    <View>
                                        <Text style={{ fontWeight: 'bold', marginRight: 10, marginTop: 18, marginLeft: 10 }}>{item.publisher.name}</Text>
                                        <Text style={{ marginLeft: 10, marginTop: 2, fontSize: 9, color: 'gray' }}>{item.time}</Text>
                                    </View>
                                    <Text style={{ color: 'gray', marginTop: 10 }}>{item.text}</Text>
                                </View>

                            </View>

                        }
                        }
                    />
                </View>
                : <View>
                    <Text
                        style={{
                            alignSelf: 'center',
                            marginTop: 290,
                            marginBottom: 10,
                            color: Color
                        }}>Data is loading...</Text>
                    <ActivityIndicator
                        size="large"
                        color="#43D9BD"
                    />
                </View>}
            <View
                style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    backgroundColor: '#2E3D59',
                    marginTop: 10,
                    borderRadius: 10,
                    position: 'absolute',
                    bottom: 10
                }}>
                <TextInput
                    placeholder='Comment'
                    placeholderTextColor='#49F2C2'
                    underlineColorAndroid='#2E3D59'
                    style={{
                        marginLeft: 10,
                        alignSelf: 'center',
                        height: 70,
                        width: 290,
                        color: 'gray',
                        fontWeight: 'bold'
                    }}
                    onChangeText={text => setComment(text)}
                    value={Comment}
                />
                <Pressable
                    onPress={() => onPressComment()}
                >
                    <View style={{ backgroundColor: '#49F2C2', height: 70, width: 68, alignItems: 'center', borderBottomRightRadius: 10, borderTopRightRadius: 10 }}>
                        <Icon name="enter" size={30} color='#2E3D59' style={{ marginTop: 20 }} />
                    </View>
                </Pressable>
            </View>
        </SafeAreaView>

    )
}

export default CommentScreen;