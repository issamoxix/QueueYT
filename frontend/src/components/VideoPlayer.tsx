import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import { VideoData, fetchData } from './functions';
import { useDispatch, useSelector } from 'react-redux';
import { addQueue, changeItem } from '../store/actions';
import Controller from './Controller';


function VideoPlayer() {
    // const [player, setPlayer] = useState<any>(null)
    const [playList, setplayList] = useState<Array<string>>(["TUVcZfQe-Kw"])
    const queue: VideoData = useSelector((state: any) => state.queue)
    const [currentVideoIndex, setcurrentVideoIndex] = useState<number>(0)
    const item = useSelector((state: any) => state.itemIndex)
    const queryParams = new URLSearchParams(window.location.search);
    const TokenValue = queryParams.get("token")
    const dispatch = useDispatch()

    const onReady = (event: any) => {
        // setPlayer(event.target)
        // document.body.style.backgroundImage = `url("${queue.videos_info[playList[currentVideoIndex]].snippet.thumbnails.maxres.url}")`
        const targetElement = document.getElementById(playList[currentVideoIndex]);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
        console.log("Video is Ready")
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

    // const playVideo = () => {
    //     if (player) {
    //         player.playVideo()
    //     }
    // }
    const opts = {
        height: window.innerHeight * 0.7,
        width: window.innerWidth * 0.6,
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

        const fetch_data = () => {
            if (TokenValue) {
                fetchData(TokenValue).then((data) => {
                    dispatch(addQueue(data.data))
                    if (data.data.videos.length > 0) {
                        clearInterval(intervalId)
                    }
                })
            }
        }

        if (queue.videos.length == 0) {
            var intervalId = setInterval(fetch_data, 2000);
        }

    }, [queue, currentVideoIndex])

    useEffect(() => {




        if (queue.videos) {
            setcurrentVideoIndex(item)
        }
    }, [item])
    return (
        <div className="video-container">
            {playList[currentVideoIndex] &&
                <YouTube videoId={playList[currentVideoIndex]} opts={opts} onReady={onReady} onEnd={playNextVideo} />
            }
            <Controller token={TokenValue} />

        </div>
    )



}

export default VideoPlayer