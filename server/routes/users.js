'use strict';
const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers').Profiles; // THIS 'Profiles' COMES FROM 'server/controllers/index.js'

// router.route('/')
//   .get(ProfileController.getAll)
//   // .post(ProfileController.create)
//   ;


router.route('/:username/info')
  .get(ProfileController.getInfo);

// router.route('/:id') // NOTE: PAYLOAD DATA ARE EMBEDDED IN THE req OBJECT, BUT ALSO NOTE THAT IN THIS CASE, THE ID NUMBER IS PART OF THE URL (SEE 'server/controllers/profiles.js' TO SEE HOW THIS IS USED)
//   .get(ProfileController.getOne)
//   .put(ProfileController.update)
//   // .delete(ProfileController.deleteOne)
//   ;

module.exports = router;









// export const getTracks = (url, options) => (dispatch, getState) => {
//   axios.get(url, options)
//     .then((data) => {
//       var storage = data.data.tracks.items;
//       var count = 0;
//       var SpotifyIDstorage = [];
//       data.data['BPMItems'] = [];
//       for (var i = 0; i < storage.length; i ++) {
//         data.data.BPMItems.push(
//           axios('https://api.spotify.com/v1/audio-features/' + storage[i].id, options)
//             .then((data) => {
//               return data.data;
//             })
//         );
//       }
//       Promise.all(data.data.BPMItems)
//         .then(function(result) {
//           data.data.BPMItems = result;
//           return data.data;
//         })
//         .then((data)=> {
//           return dispatch(setTracks(data));
//         });
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };
// //*******************

// export const getNewsFeed = () => (dispatch, getState) => {
//   axios.get('/api/news')
//   .then((result) => {
//     return dispatch(setNewsFeed(result.data));
//   })
//   .catch((error) => {
//     console.error('Failed to fetch news: ', error);
//   });
// };


// export const getActiveProfile = (username) => (dispatch, getState) => {
//   return axios.get(`/user/${username}/info`)
//   .then((result) => {
//     return dispatch(setActiveProfile(result.data));
//   })
//   .catch((error) => {
//     console.error('Error fetching active profile: ', error);
//   });
// };

// export const getCurrentUser = () => (dispatch, getState) => {
//   return axios.get(`/user/info`)
//   .then((result) => {
//     return dispatch(setCurrentUser(result.data));
//   })
//   .catch((error) => {
//     console.error('Error fetching current user: ', error);
//   });
// };