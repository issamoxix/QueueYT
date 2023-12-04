import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import { VideoData } from './functions';



function VideoPlayer({ data }: { data: VideoData }) {
    const [player, setPlayer] = useState<any>(null)
    const [playList, setplayList] = useState<Array<string>>(data.videos)
    const [currentVideoIndex, setcurrentVideoIndex] = useState<number>(1)


    const onReady = (event: any) => {
        setPlayer(event.target)
    }


    const playNextVideo = () => {
        console.log("Video Ended !")
        setcurrentVideoIndex(currentVideoIndex + 1)
        console.log(playList[currentVideoIndex])
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

    useEffect(() => {
        if (data) {
            setplayList(data.videos)
        }
    }, [data, currentVideoIndex])
    return (
        <div className="video-container">
            {playList[currentVideoIndex - 1] &&
                <YouTube videoId={playList[currentVideoIndex - 1]} opts={opts} onReady={onReady} onEnd={playNextVideo} />
            }

        </div>
    )



}

export default VideoPlayer