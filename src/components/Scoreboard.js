import React, { useContext } from 'react'
import BoardContext from './store/BoardContext'

import './Scoreboard.css';

function Scoreboard(props) {
	const boardCtx = useContext(BoardContext);

	const handleReset = () => {
		boardCtx.resetBoard();
	}

	return (
		<div className='scoreboard'>
			<h2>Next Player: {boardCtx.activePlayer}</h2>
			<h2>Winner: {boardCtx.winner} </h2>
			<button 
				onClick={handleReset}
				className='reset-button'
			>
				RESET
			</button>
			<div className='wins'>
				<h3>X Wins: {boardCtx.wins[0]}</h3>
				<h3>O Wins: {boardCtx.wins[1]}</h3>
			</div>
			
		</div>
	)
}

export default Scoreboard