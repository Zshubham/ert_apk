const intialState = {
    token: null,
    // for storing accsses token 
    userid: null,
    // for storing user id
}

export default (state = intialState, action) => {
    switch (action.type) {
        case 'RESTORE_TOKEN':
            // strong token 
            return {
                ...state,
                token: action.payload
            }
        case 'REMOVE_TOKEN':
            //removing token
            return {
                ...state,
                token: null
            }
        case 'RESTORE_USERID':
            // storing userId
            return {
                ...state,
                userid: action.payload
            }
        default: return state
    }
}