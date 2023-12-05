export const CHANGE_ITEM = 'CHANGE_ITEM'



export const changeItem = (nextItem: string) => {
    return {
      type: CHANGE_ITEM,
      payload: nextItem,
    };
  };