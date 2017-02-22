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
    const {
      board,
      level,
      complete,
      percentageComplete
    } = this.props.store.game;

    return (
      <div className="container">
        <header className="header">
          <h1 className="title">Inverter</h1>
          <h2 className="sub-heading">a lights out game</h2>
        </header>
        <div
          className="level-statuses"
          style={{ transform: `translateX(${percentageComplete - 100}vw)` }}
        />
        <section className="level-container">
          <h1 className={`level ${complete ? "complete" : ""}`}>
            Level #{level} {complete ? "✔" : ""}
          </h1>
        </section>
        <section className="game-board">
          <table cellSpacing={16} className="game-board-table">
            <tbody>
              {board.map((row, i) => (
                <tr className="board-row">
                  {row.map((col, j) => (
                    <td
                      className={`board-cell ${col ? "off" : "on"}`}
                      onClick={() => this.invert(i, j)}
                    >
                      <div className="glow" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className="controls">
          <div className="control" onClick={this.gotoPrev}>
            <div className="icon">⇦</div>
            <div>Prev</div>
          </div>
          <div className="control" onClick={this.reset}>
            <div className="icon">⟲</div>
            <div>Reset</div>
          </div>
          <div className="control" onClick={this.gotoNext}>
            <div className="icon">⇨</div>
            <div>Next</div>
          </div>
        </section>
      </div>
    );
  }
}

export default connect(["store"], App);
