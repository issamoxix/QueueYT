import { ADD_QUEUE, CHANGE_ITEM } from "./actions";



const initialState = {
    item: null,
    queue: []
};



const rootReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case CHANGE_ITEM:
            return {
                ...state,
                item: action.payload,
            };
        case ADD_QUEUE:
            return {
                ...state,
                queue:action.payload
            }
        default:
            return state;
    }
};

export default rootReducer;