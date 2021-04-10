const intialState = {
    newsFeedData: null,
    // storing new feed data
    postCommentData: null,
    // storing new post comments data
    userFeedData: null
    //storing new single user post data 
}

export default (state = intialState, action) => {
    switch (action.type) {
        case 'GET_NEWSFEED':
            // storing new post data
            return {
                ...state,
                newsFeedData: action.payload
            }
        case 'GET_ONLIKE':
            // storing and changin like data
            return {
                ...state,
                newsFeedData: state.newsFeedData.map(item => {
                    if (item.post_id == action.payload[0]) {
                        return {
                            ...item,
                            reaction: {
                                ...item.reaction,
                                is_reacted: !item.reaction.is_reacted,
                                count: action.payload[1] == 'like' ? item.reaction.count + 1 : item.reaction.count - 1
                            }

                        }
                    } else {
                        return item
                    }

                })
            }
        case 'GET_ONLIKE_PROFILE':
            // storing and changin like data in profile
            return {
                ...state,
                userFeedData: state.userFeedData.map(item => {
                    if (item.post_id == action.payload[0]) {
                        return {
                            ...item,
                            reaction: {
                                ...item.reaction,
                                is_reacted: !item.reaction.is_reacted,
                                count: action.payload[1] == 'like' ? item.reaction.count + 1 : item.reaction.count - 1
                            }

                        }
                    } else {
                        return item
                    }

                })
            }
        case 'GET_POSTCOMMENTS':
            // storing comments data 
            return {
                ...state,
                postCommentData: action.payload
            }

        case 'ON_COMMENT_CHANGE':
            // adding new comment data
            return {
                ...state,
                newsFeedData: state.newsFeedData.map(item => {
                    if (item.post_id == action.payload[0]) {
                        return {
                            ...item,
                            post_comments: parseInt(item.post_comments) + 1

                        }
                    }
                    else {
                        return item
                    }

                }),
                postCommentData: [...state.postCommentData, action.payload[1]]

            }
        case 'ON_PROFILE_COMMENT_CHANGE':
            // adding new comment in profile post data
            return {
                ...state,
                userFeedData: state.userFeedData.map(item => {
                    if (item.post_id == action.payload[0]) {
                        return {
                            ...item,
                            post_comments: parseInt(item.post_comments) + 1

                        }
                    }
                    else {
                        return item
                    }

                }),

            }
        case 'ON_NEW_POST':
            //storing post data
            return {
                ...state,
                newsFeedData: [action.payload, ...state.newsFeedData]
            }
        case 'GET_USER_FEED':
            // getting user feed from server
            return {
                ...state,
                userFeedData: action.payload
            }
        default: return state
    }
}