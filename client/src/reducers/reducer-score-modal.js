export default (state = {visibility: false, user: {display:'julia'}, score: 0}, action) => {
  switch (action.type) {
    case 'SHOW_MODAL' : {
      state = action.payload;
      break;
    }
    case 'CLOSE_MODAL' : {
      state = action.payload;
      break;
    }
  }
  return state;
};