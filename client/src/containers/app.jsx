import React from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Settings from './settings.jsx';
import MusicSettings from './musicSettings.jsx';
import Game from './game.jsx';
import MultiPlayer from './multiPlayer.jsx';
import Score from './score.jsx';
import {Link, IndexRoute, browserHistory, DefaultRoute} from 'react-router';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import {getCurrentUser} from '../actions/index';



class App extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount () {
    this.props.getCurrentUser();
  }

  render() {
    return (
      <div>
        <Router history={browserHistory}>
          <div>
            <Route exact path='/' component={Settings} />
            <Route path='/multiPlayer' component={MultiPlayer} />
            <Route path='/musicSettings' component={MusicSettings} />
            <Route path='/game' component={Game} />
            <Route path='/score' component={Score} />
          </div>
        </Router>
      </div>
    );
  }
}

var mapStateToProps = (state) => {
  return {
    view: state.currentUser
  };
};

var mapDispatchToProps = (dispatch) => {
  return bindActionCreators({getCurrentUser: getCurrentUser}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);