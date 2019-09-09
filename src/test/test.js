// /**
//  * Creating Pomodoro App
//  */
// var PomodoroApp = React.createClass({

//     // default values
//     getInitialState: function() {
//         return {
//             session: 25,
//             break: 5,
//             timer: 25 * 60,
//             isSessionNow: true,
//             isPaused: false,
//             eAngle: 0,
//             isUpdated: false
//         };
//     },

//     updateStats: function(newTime, token, didUpdate) {

//         if (token === 'break') {
//             this.setState({
//                 break: newTime
//             });

//             if (!this.state.isSessionNow) {
//                 this.setState({
//                     timer: newTime * 60,
//                     isUpdated: didUpdate
//                 });
//             }
//         }

//         if (token === 'session') {
//             this.setState({
//                 session: newTime
//             });

//             if (this.state.isSessionNow) {
//                 this.setState({
//                     timer: newTime * 60,
//                     isUpdated: didUpdate
//                 });
//             }
//         }
//     },

//     // starts the Pomodoro Timer
//     startPomodoro: function() {

//         // timer according session or break
//         var timer;
//         // audio links
//         var wav = 'http://www.oringz.com/oringz-uploads/sounds-917-communication-channel.mp3';
//         var audio = new Audio(wav);

//         var canvas = document.getElementById('draw-circle');
//         var context = canvas.getContext('2d');
//         var centerX = canvas.width / 2;
//         var centerY = canvas.height / 2;
//         var radius = 200;
//         var offset;

//         if (this.state.isSessionNow) {
//             offset = 2 * Math.PI / (this.state.session * 60);
//             context.strokeStyle = '#00FF00';

//             if (this.state.timer > 0) {
//                 timer = this.state.timer;
//             }
//             else {
//                 timer = this.state.session * 60;
//             }
//         }
//         else {
//             offset = 2 * Math.PI / (this.state.break * 60);
//             context.strokeStyle = '#ff0000';

//             if (this.state.timer > 0) {
//                 timer = this.state.timer;
//             }
//             else {
//                 timer = this.state.break * 60;
//             }
//         }

//         // if we time changed redraw canvas
//         if (this.state.isUpdated) {
//             context.clearRect(0, 0, canvas.width, canvas.height);
//             this.setState({
//                 eAngle: 0
//             })
//         }

//         // timer starting
//         if (!this.state.isPaused) {
//             this.state.interval = setInterval(function() {
//                 // timer not ended
//                 if (--timer >= 0) {

//                     context.beginPath();
//                     context.arc(centerX, centerY, radius, 1.5 * Math.PI, 1.5 * Math.PI + this.state.eAngle, false);
//                     context.lineWidth = 3;
//                     context.stroke();

//                     this.setState({
//                         timer: timer,
//                         eAngle: this.state.eAngle + offset
//                     });
//                 }
//                 // timer ended
//                 else {
//                     // play audio
//                     audio.play();
//                     // change state
//                     this.setState({
//                         isSessionNow: !this.state.isSessionNow,
//                         isPaused: false,
//                         eAngle: 0
//                     });
//                     // clear interval
//                     clearInterval(this.state.interval);
//                     // clear canvas
//                     context.clearRect(0, 0, canvas.width, canvas.height);
//                     // restart pomodoro
//                     this.startPomodoro();
//                 }
//             }.bind(this), 25);
//         }
//         else {
//             clearInterval(this.state.interval);
//         }

//         this.setState({
//             isPaused: !this.state.isPaused,
//             isUpdated: false
//         });
//     },

//     // display time in minutes and seconds
//     displayTime: function() {
//         var mins = parseInt(this.state.timer / 60);
//         var secs = parseInt(this.state.timer % 60);

//         mins = mins < 10 ? "0" + mins : mins;
//         secs = secs < 10 ? "0" + secs : secs;

//         return mins + ':' + secs;
//     },

//     // render components of ne the page
//     render: function() {

//         return (
//             <div id="main" className="text-center">
//                 <h1 id="title-app">Pomodoro Clock</h1>

//                 <div id="content">
//                     <div className="row">
//                         <Widget onTimeChanged={this.updateStats} sessOrBreakTime={this.state.break}
//                                 token="break" isActive={this.state.isPaused}
//                         />

//                         <Widget onTimeChanged={this.updateStats} sessOrBreakTime={this.state.session}
//                                 token="session" isActive={this.state.isPaused}
//                         />
//                     </div>

//                     <div id="timer" onClick={this.startPomodoro} className="center-block">
//                         <canvas id="draw-circle" width="500" height="500"></canvas>
//                         <div className="inner-wrap-timer">
//                             <h2 id="title-state">{this.state.isSessionNow ? 'Session' : 'Break'}</h2>
//                             <div id="curr-time">{this.displayTime()}</div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// });

// /**
//  * Creating Widget
//  */
// var Widget = React.createClass({

//     getInitialState: function() {
//         return {
//             sessOrBreakTime: this.props.sessOrBreakTime,
//             token: this.props.token,
//             isUpdated: this.props.isUpdated
//         };
//     },

//     handleTimeUp: function() {
//         this.updateState(this.state.sessOrBreakTime + 1);
//     },

//     handleTimeDown: function() {
//         this.updateState(this.state.sessOrBreakTime - 1);
//     },

//     updateState: function(newTime) {

//         var updateTime = newTime;
//         // max time in mins 60
//         var max = 60;
//         // min time in mins 1
//         var min = 1;

//         // did update time
//         var isUpdated = true;

//         if (updateTime > max) {
//             updateTime = max;
//         }
//         else if (updateTime < min) {
//             updateTime = min;
//         }

//         //
//         this.setState({
//             sessOrBreakTime: updateTime,
//             eAngle: 0,
//         });

//         this.props.onTimeChanged(updateTime, this.state.token, isUpdated);
//     },

//     // render components of ne the page
//     render: function() {
//         return (
//             <div id={this.props.token} className="col-xs-6">
//                 <h5 className="state">{this.props.token}</h5>
//                 <button onClick={this.handleTimeDown}
//                         disabled={this.props.isActive}
//                         className="btn btn-default btn-style">
//                     -
//                 </button>

//                 <span className="state-time">{this.state.sessOrBreakTime} mins</span>

//                 <button onClick={this.handleTimeUp}
//                         disabled={this.props.isActive}
//                         className="btn btn-default btn-style">
//                     +
//                 </button>
//             </div>
//         );
//     },
// });

// ReactDOM.render(<PomodoroApp />, document.querySelector('.container'));
