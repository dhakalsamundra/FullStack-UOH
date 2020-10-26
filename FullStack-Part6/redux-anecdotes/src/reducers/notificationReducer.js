export const setNotification = (data, timer) => {
  return async(dispatch) => {
    const timerId = setTimeout(() => {
      dispatch(clearTimeout());
    }, timer * 1000);

    dispatch({
      type: 'SHOW_NOTIFICATION',
      data: { data, timerId},
    });
  };
};

const clearTimeout = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  };
};

const notificationReducer = (
  state = null,
  action
) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.data.data;

    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state;
  }
};

export default notificationReducer;
