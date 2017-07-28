export default (state = {
  youtubeLink: ''
}, action) => {
  switch (action.type) {
  case 'ADD_YOUTUBE' : {
    return {
      youtubeLink: action.payload
    };
  }
  }
  return state;
};
