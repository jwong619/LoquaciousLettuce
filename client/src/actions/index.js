import axios from 'axios';
var Promise = require('bluebird');


//--------------------------------USER--------------------------------//


export const selectUser = (user) => { // function that is the action creator
  console.log('You clicked on user: ', user.username);
  return {
    type: 'USER_SELECTED',
    payload: user
  };
};


export const setCurrentUser = (username) => {
  return {
    type: 'SET_CURRENT_USER',
    payload: username
  };
};

export const getCurrentUser = () => (dispatch, getState) => {
  console.log('--getting user info request');
  axios.get('/userInfo')
  .then((result) => {
    console.log('--result here', result);
    return dispatch(setCurrentUser(result.data));
  })
  .catch((error) => {
    console.error('Error getting current user: ', error);
  });
};

//--------------------------------VIEWS/MODALS--------------------------------//


export const changeView = (view) => {
  console.log("View", view);
  return {
    type: 'CHANGE_VIEW',
    payload: view
  };
};


export const showModal = (obj) => {
  console.log("OPENED ---obj", obj);
  return {
    type: 'SHOW_MODAL',
    payload: obj
  };
};

export const closeModal = (obj) => {
  console.log("CLOSED --");
  return {
    type: 'CLOSE_MODAL',
    payload: obj
  };
};


//--------------------------------MUSIC--------------------------------//

export const setTracks = (object) => {
  console.log('object', object);
  return {
    type: 'GET_TRACKS',
    payload: object
  };
};

export const addLibrary = (object) => {
  console.log('add object', object);
  return {
    type: 'ADD_LIBRARY',
    payload: object
  };
};

export const getTracks = (url, options) => (dispatch, getState) => {
  axios.get(url, options)
    .then((data) => {
      var storage = data.data.tracks.items;
      var count = 0;
      var SpotifyIDstorage = [];
      data.data['BPMItems'] = [];
      for (var i = 0; i < storage.length; i ++) {
        data.data.BPMItems.push(
          axios('https://api.spotify.com/v1/audio-features/' + storage[i].id, options)
            .then((data) => {
              return data.data;
            })
        );
      }
      Promise.all(data.data.BPMItems)
        .then(function(result) {
          data.data.BPMItems = result;
          return data.data;
        })
        .then((data)=> {
          return dispatch(setTracks(data));
        });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const changeSong = (song) => {
  console.log('song', song);
  return {
    type: 'CHANGE_SONG',
    payload: song
  };
};

//--------------------------------GAME--------------------------------//

export const changeDifficulty = (difficulty) => {
  console.log('difficulty', difficulty);
  return {
    type: 'CHANGE_DIFFICULTY',
    payload: difficulty
  };
};

export const changePlayers = (playerCount) => {
  console.log('playerCount', playerCount);
  return {
    type: 'CHANGE_PLAYERS',
    payload: playerCount
  };
};

export const getGame = () => {
  return {
    type: 'GET_GAME',
    payload: ''
  };
};

export const selectMode = (playerMode) => {
  console.log("You chose", playerMode);
  return {
    type: 'MODE_SELECTED',
    payload: playerMode
  };
};

export const saveGame = (profileID, game) => {
  console.log('current game---', game);
  console.log('current profile---', profileID);
  axios.post('/')
  .then( (result) => {
    console.log('result', result);
  })
  .catch( (error) => {
    console.error('failed to save game');
  })
}


//--------------------------------SCORELIST--------------------------------//

// export const totalSingleScore = (score) => {
//   console.log("score---", score);
//   return {
//     type: 'UPDATE_TOTAL_SCORE',
//     payload: view
//   };
// };


/**************CHANGE USERS LIST (TOP TEN)***************/
//need to make a current song reducer;???

export const getTopTenScores = (profileID, game) => {
  console.log('current game---', game);
  console.log('current profile---', profileID);
  // console.log('from game song--', game.song);
  // console.log('from game difficulty--', game.difficulty);
  // console.log('from game score--', game.score);
  // song and difficulty and score
  axios.put('/api/games/1')
  .then( (result)=> {
    console.log('song result--', result.data);
    //console.log(result.data)
  })
  .catch( (error) => {
    console.error('failed test--', error);
  });
};





// SHOULD JUST INSERT THE GAME
// export const addNewGame = (game) => {
//   // obj {song, level}
//   //axios post requestttttt!!!!!!!!!***********
//   console.log('selected song---', game.song);
//   console.log('selected level---', game.difficulty);
//   return {
//     type: 'NEW_GAME', /// no no no
//     payload: game
//   };
// };
// export const addNewGame


// needs to query db
export const changeUsersList = () => (dispatch, getState) => {
  axios.get('/score')
  .then((result) => { // want to get array back
    console.log('-----result data-----', result.data);
    return dispatch(updateUsersScores(result.data));
  })
  .catch((error) => {
    console.error('Failed to get top ten scores and users', error);
  });
};

























