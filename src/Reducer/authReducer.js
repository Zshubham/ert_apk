const intialState = {
    token: null,
    userid: null,
}

export default (state = intialState, action) => {
    switch (action.type) {
        case 'RESTORE_TOKEN':
            return {
                ...state,
                token: action.payload
            }
        case 'REMOVE_TOKEN':
            return {
                ...state,
                token: null
            }
        case 'RESTORE_USERID':
            return {
                ...state,
                userid: action.payload
            }
        default: return state
    }
}