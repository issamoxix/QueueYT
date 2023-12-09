import React from 'react';
import { VideoData } from './functions';
import { useSelector } from 'react-redux';
import { InitialState } from '../store/reducers';
import QueueElement from './QueueElement';



function QueueContainer() {
    const queue: VideoData = useSelector((state: InitialState) => state.queue)
    return (<div className="queue-container">
        {queue.videos ? queue.videos.map((item: string, key: number) => <QueueElement index={key} itemInfo={queue.videos_info[item]} />
        ):<h3>Loading ..."</h3>}
        
    </div>)
}

export default QueueContainer