import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { InitialState } from "../store/reducers"
import { changeItem } from "../store/actions";

function Controller() {
    const itemIndex = useSelector((state: InitialState) => state.itemIndex)
    const queueLength = useSelector((state: InitialState) => state.queueLength)

    
    const dispatch = useDispatch();
    return (
        <div className="queue-controller">
            <button onClick={() => itemIndex > 0 && dispatch(changeItem(itemIndex - 1))} >Prev</button>
            <button onClick={() => itemIndex + 1 < queueLength && dispatch(changeItem(itemIndex + 1))} >Next</button>
        </div>
    )
}

export default Controller