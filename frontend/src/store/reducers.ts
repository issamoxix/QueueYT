import { VideoData } from "../components/functions";
import { ADD_QUEUE, CHANGE_ITEM } from "./actions";


export type InitialState = {
    itemIndex: number;
    queue: VideoData;
    queueLength: number
};

const initialState: InitialState = {
    itemIndex: 0,
    queue: { "token": "", "videos": [] },
    queueLength: 0
};



const rootReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case CHANGE_ITEM:
            return {
                ...state,
                itemIndex: action.payload,
            };
        case ADD_QUEUE:
            return {
                ...state,
                queue: action.payload,
                queueLength: action.queueLength
            }
        default:
            return state;
    }
};

export default rootReducer;