import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
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
    nrows : 5,
    ncols : 5,
    chanceLightStartsOn : 0.25
  };

  constructor(props) {
    super(props);
    // TODO: set initial state
    this.state = {
      hasWon : false,
      board : this.createBoard()
    }
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    for(let x=0; x < this.props.nrows; x++){
      let row = [];
      for(let y=0; y< this.props.ncols; y++){
        row.push(Math.random() < this.props.chanceLightStartsOn);
      }
      board.push(row);
    }
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    //console.log("Flipping", coord);
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(x, y) {
      // if this coord is actually on board, flip it
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    // TODO: flip this cell and the cells around it

    flipCell(x,y);
    flipCell(x,y+1);
    flipCell(x,y-1);
    flipCell(x-1,y);
    flipCell(x+1,y);

    // win when every cell is turned off
    // TODO: determine is the game has been won

    let hasWon = board.every(row => row.every(cell => !cell));

    this.setState({board : board, hasWon : hasWon});
  }


  /** Render game board or winning message. */

  render() {

    // if the game is won, just show a winning msg & render nothing else

    // TODO
    if(this.state.hasWon){
      return (
        <div>
          <div className="neon">You</div>
          <div className="flux">Won!</div>
        </div>
      )
    }

    // make table board
    let tblboard = [];
    for(let x=0; x<this.props.nrows; x++){
      let tblRow = [];
      for(let y=0; y<this.props.ncols; y++){
        let coord = `${x}-${y}`;
        tblRow.push(
        <Cell 
          key={coord} 
          isLit={this.state.board[x][y]}
          flipCellsAroundMe={() => this.flipCellsAround(coord)}
        />
        );
      }
      tblboard.push(<tr key={x}>{tblRow}</tr>)
    };

    // TODO
    return (
      <div>
        <div className="board-title">
          <div className="neon">Lights</div>
          <div className="flux">Out</div>
        </div>
        <table className="Board">
          <tbody>
            {tblboard}
          </tbody>
        </table>
      </div>
    )

  }
}


export default Board;
