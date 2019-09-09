import React,{ Component } from 'react';
import './App.css';

import Session from './components/Session';
import Break from './components/Break';
import Display from './components/Display';
import Menu from './components/Menu';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      Break: 5,
      Session: 25,
      Time: 25*60*1000,
      Stop: true,
      Display: 'Session',
      State: true
    }

    this.url = "https://goo.gl/65cBl1";//tạo đường dẫn đến link chứa file âm thanh
    this.audio = new Audio(this.url)//tạo ra 1 thẻ audio

    this.handleBreakClickDown = this.handleBreakClickDown.bind(this)
    this.handleBreakClickUp = this.handleBreakClickUp.bind(this)
    this.handleSessionClickDown = this.handleSessionClickDown.bind(this)
    this.handleSessionClickUp = this.handleSessionClickUp.bind(this)
    this.handleMenuClickStart = this.handleMenuClickStart.bind(this)
    this.handleMenuClickPause = this.handleMenuClickPause.bind(this)
    this.handleMenuClickWipeAll = this.handleMenuClickWipeAll.bind(this)
  }

  handleBreakClickDown(){
    if(this.state.Stop){
      if ( this.state.Break > 1 )
    this.setState({
      Break : this.state.Break - 1,
    })
  }
}
  handleBreakClickUp(){
    if(this.state.Stop){
      if ( this.state.Break < 60 )
    this.setState({
      Break : this.state.Break + 1,
    })
  }
}
  handleSessionClickDown(){
    if(this.state.Stop){
      if ( this.state.Session > 1 )
    this.setState({
      Session : this.state.Session - 1,
      Time :( this.state.Session -1 ) * 60 * 1000
      })
    }
  }
  handleSessionClickUp(){
    if(this.state.Stop){
      if ( this.state.Session < 60 )
    this.setState({
      Session : this.state.Session + 1,
      Time :( this.state.Session + 1 ) * 60 * 1000
      })
    }
  }
  handleMenuClickStart(){
    //đầu tiên chuyển về false 
    this.setState({Stop: false})
    //tạo 1 biến interval
    let interval = setInterval(() => {
      if(this.state.Stop === false ){ //nếu là false thì đếm 
        if(this.state.Time > 0){
      this.setState({
        Time: this.state.Time - 1000
      })
    }
    else{
      if(this.state.State === true)
      this.setState({
        Time: this.state.Break * 60 * 1000,
        Display: 'Break',
        State: ! this.state.State
      })
      else{
        this.setState({
          Time: this.state.Session * 60 * 1000,
          Display: 'Session',
          State: ! this.state.State
        })
      }
    }
    }
      else{
        clearInterval(interval)  //nếu là false thì xóa bỏ interval để dừng đếm ngược
      }
    }, 1000);
}
handleMenuClickPause(){
  this.setState({Stop: true});
  this.audio.pause();
}
handleMenuClickWipeAll(){
  this.setState({
    Break: 5,
      Session: 25,
      Time: 25*60*1000,
      Stop: true,  //chuyển về true để pause lại nếu không nó sẽ vẫn chạy tiếp
      Display: 'Session',
      State: true
  })
}
  render(){
    if(this.state.Time === 0){
      this.audio.play();
      console.log('ring ring ring')
    }
  return (
    <div className="App">                          
      <div><h1>Pomodoro Clock</h1></div>
      <div className='Length'>
      <Break 
      Time ={this.state.Break}
      handleBreakClickDown = {this.handleBreakClickDown}
      handleBreakClickUp = {this.handleBreakClickUp}
      >
      </Break>

      <Session 
      Session = {this.state.Session} 
      handleSessionClickDown = {this.handleSessionClickDown}
      handleSessionClickUp = {this.handleSessionClickUp}
      >
      </Session>
      </div>

      <Display 
      Time={this.state.Time}
      Display={this.state.Display}
      >
      </Display>

      <Menu 
      handleMenuClickStart = {this.handleMenuClickStart}
      handleMenuClickPause = {this.handleMenuClickPause}
      handleMenuClickWipeAll = {this.handleMenuClickWipeAll}
      />
    </div>
  );
}
}

export default App;   