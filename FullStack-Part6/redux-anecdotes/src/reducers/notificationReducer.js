export const setNotification = (data, timer) => {
  return async(dispatch) => {
    const timerId = setTimeout(() => {
      dispatch(clearNotification());
    }, timer * 1000);

    dispatch({
      type: 'SHOW_NOTIFICATION',
      data: { data, id:timerId},
    });
  };
};

const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  };
};

const notificationReducer = (
  state = {data:' ',id:null},
  action
) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      clearTimeout(state.id)
      return action.data;

    case 'CLEAR_NOTIFICATION':
      return {
        data:null
      }
    default:
      return state;
  }
};

export default notificationReducer;
