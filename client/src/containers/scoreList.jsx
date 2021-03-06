import React from 'react';
import $ from 'jquery';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectUser} from '../actions/index';
import {Modal} from 'react-bootstrap';

class ScoreList extends React.Component {

  createScoreListEntries() {
    var sorted = this.props.users.sort( (a, b) => {
      return b.score - a.score;
    });
    return sorted.map((user) => {
      return (
        <div>




          <li key={user.id} onClick={() => this.props.selectUser(user)}>
            <div className="col-sm-8" style={{background:'lightgrey', height: 50}}><img src={user.image} height="45" width="45"/>{user.username}</div>
            <div className="col-sm-6-offset-4" style={{background:'lightgrey', height: 50}}>{user.score}<br></br></div>
          </li>
        </div>
      );
    });
  }

  render () {
    return (
      <div>
        <ol>
          {this.createScoreListEntries()}
        </ol>
      </div>
    );
  }
}


var mapStateToProps = (state) => {
  return {
    users: state.users
  };
};

var matchDispatchToProps = (dispatch) => {
  return bindActionCreators({selectUser: selectUser}, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(ScoreList);


   // <Button data-toggle="modal">
        // <Modal show="true">
        // <Modal.Header closeButton>
        //     <Modal.Title>Modal heading</Modal.Title>
        //   </Modal.Header>
        // </Modal>