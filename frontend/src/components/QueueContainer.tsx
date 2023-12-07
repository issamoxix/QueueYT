import React from 'react';
import { VideoData } from './functions';
import { useSelector } from 'react-redux';



function QueueContainer() {
    const queue: VideoData = useSelector((state: any) => state.queue)
    const playingItem: string = useSelector((state:any) => state.item)

    return (<div className="queue-container">
        {queue.videos ? queue.videos.map((item) => {
            return <div className="queue-element">
                <h3> {item} {playingItem == item && "Playing"} </h3>
            </div>
        }) : <h3>Loading ..."</h3>}
    </div>)
}

export default QueueContainer