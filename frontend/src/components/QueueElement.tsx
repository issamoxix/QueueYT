import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { changeItem } from "../store/actions"

function QueueElement({ itemInfo, index }: { index: number, itemInfo: any }) {
    const playingItem: number = useSelector((state: any) => state.itemIndex)
    const dispatch = useDispatch()
    const videoId = itemInfo.id
    const snippet = itemInfo["snippet"]
    const thumbnail = snippet["thumbnails"]["default"]["url"]
    const title = snippet["title"]
    const channel = snippet["channelTitle"]
    const playing = playingItem == index

    return <div id={videoId}  className={playing ? "queue-element playing" : "queue-element"} onClick={() => dispatch(changeItem(index))} >
        <img src={thumbnail} />
        <div className='queue-item-details'>
            <h5 title={title}>{title.length > 50 ? `${title.substr(0, 50)}...` : title} </h5>
            <span>By {channel}</span>
        </div>
    </div>
}

export default QueueElement