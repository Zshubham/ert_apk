import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';




export const setToken = () => {
    return async (dispatch) => {
        const tokenId = await AsyncStorage.getItem('access_token')
        dispatch({ type: 'RESTORE_TOKEN', payload: tokenId });
    }
}

export const removeAccessToken = () => {
    return async (dispatch) => {
        await AsyncStorage.removeItem('access_token')
        dispatch({ type: 'REMOVE_TOKEN' });
    }
}

export const getUserId = () => {
    return async (dispatch) => {
        const userId = await AsyncStorage.getItem('user_Id')
        dispatch({ type: 'RESTORE_USERID', payload: userId })
    }
}

export const getNewsFeed = (data) => {
    return async (dispatch) => {
        dispatch({ type: 'GET_NEWSFEED', payload: data });
    }
}
export const getOnLikeData = (data, reaction) => {
    return async (dispatch) => {
        dispatch({ type: 'GET_ONLIKE', payload: [data, reaction] });
    }
}
export const getUserPostLikeData = (data, reaction) => {
    return async (dispatch) => {
        dispatch({ type: 'GET_ONLIKE_PROFILE', payload: [data, reaction] })
        dispatch({ type: 'GET_ONLIKE', payload: [data, reaction] });
    }
}
export const commentCountData = (data, newCommentData) => {
    return async (dispatch) => {
        dispatch({ type: 'ON_COMMENT_CHANGE', payload: [data, newCommentData] });

    }
}
export const getProfileCommentData = (data, newCommentData) => {
    return async (dispatch) => {
        dispatch({ type: 'ON_PROFILE_COMMENT_CHANGE', payload: [data, newCommentData] });
    }
}
export const login = (username, password, setloadingIndicator) => {
    return async (dispatch) => {
        setloadingIndicator(true)
        let data = new FormData()
        data.append('username', username)
        data.append('password', password)
        data.append('server_key', '5bda6652fe66a3e69331fb4d655db3ba')

        const url = ' https://notifyx.site/hivedin6/api/auth'
        await axios.post(url, data)
            .then(async (res) => {
                // console.log(res.data.access_token)
                // console.log(res.data)
                if (res.data.api_status == 200) {
                    await AsyncStorage.setItem('access_token', res.data.access_token)
                    await AsyncStorage.setItem('user_Id', res.data.user_id)
                    ToastAndroid.show('Success full login', ToastAndroid.SHORT)
                    dispatch(setToken())
                    dispatch(getUserId())
                    setloadingIndicator(false)
                }
                else {
                    setloadingIndicator(false)
                    ToastAndroid.show('User not found', ToastAndroid.SHORT)
                }
            })
    }
}

export const logOut = () => {
    return async (dispatch) => {
        ToastAndroid.show('Success full logout', ToastAndroid.SHORT)
        dispatch(removeAccessToken())
    }
}
export const PostCommetsData = (Comment) => {
    return async (dispatch) => {
        dispatch({ type: 'GET_POSTCOMMENTS', payload: Comment });
    }
}
export const PostNewData = (NewPost) => {
    return async (dispatch) => {
        dispatch({ type: 'ON_NEW_POST', payload: NewPost })
    }
}
export const CreateNewPost = (postText, response, token, getUserId, setloadingIndicator, back) => {
    return async (dispatch) => {
        setloadingIndicator(true)
        let data = new FormData()
        data.append('user_id', getUserId)
        data.append('postText', postText)
        data.append('s', token)
        if (response.uri) {
            data.append('postFile', {
                uri: response.uri,
                name: response.fileName,
                type: response.type,
            })
        }
        const url = 'https://notifyx.site/hivedin6/app_api.php?application=phone&type=new_post'
        //console.log(url)
        //console.log(data)
        axios.post(url, data)
            .then(async (res) => {
                //console.log(res.data.post_data)
                if (res.data.api_status == 200) {
                    dispatch(PostNewData(res.data.post_data))
                    ToastAndroid.show('Feed Posted', ToastAndroid.SHORT)
                    setloadingIndicator(false)
                    back()


                } else {
                    ToastAndroid.show('Feed not Posted', ToastAndroid.SHORT)
                    setloadingIndicator(false)
                }
            })
    }

}
export const UserFeed = (Feed) => {
    return async (dispatch) => {
        dispatch({ type: 'GET_USER_FEED', payload: Feed });
    }
}
export const onlike = (postid, action, token) => {
    return async (dispatch) => {
        const url = 'https://notifyx.site/hivedin6/api/post-actions?access_token=' + token
        const data = new FormData()
        data.append('server_key', '5bda6652fe66a3e69331fb4d655db3ba')
        data.append('post_id', postid)
        data.append('action', action)

        axios.post(url, data)
            .then(async (res) => {
                //console.log(res.data)
                if (res.data.api_status == 200) {
                } else {
                    ToastAndroid.show('Feed not found', ToastAndroid.SHORT)
                }
            })
    }
}