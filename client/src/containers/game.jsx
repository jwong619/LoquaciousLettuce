import React from 'react';
import ReactDOM from 'react-dom';
import keyboardJS from 'keyboardjs';
import patterns from './patterns.jsx';
import { Redirect, Link } from 'react-router-dom';
import ReactAudioPlayer from 'react-audio-player';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeSong, getGame} from '../actions/index';


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      hit: false,
      game: false,
      ongoing: false,
      song: this.props.game.song,
      bpm: this.props.game.bpm,
      difficulty: this.props.game.difficulty,
      player: this.props.game.difficulty,
      attemptPresses: 0
    };
    this.increaseScore = this.increaseScore.bind(this);
    this.updateCanvas = this.updateCanvas.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.increaseAttempt = this.increaseAttempt.bind(this);
    this.decreaseAttempt = this.decreaseAttempt.bind(this);
  }

  componentDidMount() {
    console.log('THIS IS THE GAME', this.props.game);
  }

  handleOptionChange (changeEvent) {
    this.setState({
      difficulty: changeEvent.target.value
    });
  }
  increaseScore() {
    this.setState({score: this.state.score + 10, hit: true});
  }

  increaseAttempt() {
    this.setState({attemptPresses: this.state.attemptPresses + 1});
    console.log(this.state.attemptPresses);
  }
  decreaseAttempt() {
    this.setState({attemptPresses: this.state.attemptPresses - 1});
    console.log(this.state.attemptPresses);
  }

  startSong() {
    var audio = ReactDOM.findDOMNode(this.refs.audio);

    console.log(audio);
    this.setState({game: true});
    console.log(this.state.game);
    if (this.state.game === true) {
      if (this.state.ongoing === false) {
        this.updateCanvas();
        audio.play();
        this.setState({ongoing: true});
      }
    }
  }

  updateCanvas() {
    if (this.state.game === true) {
      var canvas = this.refs.canvas;
      var ctx = this.refs.canvas.getContext('2d');
      var context = this;
      ListenEvents();

      var makeBall = function (xCor, yCor, color, keyBind) {
        var ball = {
          x: xCor,
          y: yCor,
          vx: 0,
          vy: 4,
          radius: 10,
          color: color,
          keyBind: keyBind,
          draw: function() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fillStyle = this.color;
            ctx.fill();
          }
        };
        return ball;
      };

      var makeRow = function(hexCode) {
        var rowArr = [0, 0, 0, 0, ];
        var corArr = ['a', 's', 'd', 'f'];
        for (let i = 0; i < 4; i++) {
          if (patterns[hexCode][i] === 1) {
            rowArr[i] = {
              position: 1,
              keyCode: corArr[i]
            };
          }
        }

        let row = {
          balls: [],
          drawRow: function () {
            row.balls.forEach(function(ball) {
              ball.draw();
            });
          },
          advanceRow: function () {
            row.balls.forEach(function(ball) {
              ball.y += ball.vy;
            });
          },
        };
        var color = '#' + Math.random().toString(16).substr(-6);
        for (let i = 0; i < rowArr.length; i ++) {
          if (rowArr[i].position === 1) {
            row.balls.push(makeBall(i * 100 + 50, 100, color, rowArr[i].keyCode));
          }
        }
        return row;
      };

      var allRows = {
        rows: [],

        flashDots: function() {
          if (this.rows[0]) {
            if (this.rows[0].balls) {
              if (this.rows[0].balls) {
                if (this.rows[0].balls[0].y > 540 && this.rows[0].balls[0].y < 560) {
                  this.rows[0].balls.forEach(function(ball) {
                  ball.color = 'white';
                });
                } else if (this.rows[0].balls[0].y > 575) {
                this.rows[0].balls.forEach(function(ball) {
                  ball.color = 'red';
                });
              }
              }
            }
          }
        },

        checkDelete: function() {
          for (let i = 0; i < this.rows.length; i++) {
            if (this.rows[0]) {
              if (this.rows[0].balls) {
                if (this.rows[0].balls) {
                  if (this.rows[0].balls.length === 0 || this.rows[0].balls[0].y > 580) {
                  this.rows.shift();
                }
                }
              }
            }
          }
        }
      };



      var counter = 0;
      function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'black';
        ctx.fillRect(5, 5, 400, 600);

        if (context.state.hit === true) {
          if (counter === 5) {
            context.setState({hit: false});
            counter = 0;
          } else {
            ctx.fillStyle = 'blue';
            ctx.fillRect(0, 575, 400, 10);
            counter++;
            ctx.fillStyle = 'white';
          }
        } else {
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 572.5, 400, 10);
        }
        ctx.font = '40px Arial';
        ctx.fillText('Score: ' + context.state.score, 10, 50);
        allRows.rows.forEach(function(row) {
          row.drawRow();
          row.advanceRow();
        });
        allRows.checkDelete();
        allRows.flashDots();

      }


      setInterval(()=> {
        draw();
      }, 1000 / 30);

      var modifier = 1;
      if (context.state.difficulty === 'super_beginner') {
        modifier = .25;
      } else if (context.state.difficulty === 'beginner') {
        modifier = .5;
      } else if (context.state.difficulty === 'intermediate') {
        modifier = 1;
      } else if (context.state.difficulty === 'advanced') {
        modifier = 2;
      } else if (context.state.difficulty === 'rockstar') {
        modifier = 4;
      }
      console.log(modifier);

      setInterval(()=>{
        allRows.rows.push(makeRow(Math.floor(Math.random() * 10)));
      }, Math.floor(60000 / (context.state.bpm * modifier)) );


      var checkMove = () => {
        console.log(allRows);
        var output = allRows.rows[0].balls.map(function(ball) {
          return (ball.keyBind);
        });
        output = [output.join('')];
        output.push(Math.abs(575 - allRows.rows[0].balls[0].y));
        return output;
      };

      function ListenEvents() {
        var validMove = (keyCodes) =>{
          context.increaseAttempt();
          var moveCheck = checkMove();
          if (keyCodes.length === 2) {
            context.decreaseAttempt();
          }
          if (moveCheck[moveCheck.length - 1] < 35) {
            if (moveCheck[0] === keyCodes) {
              context.increaseScore();
              ctx.fillStyle = 'black';
              ctx.fillRect(0, 575, 400, 5);
            }
          }
        };

        function listenToA() {
          keyboardJS.bind('a', function(e) {
            validMove('a');
          });
        }
        listenToA();

        function listenToS() {
          keyboardJS.bind('s', function(e) {
            validMove('s');
          });
        }
        listenToS();

        function listenToD() {
          keyboardJS.bind('d', function(e) {
            validMove('d');
          });
        }
        listenToD();

        function listenToF() {
          keyboardJS.bind('f', function(e) {
            validMove('f');
          });
        }
        listenToF();

        function listenToAS() {
          keyboardJS.bind('a + s', function(e) {
            validMove('as');
          });
        }
        listenToAS();

        function listenToAD() {
          keyboardJS.bind('a + d', function(e) {
            validMove('ad');
          });
        }
        listenToAD();

        function listenToAF() {
          keyboardJS.bind('a + f', function(e) {
            validMove('af');
          });
        }
        listenToAF();

        function listenToSD() {
          keyboardJS.bind('s + d', function(e) {
            validMove('sd');
          });
        }
        listenToSD();

        function listenToSF() {
          keyboardJS.bind('s + f', function(e) {
            validMove('sf');
          });
        }
        listenToSF();

        function listenToDF() {
          keyboardJS.bind('d + f', function(e) {
            validMove('df');
          });
        }
        listenToDF();
      }
    }
  }

  trackEnd() {
    console.log('The song has ended');
  }

  render() {
    var boundEnd = this.trackEnd.bind(this);
    var startSong = this.startSong.bind(this);
    var song = this.state.song;
    return (
      <div>
        <Link to='/score'>Scores and Stats</Link>
        <div>
          <canvas ref="canvas" width={600} height={625}/>
        </div>
              <ReactAudioPlayer
                src={`assets/music/${song}`}
                autoPlay={false}
                controls={false}
                ref="audio"
                onEnded={function() { boundEnd(); } }
              />
              <button onClick={function() { startSong(); } }> Start Song </button>
      </div>
    );
  }
}
var mapStateToProps = (state) => {
  return {
    game: state.game
  };
};

var matchDispatchToProps = (dispatch) => {
  return bindActionCreators({getGame: getGame, changeSong: changeSong}, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(Game);