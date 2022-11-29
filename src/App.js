import './App.css';
import Board from './components/Board';
import Scoreboard from './components/Scoreboard';

function App() {
	return (
		<div className="App">
			<Scoreboard />
			<Board />
		</div>
	);
}

export default App;
