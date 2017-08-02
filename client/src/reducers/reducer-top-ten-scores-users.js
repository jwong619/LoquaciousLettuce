import UsersData from './reducer-sample-data';

export default (state = UsersData, action) => {
  console.log('here');
  switch (action.type) {
    case 'UPDATE_TOP_TEN_USERS': {
      state = action.payload;
      console.log('hereeeeeee');
      break;
    }
  }
  return state;
};