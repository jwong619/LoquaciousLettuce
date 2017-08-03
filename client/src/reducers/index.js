import {combineReducers} from 'redux';
import test from './example.js';
import GameReducer from './reducer-game';
import ViewReducer from './reducer-view';
import ShowScoreModalReducer from './reducer-score-modal';
import SelectedUserReducer from './reducer-selected-user';
import MusicReducer from './reducer-music';
import LibraryReducer from './reducer-library';
import CurrentUserReducer from './reducer-current-user';
import ActiveProfileReducer from './reducer-active-profile';
import YoutubeReducer from './reducer-youtube';
import TopTenReducer from './reducer-top-ten';


//combined reducers comines all the files inside the reduce file and allReducer becomes the storage
const allReducers = combineReducers({
  //individual sub-storage
  selectedUser: SelectedUserReducer,
  game: GameReducer,
  view: ViewReducer,
  showScoreModal: ShowScoreModalReducer,
  music: MusicReducer,
  library: LibraryReducer,
  currentUser: CurrentUserReducer,
  activeProfileReducer: ActiveProfileReducer,
  youtube: YoutubeReducer,
  topTen: TopTenReducer
});

export default allReducers;
