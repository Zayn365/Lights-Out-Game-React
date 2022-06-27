import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrow s: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
static defaultProps = {
  nrows: 5,
  ncols: 5,
  chanceLightStartsOn: 0.24
}
  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board : this.createBoard(),
    }

    // TODO: set initial state
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    for(let y =0; y < this.props.nrows; y++){
      let rows = [];
      for(let x = 0; x < this.props.ncols; x++){
        rows.push(Math.random() < this.props.chanceLightStartsOn);
      }
      board.push(rows)
    }
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    console.log("FLIP IT")
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }
   // TODO: flip this cell and the cells around it
    flipCell(y,x);//Flip the intial Cell
    flipCell(y,x -1);//Flip left
    flipCell(y,x + 1);//Flip right
    flipCell(y - 1,x);//Flip up
    flipCell(y + 1,x);//Flip down
    

    // win when every cell is turned off
    // TODO: determine is the game has been won
    let hasWon1 = board.every(row => row.every(cell => !cell));

    
    
    this.setState({board: board, hasWon : hasWon1});
  }
 

  /** Render game board or winning message. */
   
  render() { 
      if(this.state.hasWon){
        return (
          <div className="flex-win">
          <div className="Board-title">
            <div className="winner">
          <div className="neon-orange" style={{fontSize: "118px"}}>YOU</div>
          <div className="neon-blue">WIN!!</div>
          </div>
          </div>
          <button className="button-49" onClick={() => window.location.reload(false)}>PLAY AGAIN</button>
          </div>
        )
      }
       let tblcell = [];
       for(let y = 0; y < this.props.nrows; y++){
         let row = [];
         for(let x = 0; x < this.props.ncols; x++){
          let coord = `${y}-${x}`;
          row.push(<Cell key={coord} isLit= {this.state.board[y][x]} flipCellsAroundMe={() => this.flipCellsAround(coord)} />)
         }
         tblcell.push(<tr key={y}>{row}</tr>)
       }
   
      return (
        <div>
        <div className="Board-title">
          <div className="neon-orange">Lights</div>
          <div className="neon-blue">Out</div>
          </div>
          <table className="Board">
            <tbody>
              {tblcell}
            </tbody>
          </table>
     
        </div>
      )
  }

}


export default Board