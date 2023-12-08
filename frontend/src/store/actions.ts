import { VideoData } from "../components/functions";

export const CHANGE_ITEM = 'CHANGE_ITEM'
export const ADD_QUEUE = 'ADD_QUEUE'


export const changeItem = (nextItem: number) => {
  return {
    type: CHANGE_ITEM,
    payload: nextItem,
  };
};

export const addQueue = (queue: VideoData) => {
  return {
    type: ADD_QUEUE,
    payload: queue,
    queueLength: queue.videos.length
  }
}