export default (state = null, action) => {
  switch (action.type) {
    case 'SELECT_SONG' : {
      state = action.payload;
      break;
    }
  }
}

//probs need one for level as well

// ACTUALLY THIS INFO IS ALREADY IN GAME OBJECT STATE