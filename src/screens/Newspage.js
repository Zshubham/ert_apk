import React, { useEffect, } from 'react';
import { View, Text, SafeAreaView, ToastAndroid, Pressable, FlatList, Image, ActivityIndicator, StatusBar, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { getNewsFeed, getOnLikeData, onlike } from '../Actions/index';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome';

import { useSelector } from 'react-redux';
import axios from 'axios';

const Newspage = (props) => {

    const token = useSelector(state => state.auth.token)
    const dispatch = useDispatch();
    const feedData = useSelector(state => state.feed.newsFeedData)
    const Color = '#43D9BD'


    useEffect(() => {
        const data = new FormData()
        data.append('server_key', '5bda6652fe66a3e69331fb4d655db3ba')
        data.append('type', 'get_news_feed')
        data.append('limit', 40)

        const url = 'https://notifyx.site/hivedin6/api/posts?access_token=' + token
        // console.log(url)
        // console.log(data)
        axios.post(url, data)
            .then(async (res) => {
                //console.log(res.data.data[28])
                if (res.data.api_status == 200) {
                    dispatch(getNewsFeed(res.data.data))
                }
                else {
                    ToastAndroid.show('Feed not found', ToastAndroid.SHORT)
                }
            })

    }, [])

    const PressOnlike = (postid, action) => {
        //when like button
        dispatch(onlike(postid, action, token))

    }

    return (

        <SafeAreaView style={{ backgroundColor: '#101726', flex: 1 }}>
            <StatusBar
                barStyle="light-content"
                backgroundColor="#101726"
                translucent={true}
            />
            {feedData ?
                <View style={{ marginTop: 15 }}>
                    <FlatList
                        keyExtractor={(item, index) => String(index)}
                        //  use for list of data for redeing
                        data={feedData}
                        renderItem={({ item }) => {
                            return <View
                                style={{
                                    backgroundColor: '#D7D7D9',
                                    marginBottom: 7,
                                    width: '95%',
                                    alignSelf: 'center',
                                    borderRadius: 15,
                                    minHeight: '1%',
                                }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        backgroundColor: '#2E3D59',
                                        padding: 8,
                                        borderTopRightRadius: 15,
                                        borderTopLeftRadius: 15

                                    }}>
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
                                    <View>
                                        <Pressable
                                            onPress={() => props.navigation.navigate('UserProfile', { UserId: item.user_id })}
                                        >
                                            <Text
                                                style={{
                                                    fontWeight: 'bold',
                                                    color: 'white'
                                                }}>
                                                {item.publisher.name}
                                            </Text>
                                        </Pressable>
                                        <Text
                                            style={{
                                                fontSize: 10,
                                                fontWeight: 'bold',
                                                color: 'white'
                                            }}>
                                            {item.publisher.professional_role}
                                        </Text>
                                        <Text
                                            style={{
                                                fontWeight: 'bold',
                                                fontSize: 8,
                                                color: 'white',
                                                marginLeft: '67%'
                                            }}>
                                            {item.post_time}
                                        </Text>
                                    </View>

                                </View>
                                {item.postText ? <Text
                                    style={{
                                        marginLeft: 30,
                                        marginTop: 5,
                                        fontSize: 11,
                                        fontWeight: 'bold'
                                    }}>
                                    {item.postText}
                                </Text> : null}
                                {item.postLinkTitle ? <Text
                                    style={{
                                        margin: 8,
                                        fontSize: 10
                                    }}>
                                    {item.postLinkTitle}
                                </Text> : null}
                                {item.postFile ? <View
                                    style={{
                                        alignSelf: 'center',
                                        marginTop: 10
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
                                    borderBottomLeftRadius: 15
                                }}>
                                    {item.reaction.is_reacted ?
                                        <Icon
                                            name="like1"
                                            size={22}
                                            color="white"
                                            onPress={() => {
                                                dispatch(getOnLikeData(item.post_id, 'dislike')),
                                                    PressOnlike(item.post_id, 'dislike')
                                            }}
                                            style={{ marginLeft: 10 }}
                                        /> :
                                        <Icon
                                            name="like2"
                                            size={22}
                                            color="white"
                                            onPress={() => {
                                                dispatch(getOnLikeData(item.post_id, 'like')),
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
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('CreatePost')}
                        style={{
                            backgroundColor: '#101726',
                            width: 200,
                            height: 55,
                            position: 'absolute',
                            bottom: 40,
                            alignSelf: 'center',
                            borderRadius: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            elevation: 5
                        }}>
                        <Text
                            style={{
                                fontSize: 20,
                                color: '#43D9BD',
                                fontWeight: 'bold'
                            }}>
                            Create Post
                        </Text>
                    </TouchableOpacity>

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
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    imageSize: {
        height: 340,
        width: 300,
        borderRadius: 10,
    }
});

export default Newspage;