import React, { useState, useEffect } from 'react';
import { VideoData, fetchData } from './functions';



function QueueContainer({ data }: { data: VideoData }) {
    const [videos, setvideos] = useState<string[]>([""])
    useEffect(()=> {
        if(data.videos.length > 0) {
            setvideos(data.videos)
            //  use Websocket that can have some func as this interval below
            // setInterval(()=> {
            //     fetchData(data.token).then(d => setvideos(d.data.videos))
            // },5000)
        }
    },[data])
    return (<div className="queue-container">
        {videos ? videos.map((item) => {
            return <div className="queue-element">
                <h3> {item} </h3>
            </div>
        }) : <h3>Loading ..."</h3>}
    </div>)
}

export default QueueContainer