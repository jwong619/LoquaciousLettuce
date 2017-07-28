import {combineReducers} from 'redux';
import test from './example.js';
import UserReducer from './reducer-users'; // change back to reducer-users when fixed null case and undefined
import GameReducer from './reducer-game';
import ViewReducer from './reducer-view';
import ShowScoreModalReducer from './reducer-score-modal';
import SelectedUserReducer from './reducer-selected-user';
import HomeViewReducer from './reducer-home-view';
import MusicReducer from './reducer-music';
import LibraryReducer from './reducer-library';
// import totalScoreSingleReducer from './reducer-total-score-single';

//combined reducers comines all the files inside the reduce file and allReducer becomes the storage
const allReducers = combineReducers({
  //individual sub-storage
  users: UserReducer,
  selectedUser: SelectedUserReducer,
  game: GameReducer,
  view: ViewReducer,
  homeView: HomeViewReducer,
  showScoreModal: ShowScoreModalReducer,
  music: MusicReducer,
  library: LibraryReducer
});

export default allReducers;
