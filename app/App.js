import Inferno from "inferno";
import Component from "inferno-component";
import { connect } from "inferno-mobx";
import { observer } from "inferno-mobx";

class App extends Component {
  constructor(...args) {
    super(...args);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrev = this.gotoPrev.bind(this);
    this.reset = this.reset.bind(this);
    this.state = {
      displayNoNext: false,
      displayNoPrev: false
    };
  }
  gotoPrev() {
    const { game } = this.props.store;
    if (game.canGoPrev) {
      game.gotoPrev();
    } else {
      this.setState({
        displayNoPrev: true
      });
    }
  }
  // reset current level
  reset() {
    this.props.store.game.reset();
  }
  gotoNext() {
    const { game } = this.props.store;
    if (game.canGoNext) {
      game.gotoNext();
    } else {
      this.setState({
        displayNoNext: true
      });
    }
  }
  invert(i, j) {
    this.props.store.game.invert(i, j);
  }
  render() {
    const { board } = this.props.store.game;
    return (
      <div className="container">
        <header className="header">
          <h1 className="title">Inverter</h1>
          <h2 className="sub-heading">a lights out game</h2>
        </header>
        <section className="game-board">
          <table cellSpacing={2} className="game-board-table">
            <tbody>
              {board.map((row, i) => (
                <tr className="board-row">
                  {row.map((col, j) => (
                    <td
                      className={`board-cell ${col ? "off" : "on"}`}
                      onClick={() => this.invert(i, j)}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className="controls">
          <div className="control" onClick={this.gotoPrev}>Prev</div>
          <div className="control" onClick={this.reset}>Reset</div>
          <div className="control" onClick={this.gotoNext}>Next</div>
        </section>
      </div>
    );
  }
}

export default connect(["store"], App);
