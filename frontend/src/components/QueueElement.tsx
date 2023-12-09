import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { changeItem } from "../store/actions"

function QueueElement({ itemInfo, index }: { index: number, itemInfo: any }) {
    const playingItem: number = useSelector((state: any) => state.itemIndex)
    const dispatch = useDispatch()

    const snippet = itemInfo["snippet"]
    const thumbnail = snippet["thumbnails"]["default"]["url"]
    const title = snippet["title"]
    const channel = snippet["channelTitle"]
    const playing = playingItem == index

    return <div className={playing ? "queue-element playing" : "queue-element"} onClick={() => dispatch(changeItem(index))} >
        <img src={thumbnail} />
        <div className='queue-item-details'>
            <h3 title={title}>{title.length > 24 ? `${title.substr(0, 25)}...` : title} </h3>
            {/* {playing && <p>Playing</p>} */}
            <p>By {channel}</p>
        </div>
    </div>
}

export default QueueElement