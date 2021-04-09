import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, SafeAreaView, Image, ScrollView, ToastAndroid, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { UserFeed, getUserPostLikeData, onlike } from '../Actions/index';
import axios from 'axios';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome';


const UserProfile = (props) => {

    const UserId = props.route.params.UserId
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token)
    const userFeedData = useSelector(state => state.feed.userFeedData)
    const [userData, setUserData] = useState('')
    const Color = '#43D9BD'

    useEffect(() => {
        dispatch(UserFeed(''))
        const data = new FormData()
        data.append('server_key', '5bda6652fe66a3e69331fb4d655db3ba')
        data.append('fetch', 'user_data')
        data.append('user_id', UserId)

        const durl = ' https://notifyx.site/hivedin6/api/get-user-data?access_token=' + token
        //console.log(data)
        axios.post(durl, data)
            .then(async (res) => {
                if (res.data.api_status == 200) {
                    //console.log(res.data)
                    get_user_posts()
                    setUserData(res.data.user_data)
                }
            })

        const get_user_posts = () => {
            const data = new FormData()
            data.append('server_key', '5bda6652fe66a3e69331fb4d655db3ba')
            data.append('type', 'get_user_posts')
            data.append('id', UserId)
            data.append('limit', 10)

            const url = ' https://notifyx.site/hivedin6/api/posts?access_token=' + token
            //console.log(data)
            axios.post(url, data)
                .then(async (res) => {
                    //console.log(res.data.data[0].publisher)
                    if (res.data.api_status == 200) {
                        dispatch(UserFeed(res.data.data))

                        //setUserData(res.data.user_data)
                    } else {
                        ToastAndroid.show('Feed not found', ToastAndroid.SHORT)
                    }
                })
        }

    }, [])

    const PressOnlike = (postid, action) => {
        //when like button
        dispatch(onlike(postid, action, token))

    }


    return (
        <SafeAreaView style={{ backgroundColor: '#101726', flex: 1, }}>
            <StatusBar
                barStyle="light-content"
                backgroundColor="#101726"
                translucent={true}
            />
            <View>
                <View>
                    <Image
                        source={{
                            uri: userData.cover
                        }}
                        style={{
                            backgroundColor: 'white',
                            height: 150,
                            width: '100%',
                            resizeMode: 'stretch',
                        }} />
                    <View style={{ position: 'absolute', bottom: -50 }}>
                        <Image
                            source={{
                                uri: userData.avatar
                            }}
                            style={{
                                marginLeft: 10,
                                marginRight: 10,
                                height: 120,
                                width: 120,
                                borderRadius: 100,
                            }} />
                    </View>

                </View>
                <View>
                    <Text style={{ marginLeft: 140, marginBottom: 20, fontSize: 25, fontWeight: 'bold', color: 'white' }}>
                        {userData.name}
                    </Text>
                </View>
                <View>
                    <Text style={{ marginBottom: 5, fontSize: 15, fontWeight: 'bold', alignSelf: 'center', color: '#43D9BD' }}>
                        User Posts
                    </Text>
                    {userFeedData ?
                        <View style={{ marginBottom: 270 }}>
                            <FlatList
                                keyExtractor={(item, index) => String(index)}
                                data={userFeedData}
                                renderItem={({ item }) => {
                                    //console.log(item.Orginaltext)
                                    return <View style={{ backgroundColor: '#D7D7D9', width: '95%', margin: 10, borderRadius: 15 }} >
                                        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#2E3D59', borderTopRightRadius: 15, borderTopLeftRadius: 15, padding: 8, }}>
                                            <Image
                                                source={{
                                                    uri: item.publisher.avatar
                                                }}
                                                style={{
                                                    marginLeft: 10,
                                                    marginRight: 10,
                                                    height: 50,
                                                    width: 50,
                                                    borderRadius: 35,
                                                }} />
                                            <Text style={{
                                                fontWeight: 'bold',
                                                color: 'white'
                                            }}>
                                                {item.publisher.name}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontWeight: 'bold',
                                                    fontSize: 8,
                                                    marginLeft: 130,
                                                    color: 'white'
                                                }}>
                                                {item.post_time}
                                            </Text>
                                        </View>
                                        {item.postText ? <Text
                                            style={{
                                                marginLeft: 30,
                                                marginTop: 5,
                                                fontSize: 11,
                                                fontWeight: 'bold',
                                            }}>
                                            {item.postText}
                                        </Text> : null}
                                        {item.postLinkTitle ? <Text
                                            style={{
                                                margin: 8,
                                                fontSize: 11,
                                                fontWeight: 'bold',
                                            }}>
                                            {item.postLinkTitle}
                                        </Text> : null}
                                        {item.postFile ? <View
                                            style={{
                                                alignSelf: 'center',
                                                marginTop: 10,

                                            }}>
                                            <Image
                                                resizeMode='contain'
                                                source={{
                                                    uri: item.postFile
                                                }}
                                                style={styles.imageSize} />
                                        </View>
                                            : null}
                                        {item.postLinkImage ? <View
                                            style={{
                                                alignSelf: 'center',
                                                marginTop: 10
                                            }}>
                                            <Image
                                                resizeMode='contain'
                                                source={{
                                                    uri: item.postLinkImage
                                                }}
                                                style={styles.imageSize} />
                                        </View>
                                            : null}
                                        {item.postPhoto ? <View
                                            style={{
                                                alignSelf: 'center',
                                                marginTop: 10
                                            }}>
                                            <Image
                                                resizeMode='contain'
                                                source={{
                                                    uri: item.postPhoto
                                                }}
                                                style={styles.imageSize} />
                                        </View>
                                            : null}
                                        <View style={{ height: 10 }} />
                                        <View style={{
                                            flexDirection: 'row', padding: 10, backgroundColor: '#2E3D59', borderBottomRightRadius: 15,
                                            borderBottomLeftRadius: 15,
                                        }}>
                                            {item.reaction.is_reacted ?
                                                <Icon
                                                    name="like1"
                                                    size={22}
                                                    color="white"
                                                    onPress={() => {
                                                        dispatch(getUserPostLikeData(item.post_id, 'dislike')),
                                                            PressOnlike(item.post_id, 'dislike')
                                                    }}
                                                    style={{ marginLeft: 10 }}
                                                /> :
                                                <Icon
                                                    name="like2"
                                                    size={22}
                                                    color="white"
                                                    onPress={() => {
                                                        dispatch(getUserPostLikeData(item.post_id, 'like')),
                                                            PressOnlike(item.post_id, 'like')
                                                    }}
                                                    style={{ marginLeft: 10 }}
                                                />
                                            }
                                            {item.reaction.count ?
                                                <Text
                                                    style={{
                                                        color: 'white',
                                                        marginLeft: 10
                                                    }}>
                                                    {item.reaction.count}
                                                </Text>
                                                : <Text
                                                    style={{
                                                        color: 'white',
                                                        marginLeft: 10
                                                    }}>
                                                    0
                                        </Text>
                                            }
                                            {item.post_comments ?
                                                <Text
                                                    style={{
                                                        color: 'white',
                                                        marginLeft: '68%'
                                                    }}>
                                                    {item.post_comments}
                                                </Text>
                                                : <Text
                                                    style={{
                                                        color: 'white',
                                                        marginLeft: '68%'
                                                    }}>
                                                    0
                                        </Text>
                                            }
                                            <Icon2 name="comment-o"
                                                size={22}
                                                color="white"
                                                onPress={() => props.navigation.navigate('CommentScreen', { postId: item.post_id })}
                                                style={{ marginLeft: 10 }}
                                            />
                                        </View>

                                    </View>
                                }}
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
                </View>
            </View>

        </SafeAreaView >

    )
}

const styles = StyleSheet.create({
    imageSize: {
        height: 340,
        width: 300,
        borderRadius: 10,
    }
});

export default UserProfile;