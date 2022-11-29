import React, { useContext } from 'react'
import Square from './Square'

import './Board.css';
import BoardContext from './store/BoardContext';

function Board(props) {

	const boardCtx = useContext(BoardContext);

	const validateSquare = (row, col) => {
		if (boardCtx.winner) return;
		const sq = boardCtx.boardState[row][col];
		if (sq !== '') return;
		updateSquare(row, col)
	}

	const updateSquare = (row, col) => {
		let newState = boardCtx.boardState.map(i => [...i])
		newState[row][col] = boardCtx.activePlayer;
		boardCtx.setBoardState(newState);
		boardCtx.checkWinner(newState, row, col);
		boardCtx.swapPlayer();
	}

	const rowContainer = (row) => {
		return (
			<div className='row'>
				<Square id={row + '0'} row={row} col='0' onClick={validateSquare} />
				<Square id={row + '1'} row={row} col='1' onClick={validateSquare} />
				<Square id={row + '2'} row={row} col='2' onClick={validateSquare} />
			</div>
		)
	}

	return (
		<div className='board'>
			{rowContainer('0')}
			{rowContainer('1')}
			{rowContainer('2')}
		</div>
	)
}

export default Board