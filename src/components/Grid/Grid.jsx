import { useState } from 'react';
import Card from '../Card/Card';
import './Grid.css';
import isWinner from '../../helpers/checkHelpers.js';

function Grid({ numberOfCards }) {
  const [board, setBoard] = useState(Array(numberOfCards).fill(' '));
  const [turn, setTurn] = useState(true); // true = ? O, false => X
  const [winner, setWinner] = useState(null);

  function play(index) {
    if (turn == true) {
      board[index] = 'O';
    } else {
      board[index] = 'X';
    }
    const win = isWinner(board, turn ? 'O' : 'X');
    if (win) {
      setWinner(win);
    }
    setBoard([...board]);
    setTurn(!turn);
  }

  function reset() {
    setTurn(true);
    setWinner(null);
    setBoard(Array(numberOfCards).fill(' '));
  }
  return (
    <div className='gridWrapper'>
      {winner && (
        <>
          <h1 className='turn-highlight'>Winner is {winner}</h1>
          <button className='reset' onClick={reset}>
            Reset Game
          </button>
        </>
      )}
      <h1 className='turn-highlight'>Current turn: {turn ? 'O' : 'X'}</h1>
      <div className='grid'>
        {board.map((ele, idx) => (
          <Card
            key={idx}
            onPlay={play}
            player={ele}
            index={idx}
            gameEnd={winner ? true : false}
          />
        ))}
      </div>
    </div>
  );
}

export default Grid;
