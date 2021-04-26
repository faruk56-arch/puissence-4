import React from 'react';

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.basic = [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0]
        ]
        this.state = {
            tourJoueurJaune: true,
            endGame: "",
            board: this.basic,
            hoverIndex: null
        }
    }


    resetBoard = () => {
        const newBoard = [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0]
        ];
        this.setState({ board: newBoard, endGame: 0 });
    }
    handleHover = (x) => {
        this.setState({ hoverIndex: x })
    }
    handleMouseLeave = () => {
        this.setState({ hoverIndex: null })
    }

    handleClick = x => {
        console.log("x", x);
        const joueur = this.state.tourJoueurJaune;
        let myNewBoard = [...this.state.board];
        const myCol = myNewBoard[x];

        for (let i = myCol.length - 1; i >= 0; i--) {
            if (myNewBoard[x][i] === 0) {
                (joueur)
                    ? myNewBoard[x][i] = 2
                    : myNewBoard[x][i] = 1
                break;
            }
        }

        // Victoire en colonne
        for (let col = 0; col < myNewBoard.length; col++) {
            for (let ln = 0; ln < myNewBoard[col].length - 3; ln++) {
                if (myNewBoard[col][ln] === 1 && myNewBoard[col][ln + 1] === 1 && myNewBoard[col][ln + 2] === 1 && myNewBoard[col][ln + 3] === 1) {
                    this.setState({ endGame: 1 })
                } else if (myNewBoard[col][ln] === 2 && myNewBoard[col][ln + 1] === 2 && myNewBoard[col][ln + 2] === 2 && myNewBoard[col][ln + 3] === 2) {
                    this.setState({ endGame: 2 })
                }
            }
        }

        // Victoire en ligne
        for (let col = 0; col < myNewBoard.length - 3; col++) {
            for (let ln = 0; ln < myNewBoard[col + 1].length; ln++) {
                if (myNewBoard[col][ln] === 1 && myNewBoard[col + 1][ln] === 1 && myNewBoard[col + 2][ln] === 1 && myNewBoard[col + 3][ln] === 1) {
                    this.setState({ endGame: 1 })
                } else if (myNewBoard[col][ln] === 2 && myNewBoard[col + 1][ln] === 2 && myNewBoard[col + 2][ln] === 2 && myNewBoard[col + 3][ln] === 2) {
                    this.setState({ endGame: 2 })
                }
            }
        }

        // Victoire en diagonale
        for (let col = 0; col < myNewBoard.length - 2; col++) {
            for (let ln = 0; ln < myNewBoard[col].length - 3; ln++) {
                if (myNewBoard[col][ln] === 1 && myNewBoard[col + 1][ln + 1] === 1 && myNewBoard[col + 2][ln + 2] === 1 && myNewBoard[col + 3][ln + 3] === 1) {
                    this.setState({ endGame: 1 })
                } else if (myNewBoard[col][ln] === 2 && myNewBoard[col + 1][ln + 1] === 2 && myNewBoard[col + 2][ln + 2] === 2 && myNewBoard[col + 3][ln + 3] === 2) {
                    this.setState({ endGame: 2 })
                }
            }
        }

        // Victoire en diagonale inversé
        for (let col = 0; col < myNewBoard.length - 2; col++) {
            for (let ln = 0; ln < myNewBoard[col].length - 3; ln++) {

                if (myNewBoard[col][ln] === 1 && myNewBoard[col + 1][ln - 1] === 1 && myNewBoard[col + 2][ln - 2] === 1 && myNewBoard[col + 3][ln - 3] === 1) {
                    this.setState({ endGame: 1 })
                } else if (myNewBoard[col][ln] === 2 && myNewBoard[col + 1][ln - 1] === 2 && myNewBoard[col + 2][ln - 2] === 2 && myNewBoard[col + 3][ln - 3] === 2) {
                    this.setState({ endGame: 2 })
                }
            }
        }

        console.log("Update", myNewBoard);
        this.setState({ board: myNewBoard, tourJoueurJaune: !joueur })
    }

    render() {


        if (this.state.endGame === 1 || this.state.endGame === 2) {
            return (
                <div className="image">
                    <h1>{this.state.endGame}</h1>
                    <div >
                        <img src="https://p3.storage.canalblog.com/39/25/624677/127227270.gif" alt="" />
                        <img src="https://p3.storage.canalblog.com/39/25/624677/127227270.gif" alt="" />
                    </div>
                </div>
            )


        }
        const board = this.state.board;

        return (
            <div className="App">
                <header className="App-header">

                    <p> Bienvenue sur le jeu Puissance 4 </p>
                    <div className="board-game">
                        {
                            (board)
                                ? board.map((x, idx) => <div onMouseLeave={this.handleMouseLeave} onMouseOver={() => this.handleHover(idx)} key={idx}>{x.map((y, key) => <Rond key={key} val={y} hoverIndex={this.state.hoverIndex} col={idx} action={this.handleClick} />)}</div>)
                                : null
                        }
                    </div>
                </header>
            </div>
        );
    }
}

const Rond = ({ col, val, action, hoverIndex }) => {
    return (
        <div className={`cercle ${(val === 2) ? "jaune" : (val === 1) ? "rouge" : ""} ${(hoverIndex === col && !val) ? "hover-color" : ""}`} id={col} onClick={() => action(col)}></div>
    );
}

export default Game;