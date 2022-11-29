import React, {useState} from 'react';

const BoardContext = React.createContext({
	boardState: '',
	activePlayer: '',
	winner: '',
	resetBoard: () => {},
	swapPlayer: () => {},
	checkWinner: (r, c) => {},
	addWin: (player) => {},
	wins: [],
})

const defaultState = {
	board: [
		['', '', ''],
		['', '', ''],
		['', '', '']
	],
	player: 'X',
	winner: null,
	wins: [0,0]
}

export function BoardContextProvider(props) {

	const [boardState, setBoardState] = useState(defaultState.board);
	const [activePlayer, setActivePlayer] = useState(defaultState.player);
	const [winner, setWinner] = useState(defaultState.winner);
	const [wins, setWins] = useState(defaultState.wins);

	const swapPlayer = () => {
		let player;
		activePlayer === 'X' ? player = 'O' : player = 'X';
		setActivePlayer(player);
	}

	const resetBoard = () => {
		setBoardState(defaultState.board);
		setActivePlayer(defaultState.player);
		setWinner(defaultState.winner);
	}

	const checkRowForWin = (board, row) => {
		return board[row].every(cell => cell === activePlayer)
	}
	const checkColumnForWin = (board, col) => {
		const player = activePlayer;
		for(let i=0; i < 3; i++) {
			if(board[i][col] !== player) return;
		}
		return true;
	}
	const checkDiagonalForWin = (board, row, col) => {
		const player = activePlayer;
		const playerHasSquare = (row, col) => board[row][col] === player;
		if(!playerHasSquare(1,1)) return false;
		if(playerHasSquare(0,0) && playerHasSquare(2,2)) return true;
		if(playerHasSquare(0,2) && playerHasSquare(2,0)) return true;
	}

	const addWin = (player) => {
		let score = wins;
		player === 'X' ? score[0]++ : score[1]++;
		setWins(score);
	}

	const checkDraw = (board) => {
		let state = board.filter(arr => arr.includes(''));
		return state.length === 0;
	}

	const checkWinner = (board, row, col) => {
		const playerChecked = activePlayer;

		const checkedRow = checkRowForWin(board, row);
		const checkedCol = checkColumnForWin(board, col);
		const checkedDiag = checkDiagonalForWin(board, row, col);

		if(checkedRow || checkedCol || checkedDiag) {
			setWinner(playerChecked);
			addWin(playerChecked);
			return;
		}

		if(checkDraw(board)) setWinner('Draw');
	};

	const contextValue = {
		boardState,
		setBoardState,
		resetBoard,
		activePlayer,
		swapPlayer,
		checkWinner,
		winner,
		wins,
	}

	return (
		<BoardContext.Provider value={contextValue}>
			{props.children}
		</BoardContext.Provider>
	)
}

export default BoardContext