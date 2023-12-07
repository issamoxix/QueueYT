import { CHANGE_ITEM } from "./actions";



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
        default:
            return state;
    }
};

export default rootReducer;