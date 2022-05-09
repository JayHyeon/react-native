import { HEADER, HEADER_TYPE, SEARCH, WRITE_ACTION, WRITE_ACTION_TYPE } from '@actions/PostAction'

export const initState = {
    header: HEADER_TYPE.INIT,
    search: '',
    write_action: WRITE_ACTION_TYPE.INIT
}

const postReducer = (state = initState, action: any) => {
    switch (action.type) {        
        case HEADER:
            return {
                ...state,
                header: action.value
            }
        case SEARCH:
            return {
                ...state,
                search: action.value
            }
        case WRITE_ACTION:
            return {
                ...state,
                write_action: action.value
            }
        default:
            return state;
    }
}

export default postReducer;