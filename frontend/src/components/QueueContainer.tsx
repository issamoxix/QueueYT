import React from 'react';
import { VideoData } from './functions';
import { useDispatch, useSelector } from 'react-redux';
import { changeItem } from '../store/actions';



function QueueContainer() {
    const queue: VideoData = useSelector((state: any) => state.queue)
    const playingItem: number = useSelector((state:any) => state.itemIndex)
    const dispatch = useDispatch()

    return (<div className="queue-container">
        {queue.videos ? queue.videos.map((item, key) => {
            return <div onClick={()=> dispatch(changeItem(key))}  className="queue-element">
                <h3> {item} {playingItem == key && <>Playing <img src="./soundwave.gif" /></>}  </h3>
            </div>
        }) : <h3>Loading ..."</h3>}
    </div>)
}

export default QueueContainer