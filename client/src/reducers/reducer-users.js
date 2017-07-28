import UsersData from './reducer-sample-data';

export default (state = UsersData, action) => {
  switch (action.type) {
    case 'UPDATE_USERS_SCORES':
      state = action.payload;
      break;
  }
  // return NewsFeedData;
  return state;
};