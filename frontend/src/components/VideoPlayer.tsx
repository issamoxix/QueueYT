import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import { VideoData } from './functions';
import { useDispatch, useSelector } from 'react-redux';
import { changeItem } from '../store/actions';


function VideoPlayer({ data }: { data: VideoData }) {
    const [player, setPlayer] = useState<any>(null)
    const [playList, setplayList] = useState<Array<string>>(data.videos)
    const [currentVideoIndex, setcurrentVideoIndex] = useState<number>(1)
    const item = useSelector((state:any) => state.item)
    const dispatch = useDispatch()

    const onReady = (event: any) => {
        setPlayer(event.target)
    }


    const playNextVideo = () => {
        console.log("Video Ended , Next Video : ",  playList[currentVideoIndex])
        setcurrentVideoIndex(currentVideoIndex + 1)
        dispatch(changeItem(playList[currentVideoIndex]))
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
            if(!item){
                dispatch(changeItem(data.videos[0]))
            }
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