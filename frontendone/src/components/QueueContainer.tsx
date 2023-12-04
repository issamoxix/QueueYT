import React from 'react';


type VideoData = {
    videos: Array<string>
}

function QueueContainer({ data }: { data: VideoData }) {
    return (<div className="queue-container">
        {data? data.videos.map((item) => {
            return <div className="queue-element">
            <h3> {item} </h3>
        </div>
        }):<h3>Loading ..."</h3>}
        {/* <div className="queue-element">
            <h3>Video #1 </h3>
        </div>
         */}
    </div>)
}

export default QueueContainer