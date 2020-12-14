import logo from './logo.svg';
import './App.css';
import Board from './components/Board';

function App() {
  return (
    <Board categories={["category", "category2", "category3", "category4", "category5", "category6"]}/>
  );
}

export default App;
