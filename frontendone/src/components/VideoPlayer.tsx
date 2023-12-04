import { useEffect, useState } from 'react';
import React from 'react';

import YouTube from 'react-youtube';

type VideoData = {
    videos: Array<string>
}


function VideoPlayer({data}: {data:VideoData}) {
    const [player, setPlayer] = useState<any>(null)
    const [playList, setplayList] = useState<Array<string>>(["tY_3bDHdiiA", "l78x5cADWJM"])
    const [currentVideoIndex, setcurrentVideoIndex] = useState<number>(0)


    const onReady = (event: any) => {
        setPlayer(event.target)
    }


    const playNextVideo = () => {
        setcurrentVideoIndex(currentVideoIndex + 1)
    }

    const playVideo = () => {
        if (player) {
            player.playVideo()
        }
    }
    const opts = {
        height: window.innerHeight * 0.8,
        width: window.innerWidth * 0.7,
        playerVars: {
            autoplay: 1,
        },
    };

    useEffect(()=> {
        if(data){
            setplayList(data.videos)
        }
    }, [data])
    return (
        <div className="video-container">
            <YouTube videoId={playList[currentVideoIndex]} opts={opts} onReady={onReady} onEnd={playNextVideo} />
        </div>
    )



}

export default VideoPlayer