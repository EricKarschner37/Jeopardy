import Square from "./Square";

const Board = (props) => {
  const revealClue = (row, col) => {
    console.log("Revealing: (" + row + ", " + col + ")")
  }

  const getCostForRow = (row) => (row + 1) * 200;
  const handleSquareClick = (row, col) => revealClue(row, col);

  const categories = []
  props.categories.map((category, key) => {
    categories.push(<th key={key} className="category"><p>{category}</p></th>)
  })

  const rows = []
  for (let i = 0; i < 5; i++) {
    const clues = []
    for (let j = 0; j < 6; j++) {
      clues.push(<Square cost={getCostForRow(i)} onSquareClick={handleSquareClick} row={i} col={j} hasBeenClicked={false}/>)
    }
    rows.push(clues)
  }

  return (
    <table id="clue_table">
      <tbody>
        <tr>
          {categories}
        </tr>
        {rows.map((row) => {
            return <tr>{row}</tr>
        })}
      </tbody>
    </table>
  )
}


export default Board;
