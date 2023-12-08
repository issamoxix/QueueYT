import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import { VideoData, fetchData } from './functions';
import { useDispatch, useSelector } from 'react-redux';
import { addQueue, changeItem } from '../store/actions';


function VideoPlayer() {
    const [player, setPlayer] = useState<any>(null)
    const [playList, setplayList] = useState<Array<string>>([])
    const queue: VideoData = useSelector((state: any) => state.queue)
    const [currentVideoIndex, setcurrentVideoIndex] = useState<number>(0)
    const item = useSelector((state: any) => state.itemIndex)
    const queryParams = new URLSearchParams(window.location.search);

    const dispatch = useDispatch()

    const onReady = (event: any) => {
        setPlayer(event.target)
    }


    const playNextVideo = () => {
        console.log("Video Ended , Next Video : ", playList[currentVideoIndex])
        setcurrentVideoIndex(currentVideoIndex + 1)
        dispatch(changeItem(currentVideoIndex + 1))
        const TokenValue = queryParams.get("token")
        if (TokenValue) {
            fetchData(TokenValue).then((data) => {
                dispatch(addQueue(data.data))
            })
        }
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
        if (queue.videos) {
            setplayList(queue.videos)
            if (!item) {
                dispatch(changeItem(0))
            }
        }
    }, [queue, currentVideoIndex])

    useEffect(()=> {
        if(queue.videos){
            setcurrentVideoIndex(item)
        }
    },[item])
    return (
        <div className="video-container">
            {playList[currentVideoIndex] &&
                <YouTube videoId={playList[currentVideoIndex]} opts={opts} onReady={onReady} onEnd={playNextVideo} />
            }

        </div>
    )



}

export default VideoPlayer