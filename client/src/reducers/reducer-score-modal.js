export default (state = {
  visibility: false,
  user: {display:'julia'},
  score: 0,
  stats: { games: [{
    averageScore: 1, numGamesDifficulty: {}, topScoreDifficulty: {} }, {}] }
}, action) => {
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