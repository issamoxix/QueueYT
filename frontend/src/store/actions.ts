export const CHANGE_ITEM = 'CHANGE_ITEM'
export const ADD_QUEUE = 'ADD_QUEUE'


export const changeItem = (nextItem: string) => {
  return {
    type: CHANGE_ITEM,
    payload: nextItem,
  };
};

export const addQueue = (queue: string[]) => {
  return {
    type: ADD_QUEUE,
    payload: queue
  }
}