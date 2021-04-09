const intialState = {
    newsFeedData: null,
    postCommentData: null,
    userFeedData: null
}

export default (state = intialState, action) => {
    switch (action.type) {
        case 'GET_NEWSFEED':
            return {
                ...state,
                newsFeedData: action.payload
            }
        case 'GET_ONLIKE':
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
            return {
                ...state,
                postCommentData: action.payload
            }

        case 'ON_COMMENT_CHANGE':
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
            return {
                ...state,
                newsFeedData: [action.payload, ...state.newsFeedData]
            }
        case 'GET_USER_FEED':
            return {
                ...state,
                userFeedData: action.payload
            }
        default: return state
    }
}