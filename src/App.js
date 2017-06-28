import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
    constructor(){
    super();
    this.state={
      beggin:false,
    };
  }

 
  gameStart(){
 
    if (this.state.beggin){
      return <Board />
    }else{
      <p>hi there</p>
    }
  }

  render() {
         let game; 
          if(this.state.beggin){
            game='End'
          }else{
            game='Start'
          }
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome YOU</h2>
        </div>
        <button onClick={()=>this.setState({beggin:!this.state.beggin})} className="btn">{game} The Game</button>
            {this.gameStart()}
      </div>
    );
  }
}
export default App;


function Square(props){
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
}
class Board extends Component {
   constructor(){
    super();
    this.state={
      squares:Array(9).fill(null),
      xIsNext:true,
    };
  }

  handelClick(i){
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i]=(this.state.xIsNext ? 'X':'O');
    this.setState({
        squares: squares,
        xIsNext:!this.state.xIsNext,
    });

  }

  squareRender(i){
      return (
        <Square  
        value={this.state.squares[i]} 
        onClick={()=>this.handelClick(i)}/>
      );
    }
    render(){
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
          status = 'THE WINNER : ' + winner;
        } else {
          status = (this.state.xIsNext ? 'X' : 'O') + ' - YOUR TURN';
        }
      return(
        <div className="container">
          <div className="status">
          {status}
          </div>
          <div className="board">
          <div className="board-row">
            {this.squareRender(0)}
            {this.squareRender(1)}
            {this.squareRender(2)}
          </div>
          <div className="board-row">
            {this.squareRender(3)}
            {this.squareRender(4)}
            {this.squareRender(5)}
          </div>
          <div className="board-row">
            {this.squareRender(6)}
            {this.squareRender(7)}
            {this.squareRender(8)}
            </div>
          </div>
        </div>
        )
    }
  }

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}