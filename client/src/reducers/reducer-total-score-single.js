export default (state = 0 , action) => {
  switch (action.type) {
    case 'UPDATE_SCORE_SINGLE' : {
      state = action.payload;
      break;
    }
  }
  return state;
};