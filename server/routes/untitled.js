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
//*******************

export const getNewsFeed = () => (dispatch, getState) => {
  axios.get('/api/news')
  .then((result) => {
    return dispatch(setNewsFeed(result.data));
  })
  .catch((error) => {
    console.error('Failed to fetch news: ', error);
  });
};


export const getActiveProfile = (username) => (dispatch, getState) => {
  return axios.get(`/user/${username}/info`)
  .then((result) => {
    return dispatch(setActiveProfile(result.data));
  })
  .catch((error) => {
    console.error('Error fetching active profile: ', error);
  });
};

export const getCurrentUser = () => (dispatch, getState) => {
  return axios.get(`/user/info`)
  .then((result) => {
    return dispatch(setCurrentUser(result.data));
  })
  .catch((error) => {
    console.error('Error fetching current user: ', error);
  });
};