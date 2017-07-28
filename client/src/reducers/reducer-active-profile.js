export default (state = 'null' , action) => {
  switch (action.type) {
    case 'SET_ACTIVE_PROFILE' : {
      state = action.payload;
      break;
    }
  }
  return state;
};