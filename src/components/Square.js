import React, { useContext } from 'react'
import BoardContext from './store/BoardContext';

function Square(props) {
	const boardCtx = useContext(BoardContext)
	
	const handleClick = () => props.onClick(props.row, props.col);
	const value = boardCtx.boardState[props.row][props.col];

	return (
		<div
			className='square'
			onClick={handleClick}
		>
			<span id={props.id} style={{ color: value === 'X' ? 'red' : 'blue' }}>
				{value}
			</span>
		</div>
	)
}

export default Square