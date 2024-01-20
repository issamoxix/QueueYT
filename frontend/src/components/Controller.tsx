import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { InitialState } from "../store/reducers"
import { addQueue, changeItem } from "../store/actions";
import { Link } from "react-router-dom";
import { deQueueItem, fetchData } from "./functions";
import Modal from "./Modal";

function Controller({ token }: { token: string | null }) {
    const itemIndex = useSelector((state: InitialState) => state.itemIndex)
    const queueLength = useSelector((state: InitialState) => state.queueLength)
    const videos = useSelector((state: InitialState) => state.queue.videos)
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);

    const deQueue = () => {
        console.log("Deqeuing item")
        const itemId = videos[itemIndex]
        if (token) {
            deQueueItem(token, itemId).then((d) => {
                if (d) {
                    fetchData(token).then((data) =>
                        dispatch(addQueue(data.data))

                    )
                }
            }
            )
        }
    }

    return (
        <div className="queue-controller">
            <button onClick={() => itemIndex > 0 ? dispatch(changeItem(itemIndex - 1)) : dispatch(changeItem(queueLength - 1))} >Prev</button>
            <button onClick={() => setOpen(!open)}>ADD</button>

            <button onClick={() => deQueue()}>DeQueue</button>
            <button onClick={() => itemIndex + 1 < queueLength ? dispatch(changeItem(itemIndex + 1)) : dispatch(changeItem(0))} >Next</button>
            <Modal tokenValue={token} isModalOpen={open} setModalOpen={setOpen} />
        </div>

    )
}

export default Controller